import { WorkoutLog } from '../models/WorkoutLog.js';

// @desc    Log or update sets for an exercise
// @route   POST /api/logs
// @access  Private
export const logExerciseSets = async (req, res) => {
  try {
    const { day, exerciseId, exerciseName, sets } = req.body;

    if (!day || !exerciseId || !exerciseName || !Array.isArray(sets)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide day, exerciseId, exerciseName, and sets array.',
      });
    }

    // Calculate best weight and reps for this session
    let bestWeight = 0;
    let bestReps = 0;

    const formattedSets = sets.map((s, idx) => {
      const weight = Number(s.weightKg) || 0;
      const reps = Number(s.reps) || 0;
      if (s.completed && weight >= bestWeight) {
        bestWeight = weight;
        bestReps = reps;
      }
      return {
        setNumber: s.setNumber || idx + 1,
        weightKg: weight,
        reps,
        completed: Boolean(s.completed),
        completedAt: s.completed ? new Date() : null,
      };
    });

    // Check if an existing log exists for today/current session
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    let log = await WorkoutLog.findOne({
      userId: req.user._id,
      day: day.toUpperCase(),
      exerciseId,
      createdAt: { $gte: startOfToday },
    });

    if (log) {
      log.sets = formattedSets;
      log.bestWeightKg = bestWeight;
      log.bestReps = bestReps;
      await log.save();
    } else {
      log = await WorkoutLog.create({
        userId: req.user._id,
        day: day.toUpperCase(),
        exerciseId,
        exerciseName,
        sets: formattedSets,
        bestWeightKg: bestWeight,
        bestReps: bestReps,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Exercise logged successfully.',
      data: log,
    });
  } catch (error) {
    console.error('[Log Exercise Error]', error);
    return res.status(500).json({ success: false, message: 'Failed to save workout log.' });
  }
};

// @desc    Get user's logged sets for a specific day
// @route   GET /api/logs/day/:day
// @access  Private
export const getDayLogs = async (req, res) => {
  try {
    const day = req.params.day.toUpperCase();

    // Find the latest logs for each exercise in this day
    const logs = await WorkoutLog.find({
      userId: req.user._id,
      day,
    }).sort({ createdAt: -1 });

    // Group by exerciseId, returning the most recent log per exercise
    const latestByExercise = {};
    for (const log of logs) {
      if (!latestByExercise[log.exerciseId]) {
        latestByExercise[log.exerciseId] = log;
      }
    }

    return res.json({
      success: true,
      data: latestByExercise,
    });
  } catch (error) {
    console.error('[Get Day Logs Error]', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve logs.' });
  }
};

// @desc    Get exercise PR / Last Week's Best
// @route   GET /api/logs/exercise/:exerciseId/best
// @access  Private
export const getExerciseBest = async (req, res) => {
  try {
    const { exerciseId } = req.params;

    const previousLog = await WorkoutLog.findOne({
      userId: req.user._id,
      exerciseId,
      bestWeightKg: { $gt: 0 },
    }).sort({ createdAt: -1 });

    if (!previousLog) {
      return res.json({
        success: true,
        best: null,
      });
    }

    return res.json({
      success: true,
      best: {
        weightKg: previousLog.bestWeightKg,
        reps: previousLog.bestReps,
        date: previousLog.createdAt,
      },
    });
  } catch (error) {
    console.error('[Get Exercise Best Error]', error);
    return res.status(500).json({ success: false, message: 'Failed to get best.' });
  }
};

// @desc    Get weekly volume analytics across Monday to Saturday
// @route   GET /api/logs/analytics/weekly
// @access  Private
export const getWeeklyAnalytics = async (req, res) => {
  try {
    // 7 days ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const logs = await WorkoutLog.find({
      userId: req.user._id,
      createdAt: { $gte: oneWeekAgo },
    });

    const dayVolumes = {
      MONDAY: { volumeKg: 0, totalSets: 0, totalReps: 0 },
      TUESDAY: { volumeKg: 0, totalSets: 0, totalReps: 0 },
      WEDNESDAY: { volumeKg: 0, totalSets: 0, totalReps: 0 },
      THURSDAY: { volumeKg: 0, totalSets: 0, totalReps: 0 },
      FRIDAY: { volumeKg: 0, totalSets: 0, totalReps: 0 },
      SATURDAY: { volumeKg: 0, totalSets: 0, totalReps: 0 },
      SUNDAY: { volumeKg: 0, totalSets: 0, totalReps: 0 },
    };

    let totalWeeklyVolume = 0;
    let totalWeeklySets = 0;

    logs.forEach((log) => {
      const dayKey = log.day ? log.day.toUpperCase() : 'MONDAY';
      if (dayVolumes[dayKey]) {
        log.sets.forEach((set) => {
          if (set.completed) {
            const vol = (set.weightKg || 0) * (set.reps || 0);
            dayVolumes[dayKey].volumeKg += vol;
            dayVolumes[dayKey].totalSets += 1;
            dayVolumes[dayKey].totalReps += set.reps || 0;
            totalWeeklyVolume += vol;
            totalWeeklySets += 1;
          }
        });
      }
    });

    return res.json({
      success: true,
      data: {
        dayVolumes,
        totalWeeklyVolume,
        totalWeeklySets,
      },
    });
  } catch (error) {
    console.error('[Weekly Analytics Error]', error);
    return res.status(500).json({ success: false, message: 'Failed to get analytics.' });
  }
};
