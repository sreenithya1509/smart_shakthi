import express from 'express';
import { getSOSHistory, resolveSOS, triggerSOS } from '../controllers/sosController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getSOSHistory).post(triggerSOS);
router.patch('/:id/resolve', resolveSOS);

export default router;
