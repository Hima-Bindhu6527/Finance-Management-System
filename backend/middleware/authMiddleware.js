const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token with activeToken field
      const user = await User.findById(decoded.id).select('-password +activeToken');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if this token matches the active token (single device login)
      if (user.activeToken && user.activeToken !== token) {
        return res.status(401).json({
          success: false,
          message: 'Session expired. You have been logged in from another device.',
          code: 'SESSION_REPLACED'
        });
      }

      // Remove activeToken from user object before attaching to request
      user.activeToken = undefined;
      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
};

module.exports = { protect };