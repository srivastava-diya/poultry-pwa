import express from 'express';
import { createFarm, getFarmById, updateFarm, getFarms } from '../controllers/farmController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Only owner can update farms; owners and supervisors can create
router.get('/', protect, getFarms);
router.post('/', protect, authorize('owner', 'supervisor'), createFarm);
router.put('/:id', protect, authorize('owner'), updateFarm);

// Any authenticated user can view farm
router.get('/:id', protect, getFarmById);

export default router;
