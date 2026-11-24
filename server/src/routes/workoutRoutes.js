import express from 'express';
import {
  getWeeklyOverview,
  getWorkoutByDay,
  completeDayWorkout,
} from '../controllers/workoutController.js';

const router = express.Router();

// 100% Free Public routes for the Winter Arc Guide
router.get('/', getWeeklyOverview);
router.get('/:day', getWorkoutByDay);
router.post('/:day/complete', completeDayWorkout);

export default router;
