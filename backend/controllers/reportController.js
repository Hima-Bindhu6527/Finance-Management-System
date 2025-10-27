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

  // ✅ Income & Expenses Calculation
  const totalIncome =
    (incomeExpenseData.income?.salary || 0) +
    (incomeExpenseData.income?.bonuses || 0) +
    (incomeExpenseData.income?.otherIncome || 0);

  let totalExpenses = 0;
  if (incomeExpenseData.expenses?.fixedExpenses) {
    incomeExpenseData.expenses.fixedExpenses.forEach(exp => {
      totalExpenses += exp.amount || 0;
    });
  }

  const monthlySavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (monthlySavings / totalIncome) * 100 : 0;

  reportData.summary = { totalIncome, totalExpenses, monthlySavings, savingsRate };

  // ✅ Breakdown
  reportData.incomeBreakdown = incomeExpenseData.income;
  reportData.expenseBreakdown = incomeExpenseData.expenses?.fixedExpenses || [];

  // ✅ Goals progress
  reportData.goalProgress = goals.map(goal => ({
    goalName: goal.goalName,
    targetAmount: goal.targetAmount,
    currentAmount: goal.currentAmount,
    progress: goal.targetAmount ? ((goal.currentAmount / goal.targetAmount) * 100).toFixed(2) : 0
  }));

  return reportData;
}

// ===========================
// 🧾 PDF CONTENT
// ===========================
function generatePDFContent(doc, report) {
  const { reportData, reportType, reportPeriod, user } = report;
  const formatCurrency = num => `₹${Math.round(num).toLocaleString('en-IN')}`;

  doc.fontSize(20).text('Financial Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Report Type: ${reportType}`);
  doc.text(`User: ${user.name}`);
  doc.text(`Generated On: ${new Date(report.generatedAt).toLocaleDateString('en-IN')}`);
  doc.moveDown();

  doc.fontSize(16).text('Summary', { underline: true });
  doc.fontSize(12).text(`Total Income: ${formatCurrency(reportData.summary.totalIncome)}`);
  doc.text(`Total Expenses: ${formatCurrency(reportData.summary.totalExpenses)}`);
  doc.text(`Monthly Savings: ${formatCurrency(reportData.summary.monthlySavings)}`);
  doc.text(`Savings Rate: ${reportData.summary.savingsRate.toFixed(2)}%`);
}
