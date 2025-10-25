const FinancialPlan = require('../models/FinancialPlan');
const Goal = require('../models/Goal');
const asyncHandler = require('express-async-handler');

// @desc    Get all financial plans for a user
// @route   GET /api/financial-plans
// @access  Private
const getFinancialPlans = asyncHandler(async (req, res) => {
  try {
    const plans = await FinancialPlan.find({ user: req.user.id })
      .populate('goals')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get single financial plan
// @route   GET /api/financial-plans/:id
// @access  Private
const getFinancialPlan = asyncHandler(async (req, res) => {
  try {
    const plan = await FinancialPlan.findById(req.params.id).populate('goals');

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Financial plan not found'
      });
    }

    // Make sure user owns plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Create new financial plan
// @route   POST /api/financial-plans
// @access  Private
const createFinancialPlan = asyncHandler(async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Validate required fields
    const { planName, generalDetails, income } = req.body;

    if (!planName || !generalDetails || !income) {
      return res.status(400).json({
        success: false,
        message: 'Please provide planName, generalDetails, and income'
      });
    }

    // Validate general details required fields
    const requiredGeneralFields = ['fullName', 'dateOfBirth', 'gender', 'maritalStatus'];
    for (let field of requiredGeneralFields) {
      if (!generalDetails[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required in general details`
        });
      }
    }

    // Validate age
    const age = (new Date() - new Date(generalDetails.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000);
    if (age < 18 || age > 100) {
      return res.status(400).json({
        success: false,
        message: 'Age must be between 18 and 100 years'
      });
    }

    // Validate income
    if (!income.salary || income.salary < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid salary is required'
      });
    }

    // Validate children/dependents logic
    if (generalDetails.hasChildren && generalDetails.numberOfChildren <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Number of children must be greater than 0 if hasChildren is true'
      });
    }

    if (generalDetails.hasDependents && generalDetails.numberOfDependents <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Number of dependents must be greater than 0 if hasDependents is true'
      });
    }

    const plan = await FinancialPlan.create(req.body);

    res.status(201).json({
      success: true,
      data: plan
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

// @desc    Update financial plan
// @route   PUT /api/financial-plans/:id
// @access  Private
const updateFinancialPlan = asyncHandler(async (req, res) => {
  try {
    let plan = await FinancialPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Financial plan not found'
      });
    }

    // Make sure user owns plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Validate age if dateOfBirth is being updated
    if (req.body.generalDetails && req.body.generalDetails.dateOfBirth) {
      const age = (new Date() - new Date(req.body.generalDetails.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000);
      if (age < 18 || age > 100) {
        return res.status(400).json({
          success: false,
          message: 'Age must be between 18 and 100 years'
        });
      }
    }

    // Validate income if being updated
    if (req.body.income && req.body.income.salary !== undefined && req.body.income.salary < 0) {
      return res.status(400).json({
        success: false,
        message: 'Salary cannot be negative'
      });
    }

    plan = await FinancialPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: plan
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

// @desc    Delete financial plan
// @route   DELETE /api/financial-plans/:id
// @access  Private
const deleteFinancialPlan = asyncHandler(async (req, res) => {
  try {
    const plan = await FinancialPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Financial plan not found'
      });
    }

    // Make sure user owns plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Financial plan removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Add goal to financial plan
// @route   PUT /api/financial-plans/:id/goals
// @access  Private
const addGoalToPlan = asyncHandler(async (req, res) => {
  try {
    const { goalId } = req.body;

    if (!goalId) {
      return res.status(400).json({
        success: false,
        message: 'Goal ID is required'
      });
    }

    const plan = await FinancialPlan.findById(req.params.id);
    const goal = await Goal.findById(goalId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Financial plan not found'
      });
    }

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    // Make sure user owns both plan and goal
    if (plan.user.toString() !== req.user.id || goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Check if goal is already in the plan
    if (plan.goals.includes(goalId)) {
      return res.status(400).json({
        success: false,
        message: 'Goal is already in this financial plan'
      });
    }

    plan.goals.push(goalId);
    await plan.save();

    const updatedPlan = await FinancialPlan.findById(req.params.id).populate('goals');

    res.status(200).json({
      success: true,
      data: updatedPlan,
      message: 'Goal added to financial plan successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Remove goal from financial plan
// @route   DELETE /api/financial-plans/:id/goals/:goalId
// @access  Private
const removeGoalFromPlan = asyncHandler(async (req, res) => {
  try {
    const plan = await FinancialPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Financial plan not found'
      });
    }

    // Make sure user owns plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Remove goal from plan
    plan.goals = plan.goals.filter(goal => goal.toString() !== req.params.goalId);
    await plan.save();

    const updatedPlan = await FinancialPlan.findById(req.params.id).populate('goals');

    res.status(200).json({
      success: true,
      data: updatedPlan,
      message: 'Goal removed from financial plan successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get user's latest general details for auto-fill
// @route   GET /api/financial-plans/general-details
// @access  Private
const getLatestGeneralDetails = asyncHandler(async (req, res) => {
  try {
    const latestPlan = await FinancialPlan.findOne({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select('generalDetails');

    if (!latestPlan) {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'No previous general details found'
      });
    }

    res.status(200).json({
      success: true,
      data: latestPlan.generalDetails
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
  getFinancialPlans,
  getFinancialPlan,
  createFinancialPlan,
  updateFinancialPlan,
  deleteFinancialPlan,
  addGoalToPlan,
  removeGoalFromPlan,
  getLatestGeneralDetails
};