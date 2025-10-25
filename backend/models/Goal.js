const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Goal must belong to a user']
  },
  goalName: {
    type: String,
    required: [true, 'Please add a goal name'],
    trim: true,
    maxlength: [100, 'Goal name cannot be more than 100 characters']
  },
  targetAmount: {
    type: Number,
    required: [true, 'Please add target amount'],
    min: [1, 'Target amount must be greater than 0']
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: [0, 'Current amount cannot be negative']
  },
  monthlyContribution: {
    type: Number,
    required: [true, 'Please add monthly contribution amount'],
    min: [1, 'Monthly contribution must be greater than 0']
  },
  targetDate: {
    type: Date,
    required: [true, 'Please add target date'],
    validate: {
      validator: function (value) {
        return value > new Date();
      },
      message: 'Target date must be in the future'
    }
  },
  priority: {
    type: String,
    enum: {
      values: ['High', 'Medium', 'Low'],
      message: 'Priority must be either High, Medium, or Low'
    },
    default: 'Medium'
  },
  category: {
    type: String,
    required: [true, 'Please add a goal category'],
    enum: {
      values: ['Emergency Fund', 'Education', 'House', 'Car', 'Vacation', 'Retirement', 'Investment', 'Other'],
      message: 'Please select a valid category'
    }
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  progressHistory: [{
    amount: {
      type: Number,
      required: true
    },
    previousAmount: {
      type: Number,
      required: true
    },
    newAmount: {
      type: Number,
      required: true
    },
    action: {
      type: String,
      enum: ['contribution', 'withdrawal', 'adjustment'],
      default: 'contribution'
    },
    note: {
      type: String,
      maxlength: 200
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  changeHistory: [{
    field: {
      type: String,
      required: true
    },
    oldValue: {
      type: mongoose.Schema.Types.Mixed
    },
    newValue: {
      type: mongoose.Schema.Types.Mixed
    },
    changedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

// Update updatedAt field before saving
goalSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Update updatedAt field on findOneAndUpdate and findByIdAndUpdate
goalSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Calculate progress percentage
goalSchema.virtual('progressPercentage').get(function () {
  if (this.targetAmount <= 0) return 0;
  return Math.min((this.currentAmount / this.targetAmount) * 100, 100);
});

// Calculate months remaining
goalSchema.virtual('monthsRemaining').get(function () {
  const now = new Date();
  const target = new Date(this.targetDate);
  const diffTime = Math.abs(target - now);
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average days per month
  return diffMonths;
});

// Mark goal as completed when current amount reaches target
goalSchema.pre('save', function (next) {
  if (this.currentAmount >= this.targetAmount && !this.isCompleted) {
    this.isCompleted = true;
    this.completedAt = new Date();
  } else if (this.currentAmount < this.targetAmount && this.isCompleted) {
    this.isCompleted = false;
    this.completedAt = undefined;
  }
  next();
});

module.exports = mongoose.model('Goal', goalSchema);