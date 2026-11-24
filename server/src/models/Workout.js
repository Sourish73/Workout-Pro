import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, default: 'General' }, // e.g. Biceps, Forearms, Triceps, Quads, Shoulders
  sets: { type: Number, required: true, default: 3 },
  reps: { type: String, required: true }, // e.g., '12–15', 'Heavy Weight, Close to Failure'
  targetWeightKg: { type: Number, default: 0 },
  notes: { type: String, default: '' },
  youtubeVideoId: { type: String, default: '' },
  formCues: {
    setup: { type: String, default: '' },
    execution: { type: String, default: '' },
    breathing: { type: String, default: '' },
  },
});

const warmupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  setsReps: { type: String, required: true },
  duration: { type: String, default: '' },
  notes: { type: String, default: '' },
});

const recoveryTaskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  target: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'check-circle' },
});

const workoutSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
    },
    dayNumber: { type: Number, required: true }, // 1 to 7
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    isPro: { type: Boolean, default: false },
    targetMuscles: [{ type: String }],
    estimatedDuration: { type: String, default: '45–60 mins' },
    intensity: { type: String, default: 'High' },
    description: { type: String, default: '' },
    warmup: [warmupSchema],
    exercises: [exerciseSchema],
    recoveryChecklist: [recoveryTaskSchema],
  },
  {
    timestamps: true,
  }
);

export const Workout = mongoose.model('Workout', workoutSchema);
