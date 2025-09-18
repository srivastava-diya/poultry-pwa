import express from 'express';
import { createPigHerd, getPigHerdsByFarm, getPigHerdById } from '../controllers/pigHerdController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Owner can create pig herd
router.post('/', protect, authorize('owner'), createPigHerd);

// Get pig herds for a farm
router.get('/farm/:farmId', protect, getPigHerdsByFarm);

// Get single pig herd by ID
router.get('/:id', protect, getPigHerdById);

export default router;
