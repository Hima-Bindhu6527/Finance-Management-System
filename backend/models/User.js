const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // OTP fields for 2FA
  otp: {
    type: String,
    select: false
  },
  otpExpires: {
    type: Date,
    select: false
  },
  isOtpVerified: {
    type: Boolean,
    default: false,
    select: false
  },
  // Profile fields
  fullNameAsPerPAN: {
    type: String,
    trim: true,
    default: ''
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
  },
  companyName: {
    type: String,
    trim: true,
  },
  designation: {
    type: String,
    trim: true,
  },
  isSmoker: {
    type: Boolean,
    default: false,
  },
  hasChildren: {
    type: Boolean,
    default: false,
  },
  numberOfChildren: {
    type: Number,
    default: 0,
  },
  hasDependents: {
    type: Boolean,
    default: false,
  },
  numberOfDependents: {
    type: Number,
    default: 0,
  },
  // Login/Logout tracking
  lastLoginAt: {
    type: Date,
  },
  lastLogoutAt: {
    type: Date,
  },
  previousLoginAt: {
    type: Date,
  }
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);