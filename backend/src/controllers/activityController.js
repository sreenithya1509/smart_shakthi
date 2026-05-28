import ActivityLog from '../models/ActivityLog.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getActivity = asyncHandler(async (req, res) => {
  const activity = await ActivityLog.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(30);

  sendSuccess(res, 200, 'Activity fetched', { activity });
});
