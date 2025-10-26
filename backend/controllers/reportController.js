const Report = require('../models/reports');
const FinancialPlan = require('../models/FinancialPlan');
const Goal = require('../models/Goal');
const Notification = require('../models/Notification');
const PDFDocument = require('pdfkit');

// @desc    Generate a new report
// @route   POST /api/reports
// @access  Private
exports.generateReport = async (req, res) => {
  try {
    const { financialPlanId, reportType, startDate, endDate } = req.body;
    const userId = req.user._id || req.user.id;

    // Validate input
    if (!financialPlanId || !reportType) {
      return res.status(400).json({
        success: false,
        error: 'Please provide financial plan ID and report type'
      });
    }

    // Fetch financial plan with populated goals
    const financialPlan = await FinancialPlan.findById(financialPlanId).populate('goals');

    if (!financialPlan) {
      return res.status(404).json({
        success: false,
        error: 'Financial plan not found'
      });
    }

    // Check if plan belongs to user
    if (financialPlan.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this financial plan'
      });
    }

    // Calculate report data
    const reportData = await calculateReportData(financialPlan);

    // Create report
    const report = await Report.create({
      user: userId,
      financialPlan: financialPlanId,
      reportType,
      reportPeriod: {
        startDate: startDate || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        endDate: endDate || new Date()
      },
      reportData
    });

    // ✅ CREATE NOTIFICATION
    try {
      const notification = await Notification.create({
        user: userId,
        type: 'report_generated',
        title: 'Report Generated',
        message: `Your ${reportType} report has been generated successfully!`,
        icon: '📊',
        priority: 'MEDIUM',
        isRead: false,
        relatedId: report._id,
        relatedType: 'Report',
        actionUrl: `/reports/${report._id}`
      });
      console.log('✅ Notification created successfully:', notification._id);
    } catch (notifError) {
      console.error('❌ Error creating notification:', notifError.message);
    }

    const populatedReport = await Report.findById(report._id)
      .populate('financialPlan', 'planName')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      data: populatedReport
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate report',
      message: error.message
    });
  }
};

// @desc    Get all reports for a user
// @route   GET /api/reports
// @access  Private
exports.getReports = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const reports = await Report.find({ user: userId })
      .populate('financialPlan', 'planName')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reports',
      message: error.message
    });
  }
};

// @desc    Get single report
// @route   GET /api/reports/:id
// @access  Private
exports.getReport = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const report = await Report.findById(req.params.id)
      .populate('financialPlan')
      .populate('user', 'name email');

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    // Check if report belongs to user
    if (report.user._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this report'
      });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch report',
      message: error.message
    });
  }
};

// @desc    Download report as PDF
// @route   GET /api/reports/:id/download
// @access  Private
exports.downloadReportPDF = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const report = await Report.findById(req.params.id)
      .populate('financialPlan')
      .populate('user', 'name email');

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    // Check authorization
    if (report.user._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to download this report'
      });
    }

    // Generate PDF
    const doc = new PDFDocument({ margin: 50 });
    const fileName = `financial-report-${report.reportType.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`;
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Pipe PDF to response
    doc.pipe(res);

    // Generate PDF content
    generatePDFContent(doc, report);

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error('Error downloading report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to download report',
      message: error.message
    });
  }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
// @access  Private
exports.deleteReport = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }

    // Check authorization
    if (report.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this report'
      });
    }

    // Store report type before deletion
    const reportType = report.reportType;

    await report.deleteOne();

    // ✅ CREATE NOTIFICATION
    try {
      const notification = await Notification.create({
        user: userId,
        type: 'report_deleted',
        title: 'Report Deleted',
        message: `Report "${reportType}" has been deleted successfully`,
        icon: '🗑️',
        priority: 'LOW',
        isRead: false,
        relatedType: 'Report'
      });
      console.log('✅ Delete notification created successfully:', notification._id);
    } catch (notifError) {
      console.error('❌ Error creating delete notification:', notifError.message);
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete report',
      message: error.message
    });
  }
};

// @desc    Get reports by financial plan
// @route   GET /api/reports/plan/:financialPlanId
// @access  Private
exports.getReportsByPlan = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const reports = await Report.find({ 
      financialPlan: req.params.financialPlanId,
      user: userId
    })
      .populate('financialPlan', 'planName')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports by plan:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reports',
      message: error.message
    });
  }
};

// @desc    Get reports by type
// @route   GET /api/reports/type/:reportType
// @access  Private
exports.getReportsByType = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const reports = await Report.find({ 
      reportType: req.params.reportType,
      user: userId
    })
      .populate('financialPlan', 'planName')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports by type:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reports',
      message: error.message
    });
  }
};

// Helper function to calculate report data
async function calculateReportData(financialPlan) {
  const reportData = {
    summary: {},
    incomeBreakdown: {},
    expenseBreakdown: [],
    assetAllocation: {},
    loanSummary: {},
    goalProgress: [],
    healthIndicators: {},
    recommendations: []
  };

  // Calculate total income
  const totalIncome = (financialPlan.income?.salary || 0) +
                     (financialPlan.income?.bonuses || 0) +
                     (financialPlan.income?.otherIncome || 0) +
                     (financialPlan.income?.rentalIncome || 0) +
                     (financialPlan.income?.investmentIncome || 0);

  // Calculate total monthly expenses
  let totalMonthlyExpenses = 0;
  if (financialPlan.expenses?.fixedExpenses) {
    financialPlan.expenses.fixedExpenses.forEach(expense => {
      let monthlyAmount = expense.amount || 0;
      switch (expense.frequency) {
        case 'Yearly': monthlyAmount = monthlyAmount / 12; break;
        case 'Half-yearly': monthlyAmount = monthlyAmount / 6; break;
        case 'Quarterly': monthlyAmount = monthlyAmount / 3; break;
      }
      totalMonthlyExpenses += monthlyAmount;
    });
  }

  // Calculate assets
  let totalMutualFunds = 0;
  let totalInsurance = 0;
  let totalOtherAssets = 0;

  if (financialPlan.assets?.mutualFunds) {
    totalMutualFunds = financialPlan.assets.mutualFunds.reduce((sum, fund) => sum + (fund.currentValue || 0), 0);
  }
  if (financialPlan.assets?.insurance) {
    totalInsurance = financialPlan.assets.insurance.reduce((sum, policy) => sum + (policy.coverageAmount || 0), 0);
  }
  if (financialPlan.assets?.otherAssets) {
    totalOtherAssets = financialPlan.assets.otherAssets.reduce((sum, asset) => sum + (asset.currentValue || 0), 0);
  }

  const totalAssets = totalMutualFunds + totalInsurance + totalOtherAssets;

  // Calculate liabilities
  let totalLiabilities = 0;
  let totalEMI = 0;
  const loansByType = {};

  if (financialPlan.assets?.loans) {
    financialPlan.assets.loans.forEach(loan => {
      totalLiabilities += loan.outstandingAmount || 0;
      totalEMI += loan.emiAmount || 0;
      
      if (!loansByType[loan.loanType]) {
        loansByType[loan.loanType] = { count: 0, totalOutstanding: 0 };
      }
      loansByType[loan.loanType].count++;
      loansByType[loan.loanType].totalOutstanding += loan.outstandingAmount || 0;
    });
  }

  const netWorth = totalAssets - totalLiabilities;
  const monthlySavings = totalIncome - totalMonthlyExpenses - totalEMI;
  const savingsRate = totalIncome > 0 ? (monthlySavings / totalIncome) * 100 : 0;

  // Summary
  reportData.summary = {
    totalIncome,
    totalExpenses: totalMonthlyExpenses,
    totalAssets,
    totalLiabilities,
    netWorth,
    monthlySavings,
    savingsRate
  };

  // Income breakdown
  reportData.incomeBreakdown = {
    salary: financialPlan.income?.salary || 0,
    bonuses: financialPlan.income?.bonuses || 0,
    otherIncome: financialPlan.income?.otherIncome || 0,
    rentalIncome: financialPlan.income?.rentalIncome || 0,
    investmentIncome: financialPlan.income?.investmentIncome || 0
  };

  // Expense breakdown
  const expenseCategories = {};
  if (financialPlan.expenses?.fixedExpenses) {
    financialPlan.expenses.fixedExpenses.forEach(expense => {
      let monthlyAmount = expense.amount || 0;
      switch (expense.frequency) {
        case 'Yearly': monthlyAmount = monthlyAmount / 12; break;
        case 'Half-yearly': monthlyAmount = monthlyAmount / 6; break;
        case 'Quarterly': monthlyAmount = monthlyAmount / 3; break;
      }
      
      if (!expenseCategories[expense.category]) {
        expenseCategories[expense.category] = 0;
      }
      expenseCategories[expense.category] += monthlyAmount;
    });
  }

  reportData.expenseBreakdown = Object.entries(expenseCategories).map(([category, amount]) => ({
    category,
    amount,
    percentage: totalMonthlyExpenses > 0 ? (amount / totalMonthlyExpenses) * 100 : 0
  }));

  // Asset allocation
  reportData.assetAllocation = {
    mutualFunds: totalMutualFunds,
    insurance: totalInsurance,
    otherAssets: totalOtherAssets
  };

  // Loan summary
  reportData.loanSummary = {
    totalLoans: financialPlan.assets?.loans?.length || 0,
    totalOutstanding: totalLiabilities,
    totalEMI,
    loansByType: Object.entries(loansByType).map(([loanType, data]) => ({
      loanType,
      count: data.count,
      totalOutstanding: data.totalOutstanding
    }))
  };

  // Goal progress
  if (financialPlan.goals && financialPlan.goals.length > 0) {
    reportData.goalProgress = financialPlan.goals.map(goal => {
      const progressPercentage = goal.targetAmount > 0 ? 
        Math.min((goal.currentAmount / goal.targetAmount) * 100, 100) : 0;
      
      const now = new Date();
      const target = new Date(goal.targetDate);
      const monthsRemaining = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24 * 30.44)));
      
      let status = 'On Track';
      if (goal.isCompleted) status = 'Completed';
      else if (progressPercentage < 25) status = 'Behind';
      else if (progressPercentage >= 75) status = 'Near Completion';

      return {
        goalId: goal._id,
        goalName: goal.goalName,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        progressPercentage,
        monthsRemaining,
        status
      };
    });
  }

  // Health indicators
  const debtToIncomeRatio = totalIncome > 0 ? (totalEMI / totalIncome) * 100 : 0;
  const savingsToIncomeRatio = savingsRate;
  const emergencyFundMonths = totalMonthlyExpenses > 0 ? (monthlySavings * 12) / totalMonthlyExpenses : 0;
  
  // Financial health score (0-100)
  let healthScore = 100;
  
  // Debt score
  if (debtToIncomeRatio > 40) healthScore -= 30;
  else if (debtToIncomeRatio > 30) healthScore -= 20;
  else if (debtToIncomeRatio > 20) healthScore -= 10;
  
  // Savings score
  if (savingsRate < 10) healthScore -= 25;
  else if (savingsRate < 20) healthScore -= 15;
  else if (savingsRate < 30) healthScore -= 5;
  
  // Emergency fund score
  if (emergencyFundMonths < 3) healthScore -= 20;
  else if (emergencyFundMonths < 6) healthScore -= 10;

  reportData.healthIndicators = {
    debtToIncomeRatio,
    savingsToIncomeRatio,
    emergencyFundMonths,
    financialHealthScore: Math.max(0, healthScore)
  };

  // Generate recommendations
  reportData.recommendations = generateRecommendations(reportData);

  return reportData;
}

// Helper function to generate recommendations
function generateRecommendations(reportData) {
  const recommendations = [];

  // Debt recommendations
  if (reportData.healthIndicators.debtToIncomeRatio > 40) {
    recommendations.push({
      category: 'Debt Management',
      priority: 'High',
      recommendation: 'Your debt-to-income ratio exceeds 40%. Consider debt consolidation, refinancing high-interest loans, or increasing your income to bring this ratio below 40%.'
    });
  } else if (reportData.healthIndicators.debtToIncomeRatio > 30) {
    recommendations.push({
      category: 'Debt Management',
      priority: 'Medium',
      recommendation: 'Your debt-to-income ratio is elevated. Focus on paying down high-interest debt first while maintaining minimum payments on other loans.'
    });
  }

  // Savings recommendations
  if (reportData.healthIndicators.savingsToIncomeRatio < 10) {
    recommendations.push({
      category: 'Savings',
      priority: 'High',
      recommendation: 'Your savings rate is below 10%. Aim to save at least 20% of your income. Review your expenses and identify areas to reduce spending.'
    });
  } else if (reportData.healthIndicators.savingsToIncomeRatio < 20) {
    recommendations.push({
      category: 'Savings',
      priority: 'Medium',
      recommendation: 'Try to increase your savings rate to at least 20% of your income for better financial security and wealth building.'
    });
  }

  // Emergency fund recommendations
  if (reportData.healthIndicators.emergencyFundMonths < 3) {
    recommendations.push({
      category: 'Emergency Fund',
      priority: 'High',
      recommendation: 'Your emergency fund covers less than 3 months of expenses. Prioritize building an emergency fund covering 6 months of expenses for financial security.'
    });
  } else if (reportData.healthIndicators.emergencyFundMonths < 6) {
    recommendations.push({
      category: 'Emergency Fund',
      priority: 'Medium',
      recommendation: 'Build your emergency fund to cover at least 6 months of expenses. This provides adequate protection during unexpected situations.'
    });
  }

  // Asset diversification
  const { mutualFunds, insurance, otherAssets } = reportData.assetAllocation;
  const totalAssets = mutualFunds + insurance + otherAssets;
  
  if (totalAssets > 0 && mutualFunds / totalAssets > 0.7) {
    recommendations.push({
      category: 'Asset Diversification',
      priority: 'Medium',
      recommendation: 'Over 70% of your assets are in mutual funds. Consider diversifying across different asset classes to reduce portfolio risk.'
    });
  }

  if (totalAssets > 0 && otherAssets / totalAssets < 0.1) {
    recommendations.push({
      category: 'Asset Diversification',
      priority: 'Low',
      recommendation: 'Consider adding alternative investments like gold, real estate, or bonds to further diversify your portfolio.'
    });
  }

  // Goal progress recommendations
  const behindGoals = reportData.goalProgress.filter(g => g.status === 'Behind');
  if (behindGoals.length > 0) {
    recommendations.push({
      category: 'Goal Achievement',
      priority: 'Medium',
      recommendation: `You have ${behindGoals.length} goal(s) behind schedule. Review and increase monthly contributions or adjust target dates to stay on track.`
    });
  }

  // Net worth recommendations
  if (reportData.summary.netWorth < 0) {
    recommendations.push({
      category: 'Net Worth',
      priority: 'High',
      recommendation: 'Your liabilities exceed your assets. Focus on debt reduction and building savings to improve your net worth.'
    });
  }

  // Financial health score recommendations
  if (reportData.healthIndicators.financialHealthScore < 50) {
    recommendations.push({
      category: 'Overall Financial Health',
      priority: 'High',
      recommendation: 'Your financial health score is below 50. Focus on reducing debt, increasing savings, and building an emergency fund as top priorities.'
    });
  } else if (reportData.healthIndicators.financialHealthScore < 70) {
    recommendations.push({
      category: 'Overall Financial Health',
      priority: 'Medium',
      recommendation: 'Your financial health is moderate. Continue improving your savings rate and managing debt to achieve excellent financial health.'
    });
  }

  return recommendations;
}

// Helper function to generate PDF content
function generatePDFContent(doc, report) {
  const { reportData, reportType, reportPeriod, financialPlan, user } = report;

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  // Helper function to format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  // Colors
  const primaryColor = '#2c3e50';
  const secondaryColor = '#3498db';
  const successColor = '#27ae60';
  const warningColor = '#f39c12';
  const dangerColor = '#e74c3c';

  // Page 1: Header and Summary
  doc.fontSize(26).fillColor(primaryColor).font('Helvetica-Bold')
    .text('Financial Report', { align: 'center' });
  
  doc.moveDown(0.5);
  doc.fontSize(18).fillColor(secondaryColor)
    .text(reportType, { align: 'center' });
  
  doc.moveDown(1.5);

  // Report details box
  doc.fontSize(11).fillColor('#000').font('Helvetica');
  const startY = doc.y;
  doc.rect(50, startY, doc.page.width - 100, 80).stroke();
  
  doc.fontSize(10).font('Helvetica');
  doc.text(`User: ${user.name}`, 60, startY + 10);
  doc.text(`Plan: ${financialPlan.planName}`, 60, startY + 25);
  doc.text(`Generated: ${new Date(report.generatedAt).toLocaleDateString('en-IN')}`, 60, startY + 40);
  doc.text(`Period: ${new Date(reportPeriod.startDate).toLocaleDateString('en-IN')} to ${new Date(reportPeriod.endDate).toLocaleDateString('en-IN')}`, 60, startY + 55);

  doc.y = startY + 90;
  doc.moveDown(1);

  // Financial Summary Section
  doc.fontSize(16).fillColor(primaryColor).font('Helvetica-Bold')
    .text('Financial Summary', { underline: true });
  doc.moveDown(0.5);

  doc.fontSize(11).fillColor('#000').font('Helvetica');
  
  const summaryY = doc.y;
  const leftCol = 60;
  const rightCol = 320;

  // Left column
  doc.text('Monthly Income:', leftCol, summaryY);
  doc.font('Helvetica-Bold').text(formatCurrency(reportData.summary.totalIncome), leftCol + 150, summaryY);
  
  doc.font('Helvetica').text('Monthly Expenses:', leftCol, summaryY + 20);
  doc.font('Helvetica-Bold').text(formatCurrency(reportData.summary.totalExpenses), leftCol + 150, summaryY + 20);
  
  doc.font('Helvetica').text('Monthly Savings:', leftCol, summaryY + 40);
  doc.font('Helvetica-Bold').fillColor(reportData.summary.monthlySavings >= 0 ? successColor : dangerColor)
    .text(formatCurrency(reportData.summary.monthlySavings), leftCol + 150, summaryY + 40);
  
  doc.fillColor('#000').font('Helvetica').text('Savings Rate:', leftCol, summaryY + 60);
  doc.font('Helvetica-Bold').text(formatPercentage(reportData.summary.savingsRate), leftCol + 150, summaryY + 60);

  // Right column
  doc.font('Helvetica').text('Total Assets:', rightCol, summaryY);
  doc.font('Helvetica-Bold').text(formatCurrency(reportData.summary.totalAssets), rightCol + 120, summaryY);
  
  doc.font('Helvetica').text('Total Liabilities:', rightCol, summaryY + 20);
  doc.font('Helvetica-Bold').text(formatCurrency(reportData.summary.totalLiabilities), rightCol + 120, summaryY + 20);
  
  doc.font('Helvetica').text('Net Worth:', rightCol, summaryY + 40);
  doc.font('Helvetica-Bold').fillColor(reportData.summary.netWorth >= 0 ? successColor : dangerColor)
    .text(formatCurrency(reportData.summary.netWorth), rightCol + 120, summaryY + 40);

  doc.y = summaryY + 90;
  doc.moveDown(1);

  // Add more sections as needed (Income Breakdown, Expense Breakdown, etc.)
  // Footer on last page
  const pageCount = doc.bufferedPageRange().count;
  for (let i = 0; i < pageCount; i++) {
    doc.switchToPage(i);
    
    // Add page number
    doc.fontSize(10).fillColor('#999').font('Helvetica')
      .text(
        `Page ${i + 1} of ${pageCount}`,
        50,
        doc.page.height - 50,
        { align: 'center', width: doc.page.width - 100 }
      );
  }
}