import express from 'express';
import {
  alertContacts,
  createContact,
  deleteContact,
  getContacts,
  updateContact
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getContacts).post(createContact);
router.post('/alert', alertContacts);
router.route('/:id').put(updateContact).delete(deleteContact);

export default router;
