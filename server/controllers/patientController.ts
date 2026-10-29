/**
 * RuralCare AI — Patient Controller
 * Manages patient baseline demographics, longitudinal timeline, and active medications.
 */

import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.ts';
import { db } from '../data/store.ts';

export const getPatientProfile = async (req: AuthenticatedRequest, res: Response) => {
  const profile = db.patients.find((p) => p.userId === req.user?.id) || db.patients[0];
  res.json({
    success: true,
    data: profile,
  });
};

export const updatePatientProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const profile = db.patients.find((p) => p.userId === req.user?.id) || db.patients[0];
    Object.assign(profile, req.body);
    db.logAudit('PATIENT_PROFILE_UPDATED', req.user?.id, { profileId: profile.id });
    res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: profile,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, error_code: 'UPDATE_FAILED' });
  }
};

export const getPatientTimeline = async (req: AuthenticatedRequest, res: Response) => {
  const patientProfile = db.patients.find((p) => p.userId === req.user?.id) || db.patients[0];
  const consultations = db.consultations.filter((c) => c.patientId === patientProfile.id);
  const reports = db.reports;

  const timelineEvents = [
    ...consultations.map((c) => ({
      id: c.id,
      type: 'CONSULTATION',
      title: `Health Assessment (${c.urgencyLevel} Urgency)`,
      subtitle: c.chiefComplaint,
      date: c.createdAt,
      status: c.status,
      badge: c.urgencyLevel,
    })),
    ...reports.map((r) => ({
      id: r.id,
      type: 'REPORT',
      title: `Medical Report Uploaded: ${r.fileName}`,
      subtitle: r.interpretation,
      date: r.uploadedAt,
      status: r.isAbnormal ? 'Flagged Parameter' : 'Normal',
      badge: r.isAbnormal ? 'HIGH' : 'LOW',
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  res.json({
    success: true,
    data: {
      profile: patientProfile,
      events: timelineEvents,
    },
  });
};
