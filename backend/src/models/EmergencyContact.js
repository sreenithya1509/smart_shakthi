import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    relationship: {
      type: String,
      trim: true,
      default: 'Guardian'
    },
    priority: {
      type: Number,
      min: 1,
      max: 5,
      default: 1
    },
    favorite: {
      type: Boolean,
      default: false
    },
    alertEnabled: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('EmergencyContact', emergencyContactSchema);
