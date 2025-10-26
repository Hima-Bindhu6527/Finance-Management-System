const Notification = require('../models/Notification');

// Helper function to create notification
const createNotification = async (notificationData) => {
  try {
    const notification = await Notification.create(notificationData);
    console.log('Notification created:', notification.title);
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};

// Bill payment reminder
exports.createBillReminder = async (userId, bill, daysUntilDue) => {
  return createNotification({
    user: userId,
    type: 'BILL_REMINDER',
    title: `💳 Bill Payment Due ${daysUntilDue === 0 ? 'Today' : `in ${daysUntilDue} days`}`,
    message: `${bill.billName}: ₹${bill.amount.toLocaleString('en-IN')} due on ${new Date(bill.dueDate).toLocaleDateString('en-IN')}`,
    icon: '💳',
    priority: daysUntilDue <= 1 ? 'URGENT' : daysUntilDue <= 3 ? 'HIGH' : 'MEDIUM',
    relatedId: bill._id,
    relatedType: 'Bill',
    actionUrl: '/bills',
    expiresAt: new Date(bill.dueDate)
  });
};

// Budget alert
exports.createBudgetAlert = async (userId, category, spent, budget, percentage) => {
  const isExceeded = percentage >= 100;
  
  return createNotification({
    user: userId,
    type: 'BUDGET_ALERT',
    title: isExceeded ? '🚨 Budget Exceeded!' : '⚠️ Budget Alert',
    message: `${category}: You've spent ₹${spent.toLocaleString('en-IN')} of ₹${budget.toLocaleString('en-IN')} (${percentage.toFixed(0)}%)`,
    icon: isExceeded ? '🚨' : '⚠️',
    priority: isExceeded ? 'URGENT' : percentage >= 90 ? 'HIGH' : 'MEDIUM',
    actionUrl: '/expenses',
    metadata: { category, spent, budget, percentage }
  });
};

// Goal milestone
exports.createGoalMilestone = async (userId, goal, percentage) => {
  const milestones = {
    25: { emoji: '🎯', message: 'Quarter way there!' },
    50: { emoji: '🏆', message: 'Halfway to your goal!' },
    75: { emoji: '🌟', message: 'Three quarters complete!' },
    100: { emoji: '🎉', message: 'Goal achieved!' }
  };
  
  const milestone = milestones[percentage] || { emoji: '📈', message: 'Great progress!' };
  
  return createNotification({
    user: userId,
    type: 'GOAL_MILESTONE',
    title: `${milestone.emoji} ${goal.goalName} - ${percentage}% Complete`,
    message: `${milestone.message} Current: ₹${goal.currentAmount.toLocaleString('en-IN')} / Target: ₹${goal.targetAmount.toLocaleString('en-IN')}`,
    icon: milestone.emoji,
    priority: percentage === 100 ? 'HIGH' : 'MEDIUM',
    relatedId: goal._id,
    relatedType: 'Goal',
    actionUrl: '/goals',
    metadata: { goalName: goal.goalName, percentage }
  });
};

// Low balance warning
exports.createLowBalanceWarning = async (userId, accountName, balance, threshold) => {
  return createNotification({
    user: userId,
    type: 'LOW_BALANCE',
    title: '⚠️ Low Balance Alert',
    message: `${accountName} balance is ₹${balance.toLocaleString('en-IN')}, below your threshold of ₹${threshold.toLocaleString('en-IN')}`,
    icon: '⚠️',
    priority: 'HIGH',
    actionUrl: '/accounts',
    metadata: { accountName, balance, threshold }
  });
};

// Report ready
exports.createReportReadyNotification = async (userId, reportType, reportId) => {
  return createNotification({
    user: userId,
    type: 'REPORT_READY',
    title: '📊 Financial Report Ready',
    message: `Your ${reportType} report has been generated and is ready to view`,
    icon: '📊',
    priority: 'LOW',
    relatedId: reportId,
    relatedType: 'Report',
    actionUrl: `/reports`,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  });
};

// Achievement/Congratulations
exports.createAchievementNotification = async (userId, title, message) => {
  return createNotification({
    user: userId,
    type: 'ACHIEVEMENT',
    title: `🏆 ${title}`,
    message,
    icon: '🏆',
    priority: 'MEDIUM',
    actionUrl: '/dashboard'
  });
};

// Monthly summary
exports.createMonthlySummary = async (userId, summary) => {
  return createNotification({
    user: userId,
    type: 'INFO',
    title: '📅 Monthly Financial Summary',
    message: `Income: ₹${summary.income.toLocaleString('en-IN')} | Expenses: ₹${summary.expenses.toLocaleString('en-IN')} | Saved: ₹${summary.saved.toLocaleString('en-IN')}`,
    icon: '📅',
    priority: 'MEDIUM',
    actionUrl: '/reports',
    metadata: summary
  });
};