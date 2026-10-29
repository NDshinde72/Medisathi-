/**
 * RuralCare AI — Doctor Decision Support Controller
 * Empowers medical officers to review triage queues, validate/override AI risk scores,
 * add clinical notes, and manage prescriptions.
 */

import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.ts';
import { db } from '../data/store.ts';
import type { DoctorNote, TriageUrgency } from '../../src/types/index.ts';

export const getDoctorQueue = async (req: AuthenticatedRequest, res: Response) => {
  // Sort priority: EMERGENCY -> HIGH -> MODERATE -> LOW
  const priorityOrder: Record<TriageUrgency, number> = {
    EMERGENCY: 0,
    HIGH: 1,
    MODERATE: 2,
    LOW: 3,
  };

  const queue = [...db.consultations].sort((a, b) => {
    return (priorityOrder[a.urgencyLevel] ?? 9) - (priorityOrder[b.urgencyLevel] ?? 9);
  });

  res.json({
    success: true,
    data: {
      queue,
      totalPending: queue.filter((c) => c.status !== 'COMPLETED').length,
      highRiskCount: queue.filter((c) => c.urgencyLevel === 'EMERGENCY' || c.urgencyLevel === 'HIGH').length,
    },
  });
};

export const getDoctorPatientDetails = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const patient = db.patients.find((p) => p.id === id);
  if (!patient) {
    return res.status(404).json({ success: false, message: 'Patient record not found', error_code: 'NOT_FOUND' });
  }

  const patientConsultations = db.consultations.filter((c) => c.patientId === id);
  const patientReports = db.reports;

  res.json({
    success: true,
    data: {
      profile: patient,
      consultations: patientConsultations,
      reports: patientReports,
    },
  });
};

export const submitDoctorNotes = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      consultationId,
      clinicalObservations,
      agreesWithAITriage = true,
      doctorTriageOverride,
      recommendations,
      prescriptions = [],
      referralFacilityName,
    } = req.body;

    const consultation = db.consultations.find((c) => c.id === consultationId);
    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation not found', error_code: 'NOT_FOUND' });
    }

    const doctorProfile = db.doctors.find((d) => d.userId === req.user?.id) || db.doctors[0];

    const note: DoctorNote = {
      id: 'doc-note-' + Date.now(),
      consultationId,
      doctorId: doctorProfile.id,
      doctorName: doctorProfile.fullName,
      clinicalObservations,
      agreesWithAITriage,
      doctorTriageOverride,
      recommendations,
      prescriptions,
      referralFacilityName,
      createdAt: new Date().toISOString(),
    };

    consultation.doctorNotes = note;
    consultation.status = 'COMPLETED';
    if (!agreesWithAITriage && doctorTriageOverride) {
      consultation.urgencyLevel = doctorTriageOverride;
    }

    db.logAudit('DOCTOR_NOTE_ADDED', req.user?.id, { consultationId, agreesWithAITriage });

    res.json({
      success: true,
      message: 'Clinical assessment and doctor notes successfully saved.',
      data: consultation,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, error_code: 'NOTE_SAVE_FAILED' });
  }
};
