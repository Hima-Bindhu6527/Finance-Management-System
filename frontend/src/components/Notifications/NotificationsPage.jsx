import React, { useState, useEffect } from 'react';
import { notificationService } from '../../services/notificationService';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' or 'unread'
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getNotifications(1, filter === 'unread');
      if (response.success) {
        setNotifications(response.data || []);
        setUnreadCount(response.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;
    
    try {
      await notificationService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleDeleteAllRead = async () => {
    if (!window.confirm('Delete all read notifications?')) return;
    
    try {
      await notificationService.deleteAllRead();
      setNotifications(prev => prev.filter(n => !n.isRead));
    } catch (error) {
      console.error('Error deleting notifications:', error);
    }
  };

  const getPriorityClass = (priority) => {
    return priority?.toLowerCase() || 'medium';
  };

  const getTypeIcon = (type) => {
    const icons = {
      BILL_REMINDER: '💳',
      BUDGET_ALERT: '⚠️',
      GOAL_MILESTONE: '🎯',
      LOW_BALANCE: '⚠️',
      REPORT_READY: '📊',
      PAYMENT_DUE: '💰',
      ACHIEVEMENT: '🏆',
      WARNING: '⚠️',
      INFO: 'ℹ️'
    };
    return icons[type] || '🔔';
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return d.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div className="header-content">
          <h1>Notifications</h1>
          <p>Stay updated with your financial activities</p>
        </div>
        <div className="header-stats">
          <div className="stat-badge">
            <span className="stat-number">{unreadCount}</span>
            <span className="stat-label">Unread</span>
          </div>
          <div className="stat-badge">
            <span className="stat-number">{notifications.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      <div className="notifications-controls">
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Notifications
          </button>
          <button
            className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>

        <div className="action-buttons">
          {unreadCount > 0 && (
            <button onClick={handleMarkAllAsRead} className="btn-mark-all">
              Mark All Read
            </button>
          )}
          <button onClick={handleDeleteAllRead} className="btn-delete-read">
            Delete Read
          </button>
        </div>
      </div>

      <div className="notifications-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h2>No notifications</h2>
            <p>
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."}
            </p>
          </div>
        ) : (
          <div className="notifications-list-page">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`notification-card ${!notification.isRead ? 'unread' : ''} priority-${getPriorityClass(notification.priority)}`}
              >
                <div className="notification-card-header">
                  <div className="notification-type-icon">
                    {notification.icon || getTypeIcon(notification.type)}
                  </div>
                  <div className="notification-meta">
                    <span className={`priority-badge priority-${getPriorityClass(notification.priority)}`}>
                      {notification.priority}
                    </span>
                    <span className="notification-date">{formatDate(notification.createdAt)}</span>
                  </div>
                </div>

                <div className="notification-card-body">
                  <h3 className="notification-card-title">{notification.title}</h3>
                  <p className="notification-card-message">{notification.message}</p>
                  
                  {notification.metadata && (
                    <div className="notification-metadata">
                      {notification.metadata.category && (
                        <span className="metadata-item">Category: {notification.metadata.category}</span>
                      )}
                      {notification.metadata.amount && (
                        <span className="metadata-item">Amount: ₹{notification.metadata.amount.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="notification-card-actions">
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="btn-mark-read"
                    >
                      Mark as Read
                    </button>
                  )}
                  {notification.actionUrl && (
                    <a href={notification.actionUrl} className="btn-view-details">
                      View Details →
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(notification._id)}
                    className="btn-delete-notification"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;