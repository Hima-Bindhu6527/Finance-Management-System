import React, { useState, useEffect, useRef } from 'react';
import { notificationService } from '../services/notificationService';
import './NotificationBell.css';

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const count = await notificationService.getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getNotifications(1, false);
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

  // Mark as read
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

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  // Delete notification
  const handleDelete = async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      // Update unread count if the deleted notification was unread
      const deletedNotif = notifications.find(n => n._id === notificationId);
      if (deletedNotif && !deletedNotif.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!isOpen) {
      fetchNotifications();
    }
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ MAIN FIX: Fetch unread count on mount, set up polling, and listen for refresh events
  useEffect(() => {
    // Initial fetch
    fetchUnreadCount();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    // ✅ Listen for custom refresh events (triggered by report generation/deletion)
    const handleRefresh = () => {
      console.log('Notification refresh event received');
      fetchUnreadCount();
      // If dropdown is open, also refresh the notifications list
      if (isOpen) {
        fetchNotifications();
      }
    };
    
    window.addEventListener('refreshNotifications', handleRefresh);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('refreshNotifications', handleRefresh);
    };
  }, [isOpen]); // Include isOpen so the listener knows the current state

  // Get notification color based on priority
  const getPriorityColor = (priority) => {
    const colors = {
      URGENT: '#e74c3c',
      HIGH: '#f39c12',
      MEDIUM: '#3498db',
      LOW: '#95a5a6'
    };
    return colors[priority] || colors.MEDIUM;
  };

  // Format time ago
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <button className="notification-bell-button" onClick={toggleDropdown}>
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllAsRead} className="mark-all-read-btn">
                Mark all read
              </button>
            )}
          </div>

          <div className="notification-list">
            {loading ? (
              <div className="notification-loading">
                <div className="spinner"></div>
                <p>Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="no-notifications">
                <span className="no-notif-icon">📭</span>
                <p>No notifications yet</p>
                <span className="no-notif-text">We'll notify you when something arrives</span>
              </div>
            ) : (
              notifications.slice(0, 10).map((notification) => (
                <div
                  key={notification._id}
                  className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                  onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
                >
                  <div className="notification-icon-wrapper">
                    <span className="notification-icon">{notification.icon || '🔔'}</span>
                    {!notification.isRead && <span className="unread-dot"></span>}
                  </div>
                  
                  <div className="notification-content">
                    <div className="notification-title">{notification.title || 'Notification'}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">{timeAgo(notification.createdAt)}</div>
                  </div>

                  <div className="notification-actions">
                    <div 
                      className="priority-indicator" 
                      style={{ backgroundColor: getPriorityColor(notification.priority) }}
                      title={notification.priority}
                    ></div>
                    <button
                      className="delete-notification-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification._id);
                      }}
                      title="Delete"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="notification-footer">
              <a href="/notifications" className="view-all-link">
                View all notifications
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;