const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const notificationService = {
  // Get all notifications
  getNotifications: async (page = 1, unreadOnly = false) => {
    try {
      const response = await fetch(
        `${API_URL}/notifications?page=${page}&unreadOnly=${unreadOnly}`,
        {
          headers: getAuthHeaders(),
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Get unread count
  getUnreadCount: async () => {
    try {
      const response = await fetch(`${API_URL}/notifications/unread-count`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      return data.count || 0;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      return 0;
    }
  },

  // Mark as read
  markAsRead: async (notificationId) => {
    try {
      const response = await fetch(
        `${API_URL}/notifications/${notificationId}/read`,
        {
          method: 'PUT',
          headers: getAuthHeaders(),
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Mark all as read
  markAllAsRead: async () => {
    try {
      const response = await fetch(`${API_URL}/notifications/mark-all-read`, {
        method: 'PUT',
        headers: getAuthHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error('Error marking all as read:', error);
      throw error;
    }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await fetch(
        `${API_URL}/notifications/${notificationId}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  // Delete all read
  deleteAllRead: async () => {
    try {
      const response = await fetch(
        `${API_URL}/notifications/delete-all-read`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Error deleting notifications:', error);
      throw error;
    }
  },

  // Add this inside your existing notificationService object:

// Create a new notification
createNotification: async (message) => {
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ message }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  },
  
};