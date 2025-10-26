const express = require('express');
const router = express.Router();
const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllRead,
  createNotification
} = require('../controllers/notificationController');

// Assuming you have auth middleware
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware.protect);

// GET /api/notifications - Get all notifications
router.get('/', getNotifications);

// GET /api/notifications/unread-count - Get unread count
router.get('/unread-count', getUnreadCount);

// PUT /api/notifications/:id/read - Mark as read
router.put('/:id/read', markAsRead);

// PUT /api/notifications/mark-all-read - Mark all as read
router.put('/mark-all-read', markAllAsRead);

// DELETE /api/notifications/:id - Delete notification
router.delete('/:id', deleteNotification);

// DELETE /api/notifications/delete-all-read - Delete all read
router.delete('/delete-all-read', deleteAllRead);

// POST /api/notifications - Create notification (for testing)
router.post('/', createNotification);

module.exports = router;