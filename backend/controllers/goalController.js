const Goal = require('../models/Goal');
const asyncHandler = require('express-async-handler');

// @desc    Get all goals for a user
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get single goal
// @route   GET /api/goals/:id
// @access  Private
const getGoal = asyncHandler(async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.status(200).json({
      success: true,
      data: goal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Create new goal
// @route   POST /api/goals
// @access  Private
const createGoal = asyncHandler(async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Validate required fields
    const { goalName, targetAmount, monthlyContribution, targetDate, category } = req.body;

    if (!goalName || !targetAmount || !monthlyContribution || !targetDate || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: goalName, targetAmount, monthlyContribution, targetDate, category'
      });
    }

    // Validate target date is in future
    if (new Date(targetDate) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Target date must be in the future'
      });
    }

    // Validate amounts are positive
    if (targetAmount <= 0 || monthlyContribution <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Target amount and monthly contribution must be greater than 0'
      });
    }

    const goal = await Goal.create(req.body);

    res.status(201).json({
      success: true,
      data: goal
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Validate target date if provided
    if (req.body.targetDate && new Date(req.body.targetDate) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Target date must be in the future'
      });
    }

    // Validate amounts if provided
    if (req.body.targetAmount && req.body.targetAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Target amount must be greater than 0'
      });
    }

    if (req.body.monthlyContribution && req.body.monthlyContribution <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Monthly contribution must be greater than 0'
      });
    }

    if (req.body.currentAmount && req.body.currentAmount < 0) {
      return res.status(400).json({
        success: false,
        message: 'Current amount cannot be negative'
      });
    }

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: goal
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Goal removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Update goal progress
// @route   PUT /api/goals/:id/progress
// @access  Private
const updateGoalProgress = asyncHandler(async (req, res) => {
  try {
    const { currentAmount } = req.body;

    if (currentAmount === undefined || currentAmount < 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid current amount (must be 0 or greater)'
      });
    }

    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    goal.currentAmount = currentAmount;
    await goal.save();

    res.status(200).json({
      success: true,
      data: goal,
      message: 'Goal progress updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

module.exports = {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
  updateGoalProgress
};