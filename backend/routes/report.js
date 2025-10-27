const express = require('express');
const router = express.Router();
const {
  generateReport,
  getReports,
  getReport,
  downloadReportPDF,
  deleteReport,
  getReportsByType,
  generateFinancialSummary,   //  Added new one
  getUserIncomeExpense  
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes - require authentication
router.use(protect);

// @route POST /api/reports
// @desc Generate a new report
// @access Private
router.post('/', generateReport);

// @route GET /api/reports
// @desc Get all reports for authenticated user
// @access Private
router.get('/', getReports);

// @route GET /api/reports/type/:reportType
// @desc Get all reports by type
// @access Private
router.get('/type/:reportType', getReportsByType);

// @route GET /api/reports/:id
// @desc Get single report by ID
// @access Private
router.get('/:id', getReport);

// @route GET /api/reports/:id/download
// @desc Download report as PDF
// @access Private
router.get('/:id/download', downloadReportPDF);

// @route DELETE /api/reports/:id
// @desc Delete a report
// @access Private
router.delete('/:id', deleteReport);

module.exports = router;