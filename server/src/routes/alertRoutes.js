import express from 'express';
import { createAlert, getAlertsByZip } from '../controllers/alertController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Vet only can trigger alerts
router.post('/trigger', protect, authorize('vet'), createAlert);

// Any authenticated user can view alerts by zip
router.get('/:zipCode', protect, getAlertsByZip);

export default router;
