import User from '../models/User.js';
import ActivityLog from '../models/ActivityLog.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/generateToken.js';
import { sendSuccess } from '../utils/apiResponse.js';

const userPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  avatar: user.avatar,
  safetyStatus: user.safetyStatus,
  trustedCode: user.trustedCode,
  createdAt: user.createdAt
});

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email, and password are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error('An account already exists with this email');
  }

  const user = await User.create({ name, email, password, phone });
  await ActivityLog.create({
    user: user._id,
    type: 'auth',
    title: 'Account created',
    message: 'Smart Shakthi profile is ready'
  });

  sendSuccess(res, 201, 'Signup successful', {
    user: userPayload(user),
    token: generateToken(user._id)
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  user.lastSeenAt = new Date();
  await user.save();

  await ActivityLog.create({
    user: user._id,
    type: 'auth',
    title: 'Secure login',
    message: 'New session started'
  });

  sendSuccess(res, 200, 'Login successful', {
    user: userPayload(user),
    token: generateToken(user._id)
  });
});

export const getMe = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, 'Profile fetched', { user: userPayload(req.user) });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, avatar, trustedCode, safetyStatus } = req.body;
  const user = await User.findById(req.user._id);

  user.name = name ?? user.name;
  user.phone = phone ?? user.phone;
  user.avatar = avatar ?? user.avatar;
  user.trustedCode = trustedCode ?? user.trustedCode;
  user.safetyStatus = safetyStatus ?? user.safetyStatus;

  await user.save();
  sendSuccess(res, 200, 'Profile updated', { user: userPayload(user) });
});

export const logout = asyncHandler(async (req, res) => {
  await ActivityLog.create({
    user: req.user._id,
    type: 'auth',
    title: 'Logged out',
    message: 'Session ended safely'
  });

  sendSuccess(res, 200, 'Logout successful');
});
