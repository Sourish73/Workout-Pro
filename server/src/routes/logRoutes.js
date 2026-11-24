import express from 'express';
import {
  logExerciseSets,
  getDayLogs,
  getExerciseBest,
  getWeeklyAnalytics,
} from '../controllers/logController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, logExerciseSets);
router.get('/day/:day', protect, getDayLogs);
router.get('/exercise/:exerciseId/best', protect, getExerciseBest);
router.get('/analytics/weekly', protect, getWeeklyAnalytics);

export default router;
