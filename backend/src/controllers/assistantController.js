import ChatSession from '../models/ChatSession.js';
import ActivityLog from '../models/ActivityLog.js';
import { askSafetyAssistant } from '../services/aiService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getChatSession = asyncHandler(async (req, res) => {
  let session = await ChatSession.findOne({ user: req.user._id, active: true }).sort({
    updatedAt: -1
  });

  if (!session) {
    session = await ChatSession.create({
      user: req.user._id,
      messages: [
        {
          role: 'assistant',
          content: 'Hi, I am your Smart Shakthi safety assistant. Tell me what is happening, or choose a quick prompt.',
          quickActions: ['I feel unsafe', 'Share my location', 'Cab safety tips']
        }
      ]
    });
  }

  sendSuccess(res, 200, 'Chat session fetched', { session });
});

export const sendAssistantMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message?.trim()) {
    res.status(400);
    throw new Error('Message is required');
  }

  let session = await ChatSession.findOne({ user: req.user._id, active: true }).sort({
    updatedAt: -1
  });

  if (!session) {
    session = await ChatSession.create({ user: req.user._id, messages: [] });
  }

  session.messages.push({ role: 'user', content: message.trim() });
  req.app.get('io')?.to(`user:${req.user._id}`).emit('typing', {
    actor: 'assistant',
    active: true
  });
  req.app.get('io')?.to(`user:${req.user._id}`).emit('aiAssistantActive', {
    userId: req.user._id,
    active: true
  });

  const reply = await askSafetyAssistant({ message, user: req.user });
  session.messages.push({
    role: 'assistant',
    content: reply.content,
    quickActions: reply.quickActions
  });
  await session.save();

  await ActivityLog.create({
    user: req.user._id,
    type: 'system',
    title: 'AI assistant used',
    message: message.trim().slice(0, 120)
  });

  req.app.get('io')?.to(`user:${req.user._id}`).emit('typing', {
    actor: 'assistant',
    active: false
  });
  req.app.get('io')?.to(`user:${req.user._id}`).emit('aiAssistantActive', {
    userId: req.user._id,
    active: false
  });

  sendSuccess(res, 200, 'Assistant response generated', {
    session,
    reply
  });
});
