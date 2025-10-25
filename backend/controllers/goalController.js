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

    console.log(`createGoal: user=${req.user.id} payload=${JSON.stringify(req.body)}`);

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

    // Debug log for update operations
    console.log(`updateGoal called by user=${req.user.id} for goal=${req.params.id} payload=${JSON.stringify(req.body)}`);

    // Track changes for history
    const changeHistory = [];
    const fieldsToTrack = ['goalName', 'targetAmount', 'monthlyContribution', 'targetDate', 'priority', 'category', 'description'];

    fieldsToTrack.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== goal[field]) {
        changeHistory.push({
          field: field,
          oldValue: goal[field],
          newValue: req.body[field],
          changedBy: req.user.id,
          timestamp: new Date()
        });
      }
    });

    // Prepare update object with updatedAt timestamp
    const updateObj = {
      ...req.body,
      updatedAt: Date.now()
    };

    // Add change history if there are any changes
    if (changeHistory.length > 0) {
      updateObj.$push = { changeHistory: { $each: changeHistory } };
    }

    // Update the goal in database
    goal = await Goal.findByIdAndUpdate(req.params.id, updateObj, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: goal,
      message: 'Goal updated successfully',
      changesTracked: changeHistory.length
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

    console.log(`deleteGoal: user=${req.user.id} deleting goal=${req.params.id}`);

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

// @desc    Update goal progress (adds provided amount to existing currentAmount)
// @route   PUT /api/goals/:id/progress
// @access  Private
const updateGoalProgress = asyncHandler(async (req, res) => {
  try {
    // Treat provided currentAmount as an increment to add to existing currentAmount
    let { currentAmount, note } = req.body;

    if (currentAmount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a currentAmount to add (number >= 0)'
      });
    }

    currentAmount = Number(currentAmount);
    if (isNaN(currentAmount) || currentAmount < 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid non-negative number for currentAmount'
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

    // Store previous amount for history
    const previousAmount = goal.currentAmount;
    const increment = currentAmount;
    const newAmount = previousAmount + increment;

    // Debug log for progress updates
    console.log(`updateGoalProgress: user=${req.user.id} goal=${req.params.id} add=${increment} prev=${previousAmount} new=${newAmount}`);

    // Create history entry
    const historyEntry = {
      amount: increment,
      previousAmount: previousAmount,
      newAmount: newAmount,
      action: increment >= 0 ? 'contribution' : 'withdrawal',
      note: note || 'Progress update',
      timestamp: new Date()
    };

    // Update goal with increment and add to history
    let updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        $inc: { currentAmount: increment },
        $push: { progressHistory: historyEntry },
        $set: { updatedAt: Date.now() }
      },
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ success: false, message: 'Goal not found or not authorized' });
    }

    res.status(200).json({
      success: true,
      data: updatedGoal,
      message: 'Goal progress updated successfully',
      historyEntry: historyEntry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get goal history (progress and changes)
// @route   GET /api/goals/:id/history
// @access  Private
const getGoalHistory = asyncHandler(async (req, res) => {
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
      data: {
        goalId: goal._id,
        goalName: goal.goalName,
        progressHistory: goal.progressHistory || [],
        changeHistory: goal.changeHistory || [],
        totalContributions: (goal.progressHistory || []).reduce((sum, entry) => sum + entry.amount, 0),
        numberOfContributions: (goal.progressHistory || []).length,
        numberOfChanges: (goal.changeHistory || []).length
      }
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
  updateGoalProgress,
  getGoalHistory
};