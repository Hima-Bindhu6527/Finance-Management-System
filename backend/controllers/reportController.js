const Report = require('../models/reports');
const Goal = require('../models/Goal');
const IncomeExpense = require('../models/Income'); 
const Notification = require('../models/Notification');
const PDFDocument = require('pdfkit');

// ===========================
// 📊 GENERATE REPORT
// ===========================
exports.generateReport = async (req, res) => {
  try {
    const { reportType, startDate, endDate } = req.body;
    const userId = req.user._id || req.user.id;

    if (!reportType) {
      return res.status(400).json({ success: false, error: 'Please provide report type' });
    }

    const goals = await Goal.find({ user: userId });
    const incomeExpenseData = await IncomeExpense.findOne({ userId: userId });

    if (!incomeExpenseData) {
      return res.status(404).json({
        success: false,
        error: 'No income/expense data found. Please add your financial data first.'
      });
    }

    const reportData = await calculateReportData(userId, goals, incomeExpenseData);

    const report = await Report.create({
      user: userId,
      reportType,
      reportPeriod: {
        startDate: startDate || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        endDate: endDate || new Date()
      },
      reportData
    });

    await Notification.create({
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

    const populatedReport = await Report.findById(report._id).populate('user', 'name email');

    res.status(201).json({ success: true, data: populatedReport });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ success: false, error: 'Failed to generate report', message: error.message });
  }
};

// ===========================
// 📄 GET ALL REPORTS
// ===========================
exports.getReports = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const reports = await Report.find({ user: userId }).sort('-createdAt');

    res.status(200).json({ success: true, count: reports.length, data: reports });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch reports', message: error.message });
  }
};

// ===========================
// 📑 GET SINGLE REPORT
// ===========================
exports.getReport = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const report = await Report.findById(req.params.id).populate('user', 'name email');

    if (!report) return res.status(404).json({ success: false, error: 'Report not found' });
    if (report.user._id.toString() !== userId.toString())
      return res.status(403).json({ success: false, error: 'Not authorized' });

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch report', message: error.message });
  }
};

// ===========================
// 🧾 DOWNLOAD PDF
// ===========================
exports.downloadReportPDF = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const report = await Report.findById(req.params.id).populate('user', 'name email');

    if (!report) return res.status(404).json({ success: false, error: 'Report not found' });
    if (report.user._id.toString() !== userId.toString())
      return res.status(403).json({ success: false, error: 'Not authorized' });

    const doc = new PDFDocument({ margin: 50 });
    const fileName = `financial-report-${report.reportType.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    doc.pipe(res);
    generatePDFContent(doc, report);
    doc.end();
  } catch (error) {
    console.error('Error downloading PDF:', error);
    res.status(500).json({ success: false, error: 'Failed to download PDF', message: error.message });
  }
};

// ===========================
// ❌ DELETE REPORT
// ===========================
exports.deleteReport = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ success: false, error: 'Report not found' });
    if (report.user.toString() !== userId.toString())
      return res.status(403).json({ success: false, error: 'Not authorized' });

    const reportType = report.reportType;
    await report.deleteOne();

    await Notification.create({
      user: userId,
      type: 'report_deleted',
      title: 'Report Deleted',
      message: `Report "${reportType}" has been deleted successfully`,
      icon: '🗑️',
      priority: 'LOW',
      isRead: false,
      relatedType: 'Report'
    });

    res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ success: false, error: 'Failed to delete report', message: error.message });
  }
};

// ===========================
// 📂 GET REPORTS BY TYPE
// ===========================
exports.getReportsByType = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const reports = await Report.find({ reportType: req.params.reportType, user: userId }).sort('-createdAt');
    res.status(200).json({ success: true, count: reports.length, data: reports });
  } catch (error) {
    console.error('Error fetching reports by type:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch reports', message: error.message });
  }
};

// ===========================
// 📊 HELPER FUNCTIONS
// ===========================
async function calculateReportData(userId, goals, incomeExpenseData) {
  const reportData = {
    summary: {},
    incomeBreakdown: {},
    expenseBreakdown: [],
    assetAllocation: {},
    goalProgress: [],
    recommendations: []
  };

  // ✅ Income & Expenses Calculation using the new schema structure
  const totalIncome = incomeExpenseData.totalMonthlyIncome || 0;
  const totalExpenses = incomeExpenseData.totalMonthlyExpenses || 0;
  const monthlySavings = incomeExpenseData.monthlySavings || 0;
  const savingsRate = totalIncome > 0 ? (monthlySavings / totalIncome) * 100 : 0;

  // Calculate total assets
  const totalAssets = incomeExpenseData.totalAssetValue || 0;

  reportData.summary = { 
    totalIncome, 
    totalExpenses, 
    monthlySavings, 
    savingsRate,
    totalAssets,
    netWorth: totalAssets // Simplified net worth (assets only, no liabilities in current schema)
  };

  // ✅ Income Breakdown - convert array to object for better visualization
  reportData.incomeBreakdown = {};
  if (incomeExpenseData.incomes && incomeExpenseData.incomes.length > 0) {
    incomeExpenseData.incomes.forEach(income => {
      reportData.incomeBreakdown[income.name] = income.monthlyAmount || income.amount;
    });
  }

  // ✅ Expense Breakdown with percentages
  reportData.expenseBreakdown = [];
  if (incomeExpenseData.expenses && incomeExpenseData.expenses.length > 0) {
    incomeExpenseData.expenses.forEach(expense => {
      const monthlyAmt = expense.monthlyAmount || expense.amount;
      reportData.expenseBreakdown.push({
        category: expense.category,
        amount: monthlyAmt,
        percentage: totalExpenses > 0 ? ((monthlyAmt / totalExpenses) * 100).toFixed(2) : 0
      });
    });
  }

  // ✅ Asset Allocation
  reportData.assetAllocation = {
    mutualFunds: 0,
    equity: 0,
    other: 0,
    // frontend expects 'insurance' and 'otherAssets' keys in some places — keep them in sync
    insurance: 0,
    otherAssets: 0
  };
  if (incomeExpenseData.assets && incomeExpenseData.assets.length > 0) {
    incomeExpenseData.assets.forEach(asset => {
      const type = (asset.type || '').toLowerCase();
      const value = asset.currentValue || 0;
      if (type === 'mutualfund' || type === 'mutualfunds') {
        reportData.assetAllocation.mutualFunds += value;
      } else if (type === 'equity') {
        reportData.assetAllocation.equity += value;
      } else if (type === 'insurance') {
        reportData.assetAllocation.insurance += value;
      } else {
        reportData.assetAllocation.other += value;
      }
    });

    // Mirror fields expected by frontend
    reportData.assetAllocation.otherAssets = reportData.assetAllocation.other;
  }

  // ✅ Goals progress
  reportData.goalProgress = goals.map(goal => ({
    goalId: goal._id,
    goalName: goal.goalName,
    targetAmount: goal.targetAmount,
    currentAmount: goal.currentAmount,
    progressPercentage: goal.targetAmount ? ((goal.currentAmount / goal.targetAmount) * 100).toFixed(2) : 0,
    status: goal.status || 'In Progress'
  }));

  // ✅ Financial Health Indicators
  reportData.healthIndicators = {
    savingsToIncomeRatio: totalIncome > 0 ? ((monthlySavings / totalIncome) * 100).toFixed(2) : 0,
    emergencyFundMonths: monthlySavings > 0 && totalExpenses > 0 ? (totalAssets / totalExpenses).toFixed(1) : 0,
    financialHealthScore: calculateHealthScore(savingsRate, totalAssets, totalExpenses)
  };

  // ✅ Recommendations based on data
  reportData.recommendations = generateRecommendations(savingsRate, totalIncome, totalExpenses, totalAssets);

  return reportData;
}

// Helper function to calculate financial health score
function calculateHealthScore(savingsRate, totalAssets, totalExpenses) {
  let score = 0;
  
  // Savings rate (40 points max)
  if (savingsRate >= 20) score += 40;
  else if (savingsRate >= 10) score += 30;
  else if (savingsRate >= 5) score += 20;
  else score += 10;
  
  // Emergency fund (40 points max)
  const emergencyFundMonths = totalExpenses > 0 ? totalAssets / totalExpenses : 0;
  if (emergencyFundMonths >= 6) score += 40;
  else if (emergencyFundMonths >= 3) score += 30;
  else if (emergencyFundMonths >= 1) score += 20;
  else score += 10;
  
  // Asset growth (20 points max)
  if (totalAssets > 100000) score += 20;
  else if (totalAssets > 50000) score += 15;
  else if (totalAssets > 10000) score += 10;
  else score += 5;
  
  return Math.min(score, 100);
}

// Helper function to generate recommendations
function generateRecommendations(savingsRate, totalIncome, totalExpenses, totalAssets) {
  const recommendations = [];
  
  if (savingsRate < 10) {
    recommendations.push({
      category: 'Savings',
      priority: 'HIGH',
      recommendation: 'Your savings rate is below 10%. Try to reduce expenses or increase income to save at least 20% of your income.'
    });
  }
  
  const emergencyFundMonths = totalExpenses > 0 ? totalAssets / totalExpenses : 0;
  if (emergencyFundMonths < 3) {
    recommendations.push({
      category: 'Emergency Fund',
      priority: 'HIGH',
      recommendation: 'Build an emergency fund covering at least 3-6 months of expenses for financial security.'
    });
  }
  
  if (totalExpenses > totalIncome * 0.8) {
    recommendations.push({
      category: 'Expenses',
      priority: 'MEDIUM',
      recommendation: 'Your expenses are consuming over 80% of your income. Review and optimize your spending.'
    });
  }
  
  if (savingsRate >= 20) {
    recommendations.push({
      category: 'Investment',
      priority: 'LOW',
      recommendation: 'Great savings rate! Consider diversifying investments for long-term wealth growth.'
    });
  }
  
  return recommendations;
}

// ===========================
// 🧾 PDF CONTENT
// ===========================
function generatePDFContent(doc, report) {
  const { reportData, reportType, reportPeriod, user } = report;
  const formatCurrency = num => `₹${Math.round(num).toLocaleString('en-IN')}`;

  // Header
  doc.fontSize(24).fillColor('#2c3e50').text('Financial Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).fillColor('#7f8c8d');
  doc.text(`Report Type: ${reportType}`, { align: 'center' });
  doc.text(`User: ${user.name}`, { align: 'center' });
  doc.text(`Generated On: ${new Date(report.generatedAt).toLocaleDateString('en-IN')}`, { align: 'center' });
  doc.text(`Period: ${new Date(reportPeriod.startDate).toLocaleDateString('en-IN')} - ${new Date(reportPeriod.endDate).toLocaleDateString('en-IN')}`, { align: 'center' });
  doc.moveDown(2);

  // Summary Section
  doc.fontSize(16).fillColor('#2c3e50').text('Financial Summary', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor('#34495e');
  doc.text(`Total Income: ${formatCurrency(reportData.summary.totalIncome)}`);
  doc.text(`Total Expenses: ${formatCurrency(reportData.summary.totalExpenses)}`);
  doc.text(`Monthly Savings: ${formatCurrency(reportData.summary.monthlySavings)}`);
  doc.text(`Savings Rate: ${reportData.summary.savingsRate.toFixed(2)}%`);
  doc.text(`Total Assets: ${formatCurrency(reportData.summary.totalAssets || 0)}`);
  doc.moveDown(1.5);

  // Income Breakdown (handle Map or plain object)
  const incomeBreakdown = reportData.incomeBreakdown instanceof Map ? Object.fromEntries(reportData.incomeBreakdown) : (reportData.incomeBreakdown || {});
  if (incomeBreakdown && Object.keys(incomeBreakdown).length > 0) {
    doc.fontSize(16).fillColor('#2c3e50').text('Income Breakdown', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('#34495e');
    for (const [source, amount] of Object.entries(incomeBreakdown)) {
      doc.text(`${source}: ${formatCurrency(amount)}`);
    }
    doc.moveDown(1.5);
  }

  // Expense Breakdown
  if (reportData.expenseBreakdown && reportData.expenseBreakdown.length > 0) {
    doc.fontSize(16).fillColor('#2c3e50').text('Expense Breakdown', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('#34495e');
    reportData.expenseBreakdown.forEach(expense => {
      doc.text(`${expense.category}: ${formatCurrency(expense.amount)} (${expense.percentage}%)`);
    });
    doc.moveDown(1.5);
  }

  // Asset Allocation
  if (reportData.assetAllocation) {
    const assets = reportData.assetAllocation;
    const hasAssets = assets.mutualFunds > 0 || assets.equity > 0 || assets.other > 0;
    if (hasAssets) {
      doc.fontSize(16).fillColor('#2c3e50').text('Asset Allocation', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(12).fillColor('#34495e');
      if (assets.mutualFunds > 0) doc.text(`Mutual Funds: ${formatCurrency(assets.mutualFunds)}`);
      if (assets.equity > 0) doc.text(`Equity: ${formatCurrency(assets.equity)}`);
      if (assets.other > 0) doc.text(`Other Assets: ${formatCurrency(assets.other)}`);
      doc.moveDown(1.5);
    }
  }

  // Goal Progress
  if (reportData.goalProgress && reportData.goalProgress.length > 0) {
    doc.fontSize(16).fillColor('#2c3e50').text('Goal Progress', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('#34495e');
    reportData.goalProgress.forEach(goal => {
      doc.text(`${goal.goalName}: ${goal.progressPercentage}% (${formatCurrency(goal.currentAmount)} / ${formatCurrency(goal.targetAmount)})`);
    });
    doc.moveDown(1.5);
  }

  // Financial Health Indicators
  if (reportData.healthIndicators) {
    doc.fontSize(16).fillColor('#2c3e50').text('Financial Health Indicators', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('#34495e');
    doc.text(`Financial Health Score: ${reportData.healthIndicators.financialHealthScore}/100`);
    doc.text(`Savings to Income Ratio: ${reportData.healthIndicators.savingsToIncomeRatio}%`);
    doc.text(`Emergency Fund Coverage: ${reportData.healthIndicators.emergencyFundMonths} months`);
    doc.moveDown(1.5);
  }

  // Recommendations
  if (reportData.recommendations && reportData.recommendations.length > 0) {
    doc.addPage();
    doc.fontSize(16).fillColor('#2c3e50').text('Recommendations', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor('#34495e');
    reportData.recommendations.forEach((rec, index) => {
      doc.fillColor('#e74c3c').text(`[${rec.priority}] ${rec.category}`, { continued: false });
      doc.fillColor('#34495e').text(`${rec.recommendation}`);
      doc.moveDown(0.5);
    });
  }

  // Footer
  doc.fontSize(10).fillColor('#95a5a6');
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
    doc.text(
      `Page ${i + 1} of ${pages.count}`,
      0,
      doc.page.height - 50,
      { align: 'center' }
    );
  }
}
