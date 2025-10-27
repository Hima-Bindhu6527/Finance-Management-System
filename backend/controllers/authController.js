const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendOTPEmail, sendWelcomeEmail } = require('../utils/emailService');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register new user (Step 1: Send OTP)
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      // Generate OTP
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + (process.env.OTP_EXPIRE_MINUTES || 5) * 60 * 1000);

      // Save OTP to user (hashed for security)
      const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
      user.otp = hashedOTP;
      user.otpExpires = otpExpires;
      user.isOtpVerified = false;
      await user.save();

      // Send OTP via email
      try {
        await sendOTPEmail(user.email, otp, user.name);
        
        res.status(201).json({
          success: true,
          message: 'Account created! OTP sent to your email',
          requiresOTP: true,
          userId: user._id,
          email: user.email,
          name: user.name
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        res.status(201).json({
          success: true,
          message: 'Account created, but OTP email failed. Please use resend OTP.',
          requiresOTP: true,
          userId: user._id,
          email: user.email,
          name: user.name
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user (Step 1: Send OTP)
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + (process.env.OTP_EXPIRE_MINUTES || 5) * 60 * 1000);

    // Save OTP to user (hashed for security)
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
    user.otp = hashedOTP;
    user.otpExpires = otpExpires;
    user.isOtpVerified = false;
    await user.save();

    // Send OTP via email
    try {
      await sendOTPEmail(user.email, otp, user.name);
      
      res.status(200).json({
        success: true,
        message: 'OTP sent to your email',
        requiresOTP: true,
        userId: user._id,
        email: user.email
      });
    } catch (emailError) {
      // If email fails, still return success but with different message
      console.error('Email sending failed:', emailError);
      res.status(200).json({
        success: true,
        message: 'Login successful, but OTP email failed. Please use resend OTP.',
        requiresOTP: true,
        userId: user._id,
        email: user.email
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email address'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + (process.env.OTP_EXPIRE_MINUTES || 5) * 60 * 1000);

    // Save OTP to user
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
    user.otp = hashedOTP;
    user.otpExpires = otpExpires;
    user.isOtpVerified = false;
    await user.save();

    // Send OTP via email
    try {
      await sendOTPEmail(user.email, otp, user.name);
      
      res.status(200).json({
        success: true,
        message: 'OTP sent to your email',
        requiresOTP: true,
        userId: user._id,
        email: user.email
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      res.status(500).json({
        success: false,
        message: 'Failed to send OTP email. Please try again.'
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reset Password (After OTP verification)
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { userId, otp, newPassword } = req.body;

    if (!userId || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Get user with OTP fields
    const user = await User.findById(userId).select('+otp +otpExpires +password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if OTP exists
    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found. Please request a new one.'
      });
    }

    // Check if OTP has expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Hash the provided OTP and compare
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    if (hashedOTP !== user.otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // OTP is valid - update password and clear OTP fields
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    // return full user object (exclude password)
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Change password for current user
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide current and new password' });
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update profile for current user
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Prevent updating protected fields
    delete updateData.email;
    delete updateData.password;

    // If dateOfBirth provided, ensure user is at least 18 years old
    if (updateData.dateOfBirth) {
      const dob = new Date(updateData.dateOfBirth);
      if (isNaN(dob.getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid dateOfBirth' });
      }
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      if (age < 18) {
        return res.status(400).json({ success: false, message: 'User must be at least 18 years old' });
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
      select: '-password'
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Verify OTP (Step 2: Complete Login)
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide user ID and OTP'
      });
    }

    // Get user with OTP fields
    const user = await User.findById(userId).select('+otp +otpExpires +isOtpVerified');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if OTP exists
    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found. Please request a new one.'
      });
    }

    // Check if OTP has expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Hash the provided OTP and compare
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    if (hashedOTP !== user.otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // OTP is valid - clear OTP fields and mark as verified
    // Update login timestamps
    user.previousLoginAt = user.lastLoginAt; // Store previous login time
    user.lastLoginAt = new Date(); // Set current login time
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerified = true;
    await user.save();

    // Send welcome email for new signups (non-blocking)
    sendWelcomeEmail(user.email, user.name).catch(err => 
      console.error('Failed to send welcome email:', err)
    );

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        lastLoginAt: user.lastLoginAt,
        previousLoginAt: user.previousLoginAt,
        lastLogoutAt: user.lastLogoutAt
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
exports.resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide user ID'
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + (process.env.OTP_EXPIRE_MINUTES || 5) * 60 * 1000);

    // Save new OTP to user
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
    user.otp = hashedOTP;
    user.otpExpires = otpExpires;
    user.isOtpVerified = false;
    await user.save();

    // Send OTP via email
    try {
      await sendOTPEmail(user.email, otp, user.name);
      
      res.status(200).json({
        success: true,
        message: 'New OTP sent to your email'
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      res.status(500).json({
        success: false,
        message: 'Failed to send OTP email. Please try again.'
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Logout user and track logout time
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;

    // Update last logout time
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.lastLogoutAt = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Logout successful',
      lastLogoutAt: user.lastLogoutAt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};