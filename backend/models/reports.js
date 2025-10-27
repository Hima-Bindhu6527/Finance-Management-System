const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Report must belong to a user']
  },
  // REMOVED: financialPlan field - no longer needed
  reportType: {
    type: String,
    enum: {
      values: ['Comprehensive', 'Income Analysis', 'Asset Overview', 'Goal Progress', 'Expense Analysis', 'Net Worth Summary'],
      message: 'Please select a valid report type'
    },
    required: [true, 'Report type is required']
  },
  reportPeriod: {
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    }
  },
  reportData: {
    // Summary metrics
    summary: {
      totalIncome: { type: Number, default: 0 },
      totalExpenses: { type: Number, default: 0 },
      totalAssets: { type: Number, default: 0 },
      totalLiabilities: { type: Number, default: 0 },
      netWorth: { type: Number, default: 0 },
      monthlySavings: { type: Number, default: 0 },
      savingsRate: { type: Number, default: 0 }
    },
    // Income breakdown
    incomeBreakdown: {
      salary: { type: Number, default: 0 },
      bonuses: { type: Number, default: 0 },
      otherIncome: { type: Number, default: 0 },
      rentalIncome: { type: Number, default: 0 },
      investmentIncome: { type: Number, default: 0 }
    },
    // Expense breakdown by category
    expenseBreakdown: [{
      category: String,
      amount: Number,
      percentage: Number
    }],
    // Asset allocation
    assetAllocation: {
      mutualFunds: { type: Number, default: 0 },
      insurance: { type: Number, default: 0 },
      otherAssets: { type: Number, default: 0 }
    },
    // Loan summary
    loanSummary: {
      totalLoans: { type: Number, default: 0 },
      totalOutstanding: { type: Number, default: 0 },
      totalEMI: { type: Number, default: 0 },
      loansByType: [{
        loanType: String,
        count: Number,
        totalOutstanding: Number
      }]
    },
    // Goal progress
    goalProgress: [{
      goalId: mongoose.Schema.ObjectId,
      goalName: String,
      targetAmount: Number,
      currentAmount: Number,
      progressPercentage: Number,
      monthsRemaining: Number,
      status: String
    }],
    // Financial health indicators
    healthIndicators: {
      debtToIncomeRatio: { type: Number, default: 0 },
      savingsToIncomeRatio: { type: Number, default: 0 },
      emergencyFundMonths: { type: Number, default: 0 },
      financialHealthScore: { type: Number, default: 0 }
    },
    // Recommendations
    recommendations: [{
      category: String,
      priority: String,
      recommendation: String
    }]
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
reportSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Report', reportSchema);