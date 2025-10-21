const express = require('express');
const {
  getIncomeExpense,
  addIncomeSource,
  addExpenseCategory,
  updateIncomeSource,
  updateExpenseCategory,
  deleteIncomeSource,
  deleteExpenseCategory
  ,addAsset, updateAsset, deleteAsset
} = require('../controllers/incomeExpenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// Income/Expense routes
router.route('/')
  .get(getIncomeExpense);

router.route('/income')
  .post(addIncomeSource);

router.route('/expense')
  .post(addExpenseCategory);

router.route('/asset')
  .post(addAsset);

router.route('/asset/:id')
  .put(updateAsset)
  .delete(deleteAsset);

router.route('/income/:id')
  .put(updateIncomeSource)
  .delete(deleteIncomeSource);

router.route('/expense/:id')
  .put(updateExpenseCategory)
  .delete(deleteExpenseCategory);

module.exports = router;