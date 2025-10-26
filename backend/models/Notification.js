const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: [
      'BILL_REMINDER',
      'BUDGET_ALERT',
      'GOAL_MILESTONE',
      'LOW_BALANCE',
      'REPORT_READY',
      'PAYMENT_DUE',
      'ACHIEVEMENT',
      'WARNING',
      'INFO',
      'report_generated',  // ✅ Added this
      'report_deleted'     // ✅ Added this
    ],
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    maxlength: 500
  },
  icon: {
    type: String,
    default: '🔔'
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    default: 'MEDIUM'
  },
  isRead: {
    type: Boolean,
    default: false,
    index: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    // Can reference Bill, Goal, Report, etc.
  },
  relatedType: {
    type: String,
    enum: ['Bill', 'Goal', 'Report', 'Budget', 'Account']
  },
  actionUrl: {
    type: String // URL to navigate when clicked
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed // Additional data
  },
  expiresAt: {
    type: Date // Auto-delete old notifications
  }
}, {
  timestamps: true
});

// Index for efficient queries
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

// Auto-delete expired notifications
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Notification', notificationSchema);