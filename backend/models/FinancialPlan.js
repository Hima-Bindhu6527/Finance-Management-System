const mongoose = require('mongoose');

// Sub-schemas for different sections
const generalDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function (value) {
        const age = (new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000);
        return age >= 18 && age <= 100;
      },
      message: 'Age must be between 18 and 100 years'
    }
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: 'Gender must be Male, Female, or Other'
    },
    required: [true, 'Gender is required']
  },
  maritalStatus: {
    type: String,
    enum: {
      values: ['Single', 'Married', 'Divorced', 'Widowed'],
      message: 'Please select a valid marital status'
    },
    required: [true, 'Marital status is required']
  },
  isSmoker: {
    type: Boolean,
    default: false
  },
  designation: {
    type: String,
    trim: true,
    maxlength: [100, 'Designation cannot exceed 100 characters']
  },
  companyName: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  hasChildren: {
    type: Boolean,
    default: false
  },
  numberOfChildren: {
    type: Number,
    default: 0,
    min: [0, 'Number of children cannot be negative'],
    max: [20, 'Number of children seems unrealistic']
  },
  hasDependents: {
    type: Boolean,
    default: false
  },
  numberOfDependents: {
    type: Number,
    default: 0,
    min: [0, 'Number of dependents cannot be negative'],
    max: [20, 'Number of dependents seems unrealistic']
  }
});

const incomeSchema = new mongoose.Schema({
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative']
  },
  bonuses: {
    type: Number,
    default: 0,
    min: [0, 'Bonuses cannot be negative']
  },
  otherIncome: {
    type: Number,
    default: 0,
    min: [0, 'Other income cannot be negative']
  },
  rentalIncome: {
    type: Number,
    default: 0,
    min: [0, 'Rental income cannot be negative']
  },
  investmentIncome: {
    type: Number,
    default: 0,
    min: [0, 'Investment income cannot be negative']
  }
});

const assetSchema = new mongoose.Schema({
  mutualFunds: [{
    investmentType: {
      type: String,
      required: [true, 'Investment type is required']
    },
    schemeName: {
      type: String,
      required: [true, 'Scheme name is required'],
      trim: true
    },
    sipAmount: {
      type: Number,
      required: [true, 'SIP amount is required'],
      min: [100, 'SIP amount must be at least 100']
    },
    folioNo: {
      type: String,
      trim: true
    },
    currentValue: {
      type: Number,
      required: [true, 'Current value is required'],
      min: [0, 'Current value cannot be negative']
    },
    frequency: {
      type: String,
      enum: {
        values: ['Monthly', 'Quarterly', 'Half-yearly', 'Yearly'],
        message: 'Frequency must be Monthly, Quarterly, Half-yearly, or Yearly'
      },
      required: [true, 'Frequency is required']
    },
    transactionSource: {
      type: String,
      required: [true, 'Transaction source is required']
    }
  }],
  insurance: [{
    policyType: {
      type: String,
      enum: {
        values: ['Life Insurance', 'Health Insurance', 'Term Insurance', 'Vehicle Insurance', 'Home Insurance'],
        message: 'Please select a valid policy type'
      },
      required: [true, 'Policy type is required']
    },
    policyNumber: {
      type: String,
      required: [true, 'Policy number is required'],
      trim: true
    },
    insuranceCompany: {
      type: String,
      required: [true, 'Insurance company is required'],
      trim: true
    },
    premiumAmount: {
      type: Number,
      required: [true, 'Premium amount is required'],
      min: [0, 'Premium amount cannot be negative']
    },
    coverageAmount: {
      type: Number,
      required: [true, 'Coverage amount is required'],
      min: [0, 'Coverage amount cannot be negative']
    },
    maturityDate: {
      type: Date,
      required: [true, 'Maturity date is required']
    }
  }],
  otherAssets: [{
    assetType: {
      type: String,
      required: [true, 'Asset type is required'],
      trim: true
    },
    assetName: {
      type: String,
      required: [true, 'Asset name is required'],
      trim: true
    },
    currentValue: {
      type: Number,
      required: [true, 'Current value is required'],
      min: [0, 'Current value cannot be negative']
    },
    acquisitionDate: {
      type: Date,
      required: [true, 'Acquisition date is required']
    }
  }],
  loans: [{
    loanType: {
      type: String,
      enum: {
        values: ['Home Loan', 'Car Loan', 'Personal Loan', 'Education Loan', 'Credit Card', 'Other'],
        message: 'Please select a valid loan type'
      },
      required: [true, 'Loan type is required']
    },
    lenderName: {
      type: String,
      required: [true, 'Lender name is required'],
      trim: true
    },
    principalAmount: {
      type: Number,
      required: [true, 'Principal amount is required'],
      min: [0, 'Principal amount cannot be negative']
    },
    outstandingAmount: {
      type: Number,
      required: [true, 'Outstanding amount is required'],
      min: [0, 'Outstanding amount cannot be negative']
    },
    interestRate: {
      type: Number,
      required: [true, 'Interest rate is required'],
      min: [0, 'Interest rate cannot be negative'],
      max: [50, 'Interest rate seems unrealistic']
    },
    emiAmount: {
      type: Number,
      required: [true, 'EMI amount is required'],
      min: [0, 'EMI amount cannot be negative']
    },
    tenure: {
      type: Number,
      required: [true, 'Tenure is required'],
      min: [1, 'Tenure must be at least 1 month']
    }
  }]
});

const expenseSchema = new mongoose.Schema({
  fixedExpenses: [{
    expenseType: {
      type: String,
      enum: {
        values: ['Fixed', 'Variable'],
        message: 'Expense type must be Fixed or Variable'
      },
      required: [true, 'Expense type is required']
    },
    expenseName: {
      type: String,
      required: [true, 'Expense name is required'],
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative']
    },
    frequency: {
      type: String,
      enum: {
        values: ['Monthly', 'Quarterly', 'Half-yearly', 'Yearly'],
        message: 'Frequency must be Monthly, Quarterly, Half-yearly, or Yearly'
      },
      required: [true, 'Frequency is required']
    },
    category: {
      type: String,
      enum: {
        values: ['Housing', 'Transportation', 'Food', 'Healthcare', 'Education', 'Entertainment', 'Insurance', 'Utilities', 'Other'],
        message: 'Please select a valid category'
      },
      required: [true, 'Category is required']
    }
  }]
});

const financialPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Financial plan must belong to a user']
  },
  planName: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
    maxlength: [100, 'Plan name cannot exceed 100 characters']
  },
  generalDetails: {
    type: generalDetailsSchema,
    required: [true, 'General details are required']
  },
  goals: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Goal'
  }],
  income: {
    type: incomeSchema,
    required: [true, 'Income details are required']
  },
  assets: {
    type: assetSchema,
    default: () => ({})
  },
  expenses: {
    type: expenseSchema,
    default: () => ({})
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completionPercentage: {
    type: Number,
    default: 0,
    min: [0, 'Completion percentage cannot be negative'],
    max: [100, 'Completion percentage cannot exceed 100']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt field before saving
financialPlanSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Update updatedAt field on findOneAndUpdate and findByIdAndUpdate
financialPlanSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Calculate total income
financialPlanSchema.virtual('totalIncome').get(function () {
  if (!this.income) return 0;
  return (this.income.salary || 0) +
    (this.income.bonuses || 0) +
    (this.income.otherIncome || 0) +
    (this.income.rentalIncome || 0) +
    (this.income.investmentIncome || 0);
});

// Calculate total assets value
financialPlanSchema.virtual('totalAssetsValue').get(function () {
  if (!this.assets) return 0;

  let total = 0;

  // Mutual funds
  if (this.assets.mutualFunds) {
    total += this.assets.mutualFunds.reduce((sum, fund) => sum + (fund.currentValue || 0), 0);
  }

  // Insurance (consider coverage amount)
  if (this.assets.insurance) {
    total += this.assets.insurance.reduce((sum, policy) => sum + (policy.coverageAmount || 0), 0);
  }

  // Other assets
  if (this.assets.otherAssets) {
    total += this.assets.otherAssets.reduce((sum, asset) => sum + (asset.currentValue || 0), 0);
  }

  return total;
});

// Calculate total liabilities
financialPlanSchema.virtual('totalLiabilities').get(function () {
  if (!this.assets || !this.assets.loans) return 0;
  return this.assets.loans.reduce((sum, loan) => sum + (loan.outstandingAmount || 0), 0);
});

// Calculate net worth
financialPlanSchema.virtual('netWorth').get(function () {
  return this.totalAssetsValue - this.totalLiabilities;
});

// Calculate total monthly expenses
financialPlanSchema.virtual('totalMonthlyExpenses').get(function () {
  if (!this.expenses || !this.expenses.fixedExpenses) return 0;

  return this.expenses.fixedExpenses.reduce((sum, expense) => {
    let monthlyAmount = expense.amount || 0;

    // Convert to monthly based on frequency
    switch (expense.frequency) {
      case 'Yearly':
        monthlyAmount = monthlyAmount / 12;
        break;
      case 'Half-yearly':
        monthlyAmount = monthlyAmount / 6;
        break;
      case 'Quarterly':
        monthlyAmount = monthlyAmount / 3;
        break;
      default: // Monthly
        break;
    }

    return sum + monthlyAmount;
  }, 0);
});

module.exports = mongoose.model('FinancialPlan', financialPlanSchema);