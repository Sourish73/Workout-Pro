import express from 'express';
import { getAdminStats } from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Only authenticated admin (Akshita Sahu) can access
router.get('/stats', protect, getAdminStats);

export default router;
