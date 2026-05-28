import SOSAlert from '../models/SOSAlert.js';
import User from '../models/User.js';
import ActivityLog from '../models/ActivityLog.js';
import EmergencyContact from '../models/EmergencyContact.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const triggerSOS = asyncHandler(async (req, res) => {
  const { location, message } = req.body;

  if (!location?.lat || !location?.lng) {
    res.status(400);
    throw new Error('Live location is required to trigger SOS');
  }

  const alert = await SOSAlert.create({
    user: req.user._id,
    location,
    message: message || 'Emergency SOS triggered'
  });

  await User.findByIdAndUpdate(req.user._id, { safetyStatus: 'emergency' });

  const contacts = await EmergencyContact.find({
    user: req.user._id,
    alertEnabled: true
  });

  await ActivityLog.create({
    user: req.user._id,
    type: 'sos',
    title: 'SOS emergency triggered',
    message: `Emergency alert sent to ${contacts.length} guardians`,
    metadata: { alert: alert._id, location }
  });

  const payload = {
    alert,
    user: {
      id: req.user._id,
      name: req.user.name,
      phone: req.user.phone
    },
    contacts
  };

  const io = req.app.get('io');
  io?.to(`user:${req.user._id}`).emit('emergencyTriggered', payload);
  io?.emit('guardianAlert', payload);

  sendSuccess(res, 201, 'SOS triggered successfully', payload);
});

export const getSOSHistory = asyncHandler(async (req, res) => {
  const alerts = await SOSAlert.find({ user: req.user._id }).sort({ createdAt: -1 });
  sendSuccess(res, 200, 'SOS history fetched', { alerts });
});

export const resolveSOS = asyncHandler(async (req, res) => {
  const alert = await SOSAlert.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { status: 'resolved', resolvedAt: new Date() },
    { new: true }
  );

  if (!alert) {
    res.status(404);
    throw new Error('SOS alert not found');
  }

  await User.findByIdAndUpdate(req.user._id, { safetyStatus: 'safe' });
  await ActivityLog.create({
    user: req.user._id,
    type: 'sos',
    title: 'SOS resolved',
    message: 'Emergency status returned to safe'
  });

  req.app.get('io')?.to(`user:${req.user._id}`).emit('emergencyResolved', alert);
  sendSuccess(res, 200, 'SOS resolved', { alert });
});
