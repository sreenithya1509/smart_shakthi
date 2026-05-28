import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ActivityLog from '../models/ActivityLog.js';
import LiveLocation from '../models/LiveLocation.js';
import { env } from '../config/env.js';

const onlineUsers = new Map();

export const configureSocket = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Socket authentication required'));

      const decoded = jwt.verify(token, env.jwtSecret);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return next(new Error('Socket user not found'));

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Socket authentication failed'));
    }
  });

  io.on('connection', async (socket) => {
    const userId = socket.user._id.toString();
    onlineUsers.set(userId, socket.id);
    socket.join(`user:${userId}`);

    await User.findByIdAndUpdate(userId, { lastSeenAt: new Date() });
    io.emit('userOnline', {
      userId,
      name: socket.user.name,
      onlineUsers: Array.from(onlineUsers.keys())
    });

    socket.on('liveLocationUpdate', async (payload) => {
      if (!payload?.lat || !payload?.lng) return;

      const location = await LiveLocation.findOneAndUpdate(
        { user: userId },
        {
          lat: payload.lat,
          lng: payload.lng,
          accuracy: payload.accuracy,
          speed: payload.speed,
          heading: payload.heading,
          sharedWithGuardians: payload.sharedWithGuardians ?? true
        },
        { new: true, upsert: true }
      );

      io.to(`user:${userId}`).emit('liveLocationUpdate', { userId, location });
    });

    socket.on('emergencyTriggered', async (payload) => {
      io.emit('emergencyTriggered', {
        userId,
        user: { name: socket.user.name, phone: socket.user.phone },
        ...payload
      });
    });

    socket.on('guardianAlert', (payload) => {
      io.emit('guardianAlert', {
        userId,
        user: { name: socket.user.name, phone: socket.user.phone },
        ...payload
      });
    });

    socket.on('guardianTrackingUpdate', (payload) => {
      io.to(`user:${userId}`).emit('guardianTrackingUpdate', {
        userId,
        ...payload
      });
    });

    socket.on('typing', (payload) => {
      socket.to(`user:${userId}`).emit('typing', {
        userId,
        ...payload
      });
    });

    socket.on('aiAssistantActive', (payload) => {
      io.to(`user:${userId}`).emit('aiAssistantActive', {
        userId,
        ...payload
      });
    });

    socket.on('disconnect', async () => {
      onlineUsers.delete(userId);
      await User.findByIdAndUpdate(userId, { lastSeenAt: new Date() });
      await ActivityLog.create({
        user: userId,
        type: 'system',
        title: 'Realtime session ended',
        message: 'Device disconnected from guardian tracking'
      }).catch(() => null);

      io.emit('userOffline', {
        userId,
        onlineUsers: Array.from(onlineUsers.keys())
      });
    });
  });
};
