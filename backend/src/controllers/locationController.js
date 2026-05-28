import LiveLocation from '../models/LiveLocation.js';
import ActivityLog from '../models/ActivityLog.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const upsertLiveLocation = asyncHandler(async (req, res) => {
  const { lat, lng, accuracy, speed, heading, sharedWithGuardians } = req.body;

  if (!lat || !lng) {
    res.status(400);
    throw new Error('Latitude and longitude are required');
  }

  const location = await LiveLocation.findOneAndUpdate(
    { user: req.user._id },
    { lat, lng, accuracy, speed, heading, sharedWithGuardians },
    { new: true, upsert: true, runValidators: true }
  );

  req.app.get('io')?.to(`user:${req.user._id}`).emit('liveLocationUpdate', {
    userId: req.user._id,
    location
  });

  sendSuccess(res, 200, 'Live location updated', { location });
});

export const getLiveLocation = asyncHandler(async (req, res) => {
  const location = await LiveLocation.findOne({ user: req.user._id });
  sendSuccess(res, 200, 'Live location fetched', { location });
});
