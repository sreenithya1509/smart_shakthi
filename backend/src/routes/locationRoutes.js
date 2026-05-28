import express from 'express';
import { getLiveLocation, upsertLiveLocation } from '../controllers/locationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/live').get(getLiveLocation).post(upsertLiveLocation);

export default router;
