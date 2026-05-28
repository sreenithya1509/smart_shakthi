import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    accuracy: { type: Number, default: null },
    address: { type: String, default: '' }
  },
  { _id: false }
);

const sosAlertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    location: {
      type: locationSchema,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'resolved', 'false_alarm'],
      default: 'active',
      index: true
    },
    message: {
      type: String,
      default: 'Emergency SOS triggered'
    },
    severity: {
      type: String,
      enum: ['medium', 'high', 'critical'],
      default: 'critical'
    },
    resolvedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model('SOSAlert', sosAlertSchema);
