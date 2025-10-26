const Notification = require('../models/Notification');

// Get all notifications for logged-in user
exports.getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    const query = { user: req.user._id };
    if (unreadOnly === 'true') {
      query.isRead = false;
    }
    
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    
    const count = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ 
      user: req.user._id, 
      isRead: false 
    });
    
    res.json({
      success: true,
      data: notifications,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      },
      unreadCount
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch notifications' 
    });
  }
};

// Get unread count
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ 
      user: req.user._id, 
      isRead: false 
    });
    
    res.json({ success: true, count });
  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get unread count' 
    });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { isRead: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        error: 'Notification not found' 
      });
    }
    
    res.json({ success: true, data: notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to mark as read' 
    });
  }
};

// Mark all as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { isRead: true }
    );
    
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all as read:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to mark all as read' 
    });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    
    const notification = await Notification.findOneAndDelete({ 
      _id: id, 
      user: req.user._id 
    });
    
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        error: 'Notification not found' 
      });
    }
    
    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete notification' 
    });
  }
};

// Delete all read notifications
exports.deleteAllRead = async (req, res) => {
  try {
    await Notification.deleteMany({ 
      user: req.user._id, 
      isRead: true 
    });
    
    res.json({ success: true, message: 'All read notifications deleted' });
  } catch (error) {
    console.error('Error deleting notifications:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete notifications' 
    });
  }
};

// Create notification (for testing or manual creation)
exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      user: req.user._id,
      ...req.body
    });
    
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create notification' 
    });
  }
};