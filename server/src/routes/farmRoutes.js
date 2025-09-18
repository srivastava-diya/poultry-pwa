import express from 'express';
import { createFarm, getFarmById, updateFarm } from '../controllers/farmController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Only owner can create/update farms
router.post('/', protect, authorize('owner'), createFarm);
router.put('/:id', protect, authorize('owner'), updateFarm);

// Any authenticated user can view farm
router.get('/:id', protect, getFarmById);

export default router;
