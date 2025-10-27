import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Signup user
export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Login user (Step 1: Get OTP)
export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  // Don't store token yet - waiting for OTP verification
  return response.data;
};

// Verify OTP (Step 2: Complete Login)
export const verifyOTP = async (otpData) => {
  const response = await api.post('/auth/verify-otp', otpData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Resend OTP
export const resendOTP = async (userId) => {
  const response = await api.post('/auth/resend-otp', { userId });
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// Reset Password
export const resetPassword = async (userId, otp, newPassword) => {
  const response = await api.post('/auth/reset-password', { userId, otp, newPassword });
  return response.data;
};

// Get current user
export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Logout
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Change password
export const changePassword = async (passwords) => {
  const response = await api.put('/auth/change-password', passwords);
  return response.data;
};

// Update profile
export const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData);
  return response.data;
};

export default api;