const mongoose = require('mongoose');

// ✅ Income Subdocument Schema
const incomeSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an income source name'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
    min: [0, 'Amount cannot be negative']
  },
  period: {
    type: String,
    required: [true, 'Please specify period'],
    enum: ['Monthly', 'Yearly'],
    default: 'Monthly'
  },
  monthlyAmount: Number
});

// Automatically compute monthly amount for income
incomeSourceSchema.pre('save', function (next) {
  this.monthlyAmount = this.period === 'Yearly' ? this.amount / 12 : this.amount;
  next();
});

// ✅ Expense Subdocument Schema
const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Please add an expense category'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
    min: [0, 'Amount cannot be negative']
  },
  period: {
    type: String,
    required: [true, 'Please specify period'],
    enum: ['Monthly', 'Yearly'],
    default: 'Monthly'
  },
  monthlyAmount: Number
});

// Automatically compute monthly amount for expense
expenseSchema.pre('save', function (next) {
  this.monthlyAmount = this.period === 'Yearly' ? this.amount / 12 : this.amount;
  next();
});

// ✅ Main IncomeExpense Schema
const incomeExpenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  incomes: [incomeSourceSchema],
  expenses: [expenseSchema],

  assets: [
    new mongoose.Schema({
      type: {
        type: String,
        enum: ['MutualFund', 'Equity', 'Other'],
        required: true
      },
      name: { type: String, required: true },
      currentValue: { type: Number, required: true, min: 0 }
    }, { _id: true })
  ],

  totalMonthlyIncome: { type: Number, default: 0 },
  totalMonthlyExpenses: { type: Number, default: 0 },
  totalAssetValue: { type: Number, default: 0 },
  monthlySavings: { type: Number, default: 0 },

  savingsPlan: {
    essentials: { type: Number, default: 0 }, // 50%
    savings: { type: Number, default: 0 },    // 20%
    discretionary: { type: Number, default: 0 } // 30%
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ✅ Pre-save hook to calculate totals
incomeExpenseSchema.pre('save', function (next) {
  // Recalculate monthly amounts for incomes
  this.incomes.forEach(income => {
    if (!income.monthlyAmount) {
      income.monthlyAmount = income.period === 'Yearly' ? income.amount / 12 : income.amount;
    }
  });

  // Recalculate monthly amounts for expenses
  this.expenses.forEach(expense => {
    if (!expense.monthlyAmount) {
      expense.monthlyAmount = expense.period === 'Yearly' ? expense.amount / 12 : expense.amount;
    }
  });

  // Calculate totals
  this.totalMonthlyIncome = this.incomes.reduce((t, inc) => t + inc.monthlyAmount, 0);
  this.totalMonthlyExpenses = this.expenses.reduce((t, exp) => t + exp.monthlyAmount, 0);
  this.monthlySavings = this.totalMonthlyIncome - this.totalMonthlyExpenses;

  // 50/20/30 rule
  this.savingsPlan.essentials = this.totalMonthlyIncome * 0.5;
  this.savingsPlan.savings = this.totalMonthlyIncome * 0.2;
  this.savingsPlan.discretionary = this.totalMonthlyIncome * 0.3;

  this.updatedAt = Date.now();
  next();
});

// ✅ Update updatedAt on findOneAndUpdate
incomeExpenseSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('IncomeExpense', incomeExpenseSchema);
