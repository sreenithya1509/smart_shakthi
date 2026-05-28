import express from 'express';
import { getChatSession, sendAssistantMessage } from '../controllers/assistantController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/session').get(getChatSession).post(sendAssistantMessage);

export default router;
