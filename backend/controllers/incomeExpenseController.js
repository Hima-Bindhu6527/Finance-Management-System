const IncomeExpense = require('../models/Income');

// @desc    Get user's income and expense data
// @route   GET /api/income-expense
// @access  Private
const getIncomeExpense = async (req, res) => {
  try {
    let incomeExpense = await IncomeExpense.findOne({ userId: req.user.id });
    
    if (!incomeExpense) {
      incomeExpense = new IncomeExpense({
        userId: req.user.id,
        incomes: [],
        expenses: []
      });
      await incomeExpense.save();
    }

    res.status(200).json({
      success: true,
      data: incomeExpense
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add income source
// @route   POST /api/income-expense/income
// @access  Private
const addIncomeSource = async (req, res) => {
  try {
    const { name, amount, period } = req.body;

    if (!name || !amount || !period) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, amount, and period'
      });
    }

    let incomeExpense = await IncomeExpense.findOne({ userId: req.user.id });
    
    if (!incomeExpense) {
      incomeExpense = new IncomeExpense({
        userId: req.user.id,
        incomes: [],
        expenses: []
      });
    }

    // Calculate monthly amount
    const monthlyAmount = period === 'Yearly' ? amount / 12 : amount;

    incomeExpense.incomes.push({ name, amount, period, monthlyAmount });
    await incomeExpense.save();

    res.status(201).json({
      success: true,
      data: incomeExpense
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add expense category
// @route   POST /api/income-expense/expense
// @access  Private
const addExpenseCategory = async (req, res) => {
  try {
    const { category, amount, period } = req.body;

    if (!category || !amount || !period) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category, amount, and period'
      });
    }

    let incomeExpense = await IncomeExpense.findOne({ userId: req.user.id });
    
    if (!incomeExpense) {
      incomeExpense = new IncomeExpense({
        userId: req.user.id,
        incomes: [],
        expenses: []
      });
    }

    // Calculate monthly amount
    const monthlyAmount = period === 'Yearly' ? amount / 12 : amount;

    incomeExpense.expenses.push({ category, amount, period, monthlyAmount });
    await incomeExpense.save();

    res.status(201).json({
      success: true,
      data: incomeExpense
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update income source
// @route   PUT /api/income-expense/income/:id
// @access  Private
const updateIncomeSource = async (req, res) => {
  try {
    const { name, amount, period } = req.body;
    const incomeId = req.params.id;

    const incomeExpense = await IncomeExpense.findOne({ userId: req.user.id });
    
    if (!incomeExpense) {
      return res.status(404).json({
        success: false,
        message: 'Income/Expense data not found'
      });
    }

    const income = incomeExpense.incomes.id(incomeId);
    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income source not found'
      });
    }

    income.name = name || income.name;
    income.amount = amount || income.amount;
    income.period = period || income.period;
    
    // Recalculate monthly amount
    income.monthlyAmount = income.period === 'Yearly' ? income.amount / 12 : income.amount;

    await incomeExpense.save();

    res.status(200).json({
      success: true,
      data: incomeExpense
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update expense category
// @route   PUT /api/income-expense/expense/:id
// @access  Private
const updateExpenseCategory = async (req, res) => {
  try {
    const { category, amount, period } = req.body;
    const expenseId = req.params.id;

    const incomeExpense = await IncomeExpense.findOne({ userId: req.user.id });
    
    if (!incomeExpense) {
      return res.status(404).json({
        success: false,
        message: 'Income/Expense data not found'
      });
    }

    const expense = incomeExpense.expenses.id(expenseId);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense category not found'
      });
    }

    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.period = period || expense.period;
    
    // Recalculate monthly amount
    expense.monthlyAmount = expense.period === 'Yearly' ? expense.amount / 12 : expense.amount;

    await incomeExpense.save();

    res.status(200).json({
      success: true,
      data: incomeExpense
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete income source
// @route   DELETE /api/income-expense/income/:id
// @access  Private
const deleteIncomeSource = async (req, res) => {
  try {
    const incomeId = req.params.id;

    const incomeExpense = await IncomeExpense.findOne({ userId: req.user.id });
    
    if (!incomeExpense) {
      return res.status(404).json({
        success: false,
        message: 'Income/Expense data not found'
      });
    }

    incomeExpense.incomes.pull(incomeId);
    await incomeExpense.save();

    res.status(200).json({
      success: true,
      data: incomeExpense
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete expense category
// @route   DELETE /api/income-expense/expense/:id
// @access  Private
const deleteExpenseCategory = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const incomeExpense = await IncomeExpense.findOne({ userId: req.user.id });
    
    if (!incomeExpense) {
      return res.status(404).json({
        success: false,
        message: 'Income/Expense data not found'
      });
    }

    incomeExpense.expenses.pull(expenseId);
    await incomeExpense.save();

    res.status(200).json({
      success: true,
      data: incomeExpense
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Add asset
// @route   POST /api/income-expense/asset
// @access  Private
const addAsset = async (req, res) => {
  try {
    const { type, name, currentValue } = req.body;

    if (!type || !name || currentValue == null) {
      return res.status(400).json({ success: false, message: 'Please provide type, name and currentValue' });
    }

    let incomeExpense = await IncomeExpense.findOne({ userId: req.user.id });
    if (!incomeExpense) {
      incomeExpense = new IncomeExpense({ userId: req.user.id, incomes: [], expenses: [], assets: [] });
    }

    incomeExpense.assets.push({ type, name, currentValue });

    // Update asset total
    incomeExpense.totalAssetValue = incomeExpense.assets.reduce((sum, a) => sum + (a.currentValue || 0), 0);

    await incomeExpense.save();

    res.status(201).json({ success: true, data: incomeExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update asset
// @route   PUT /api/income-expense/asset/:id
// @access  Private
const updateAsset = async (req, res) => {
  try {
    const assetId = req.params.id;
    const { type, name, currentValue } = req.body;

    const incomeExpense = await IncomeExpense.findOne({ userId: req.user.id });
    if (!incomeExpense) return res.status(404).json({ success: false, message: 'Not found' });

    const asset = incomeExpense.assets.id(assetId);
    if (!asset) return res.status(404).json({ success: false, message: 'Asset not found' });

    asset.type = type || asset.type;
    asset.name = name || asset.name;
    if (currentValue != null) asset.currentValue = currentValue;

    incomeExpense.totalAssetValue = incomeExpense.assets.reduce((sum, a) => sum + (a.currentValue || 0), 0);

    await incomeExpense.save();
    res.status(200).json({ success: true, data: incomeExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Delete asset
// @route   DELETE /api/income-expense/asset/:id
// @access  Private
const deleteAsset = async (req, res) => {
  try {
    const assetId = req.params.id;
    const incomeExpense = await IncomeExpense.findOne({ userId: req.user.id });
    if (!incomeExpense) return res.status(404).json({ success: false, message: 'Not found' });

    incomeExpense.assets.pull(assetId);
    incomeExpense.totalAssetValue = incomeExpense.assets.reduce((sum, a) => sum + (a.currentValue || 0), 0);
    await incomeExpense.save();
    res.status(200).json({ success: true, data: incomeExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getIncomeExpense,
  addIncomeSource,
  addExpenseCategory,
  updateIncomeSource,
  updateExpenseCategory,
  deleteIncomeSource,
  deleteExpenseCategory,
  addAsset,
  updateAsset,
  deleteAsset
};