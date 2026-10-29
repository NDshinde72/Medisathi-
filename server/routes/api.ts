/**
 * RuralCare AI — Master API Router
 * Aggregates all modular sub-routers under /api
 */

import express from 'express';
import { authenticateToken } from '../middleware/auth.ts';
import * as authController from '../controllers/authController.ts';
import * as patientController from '../controllers/patientController.ts';
import * as assessmentController from '../controllers/assessmentController.ts';
import * as doctorController from '../controllers/doctorController.ts';
import * as facilityController from '../controllers/facilityController.ts';
import * as reportController from '../controllers/reportController.ts';
import * as adminController from '../controllers/adminController.ts';

const router = express.Router();

// 1. System Health
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'RuralCare AI Full-Stack Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    governance: {
      triageSafetyGate: 'ACTIVE',
      whoIcmrVectorEngine: 'OPERATIONAL',
      doctorInTheLoop: 'ENABLED',
    },
  });
});

// 2. Authentication Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authenticateToken, authController.getMe);

// 3. Patient Module Routes
router.get('/patient/profile', authenticateToken, patientController.getPatientProfile);
router.put('/patient/profile', authenticateToken, patientController.updatePatientProfile);
router.get('/patient/timeline', authenticateToken, patientController.getPatientTimeline);

// 4. Clinical Assessment & Triage Routes
router.post('/assessment', authenticateToken, assessmentController.processAssessment);
router.get('/consultations', authenticateToken, assessmentController.getConsultations);
router.get('/consultations/:id', authenticateToken, assessmentController.getConsultationById);

// 5. Doctor Decision Support Routes
router.get('/doctor/queue', authenticateToken, doctorController.getDoctorQueue);
router.get('/doctor/patient/:id', authenticateToken, doctorController.getDoctorPatientDetails);
router.post('/doctor/notes', authenticateToken, doctorController.submitDoctorNotes);

// 6. Healthcare Facilities Routes
router.get('/facilities', facilityController.getFacilities);

// 7. Medical Report OCR Routes
router.post('/reports/upload', authenticateToken, reportController.uploadAndAnalyzeReport);
router.get('/reports', authenticateToken, reportController.getReports);

// 8. Admin & Knowledge Base Routes
router.get('/admin/analytics', authenticateToken, adminController.getAnalytics);
router.get('/admin/users', authenticateToken, adminController.getUsers);
router.get('/admin/documents', authenticateToken, adminController.getRAGDocuments);
router.post('/admin/documents', authenticateToken, adminController.ingestRAGDocument);
router.delete('/admin/documents/:id', authenticateToken, adminController.deleteRAGDocument);

export default router;
