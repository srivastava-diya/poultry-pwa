import express from 'express';
import { createCattleHerd, getCattleHerdsByFarm, getCattleHerdById, updateCattleHerd } from '../controllers/cattleHerdController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Owner can create/update cattle herd
router.post('/', protect, authorize('owner'), createCattleHerd);
router.put('/:id', protect, authorize('owner'), updateCattleHerd);

// Get cattle herds
router.get('/farm/:farmId', protect, getCattleHerdsByFarm);
router.get('/:id', protect, getCattleHerdById);

export default router;
