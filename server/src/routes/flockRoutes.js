import express from 'express';
import { createFlock, getFlocksByFarm, getFlockById } from '../controllers/flockController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Owner can create flocks
router.post('/', protect, authorize('owner'), createFlock);

// Get flocks for a farm
router.get('/farm/:farmId', protect, getFlocksByFarm);

// Get single flock by ID
router.get('/:id', protect, getFlockById);

export default router;
