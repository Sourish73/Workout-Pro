import mongoose from 'mongoose';

const setLogSchema = new mongoose.Schema({
  setNumber: { type: Number, required: true },
  weightKg: { type: Number, default: 0 },
  reps: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: Date.now },
});

const workoutLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    day: {
      type: String,
      required: true,
      uppercase: true,
      index: true,
    },
    exerciseId: {
      type: String,
      required: true,
      index: true,
    },
    exerciseName: {
      type: String,
      required: true,
    },
    sets: [setLogSchema],
    bestWeightKg: {
      type: Number,
      default: 0,
    },
    bestReps: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for querying latest log per user per exercise
workoutLogSchema.index({ userId: 1, exerciseId: 1, createdAt: -1 });

export const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema);
