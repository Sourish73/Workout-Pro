import { Workout } from '../models/Workout.js';

// @desc    Get weekly overview (all 7 days - 100% Free & Open)
// @route   GET /api/workouts
// @access  Public
export const getWeeklyOverview = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ dayNumber: 1 });

    const formatted = workouts.map((w) => ({
      _id: w._id,
      day: w.day,
      dayNumber: w.dayNumber,
      title: w.title,
      subtitle: w.subtitle,
      isPro: false,
      isLocked: false, // 100% Unlocked for all users
      targetMuscles: w.targetMuscles,
      estimatedDuration: w.estimatedDuration,
      intensity: w.intensity,
      exerciseCount: w.exercises ? w.exercises.length : 0,
      warmupCount: w.warmup ? w.warmup.length : 0,
      hasChecklist: (w.recoveryChecklist && w.recoveryChecklist.length > 0) || false,
    }));

    return res.json({
      success: true,
      data: formatted,
      plan: 'COMPLETE_WINTER_ARC_GUIDE_FREE',
    });
  } catch (error) {
    console.error('[Get Weekly Overview Error]', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve workouts.' });
  }
};

// @desc    Get detailed workout for a specific day (100% Free & Open)
// @route   GET /api/workouts/:day
// @access  Public
export const getWorkoutByDay = async (req, res) => {
  try {
    const day = req.params.day.toUpperCase();

    const workout = await Workout.findOne({ day });
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: `Workout plan for ${day} not found.`,
      });
    }

    // Full workout payload returned freely without paywall or login restriction
    return res.json({
      success: true,
      data: {
        _id: workout._id,
        day: workout.day,
        dayNumber: workout.dayNumber,
        title: workout.title,
        subtitle: workout.subtitle,
        isPro: false,
        isLocked: false,
        targetMuscles: workout.targetMuscles,
        estimatedDuration: workout.estimatedDuration,
        intensity: workout.intensity,
        description: workout.description,
        warmup: workout.warmup,
        exercises: workout.exercises,
        recoveryChecklist: workout.recoveryChecklist,
      },
    });
  } catch (error) {
    console.error('[Get Workout By Day Error]', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve workout.' });
  }
};

// @desc    Mark a day's workout as completed (Public / Optional Auth)
// @route   POST /api/workouts/:day/complete
// @access  Public
export const completeDayWorkout = async (req, res) => {
  try {
    const day = req.params.day.toUpperCase();
    return res.json({
      success: true,
      message: `Great job! ${day} marked as completed in your Winter Arc.`,
      day,
    });
  } catch (error) {
    console.error('[Complete Day Workout Error]', error);
    return res.status(500).json({ success: false, message: 'Failed to complete workout.' });
  }
};
