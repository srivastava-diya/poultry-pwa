import express from 'express';
import { createHealthReport, getReportsByGroup, updateHealthReport } from '../controllers/healthController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Supervisor or owner can create health report
router.post('/report', protect, authorize('supervisor','owner'), createHealthReport);

// Get reports for a group (any authenticated user)
router.get('/report/group/:groupId', protect, getReportsByGroup);

// Vet can update report
router.put('/report/:reportId', protect, authorize('vet'), updateHealthReport);

export default router;
