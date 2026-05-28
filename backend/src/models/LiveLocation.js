import mongoose from 'mongoose';

const liveLocationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number,
      default: null
    },
    speed: {
      type: Number,
      default: null
    },
    heading: {
      type: Number,
      default: null
    },
    sharedWithGuardians: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('LiveLocation', liveLocationSchema);
