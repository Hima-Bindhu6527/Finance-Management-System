const express = require('express');
const {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
  updateGoalProgress,
  getGoalHistory
} = require('../controllers/goalController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getGoals)
  .post(createGoal);

router.route('/:id')
  .get(getGoal)
  .put(updateGoal)
  .delete(deleteGoal);

router.route('/:id/progress')
  .put(updateGoalProgress);

router.route('/:id/history')
  .get(getGoalHistory);

module.exports = router;