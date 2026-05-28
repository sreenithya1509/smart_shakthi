import EmergencyContact from '../models/EmergencyContact.js';
import ActivityLog from '../models/ActivityLog.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await EmergencyContact.find({ user: req.user._id }).sort({
    favorite: -1,
    priority: 1,
    createdAt: -1
  });

  sendSuccess(res, 200, 'Contacts fetched', { contacts });
});

export const createContact = asyncHandler(async (req, res) => {
  const contact = await EmergencyContact.create({
    ...req.body,
    user: req.user._id
  });

  await ActivityLog.create({
    user: req.user._id,
    type: 'contact',
    title: 'Emergency contact added',
    message: `${contact.name} can now receive safety alerts`
  });

  sendSuccess(res, 201, 'Contact added', { contact });
});

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await EmergencyContact.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  sendSuccess(res, 200, 'Contact updated', { contact });
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await EmergencyContact.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  await ActivityLog.create({
    user: req.user._id,
    type: 'contact',
    title: 'Emergency contact removed',
    message: `${contact.name} was removed from guardian alerts`
  });

  sendSuccess(res, 200, 'Contact deleted');
});

export const alertContacts = asyncHandler(async (req, res) => {
  const contacts = await EmergencyContact.find({
    user: req.user._id,
    alertEnabled: true
  });

  const io = req.app.get('io');
  io?.to(`user:${req.user._id}`).emit('guardianAlert', {
    userId: req.user._id,
    contacts,
    message: req.body.message || 'Guardian alert sent'
  });

  await ActivityLog.create({
    user: req.user._id,
    type: 'guardian',
    title: 'Guardian alert sent',
    message: `${contacts.length} trusted contacts notified`
  });

  sendSuccess(res, 200, 'Guardian alerts dispatched', { contacts });
});
