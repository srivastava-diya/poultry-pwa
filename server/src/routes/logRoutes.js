import express from 'express';
import { createDailyLog, getLogsByGroup } from '../controllers/dailyLogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create daily log (any authenticated user)
router.post('/:animalType', protect, createDailyLog);

// Get logs for a group
router.get('/:animalType/:groupId', protect, getLogsByGroup);

export default router;
