import mongoose from 'mongoose';

const guardianStatusSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmergencyContact',
      default: null
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'watching', 'responding'],
      default: 'offline'
    },
    lastActiveAt: {
      type: Date,
      default: Date.now
    },
    currentAlert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SOSAlert',
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model('GuardianStatus', guardianStatusSchema);
