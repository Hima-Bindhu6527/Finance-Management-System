const express = require('express');
const {
  getFinancialPlans,
  getFinancialPlan,
  createFinancialPlan,
  updateFinancialPlan,
  deleteFinancialPlan,
  addGoalToPlan,
  removeGoalFromPlan,
  getLatestGeneralDetails
} = require('../controllers/financialPlanController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// Special route for getting latest general details
router.get('/general-details', getLatestGeneralDetails);

router.route('/')
  .get(getFinancialPlans)
  .post(createFinancialPlan);

router.route('/:id')
  .get(getFinancialPlan)
  .put(updateFinancialPlan)
  .delete(deleteFinancialPlan);

router.route('/:id/goals')
  .put(addGoalToPlan);

router.route('/:id/goals/:goalId')
  .delete(removeGoalFromPlan);

module.exports = router;