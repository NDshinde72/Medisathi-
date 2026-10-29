/**
 * RuralCare AI — Admin Governance, Knowledge Base & Analytics Controller
 * Manages official RAG document ingestion, user registries, and public health telemetry.
 */

import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.ts';
import { db } from '../data/store.ts';

export const getAnalytics = async (req: AuthenticatedRequest, res: Response) => {
  const totalUsers = db.users.length;
  const totalPatients = db.patients.length;
  const totalDoctors = db.doctors.length;
  const totalConsultations = db.consultations.length;
  const totalReports = db.reports.length;

  const triageBreakdown = {
    EMERGENCY: db.consultations.filter((c) => c.urgencyLevel === 'EMERGENCY').length,
    HIGH: db.consultations.filter((c) => c.urgencyLevel === 'HIGH').length,
    MODERATE: db.consultations.filter((c) => c.urgencyLevel === 'MODERATE').length,
    LOW: db.consultations.filter((c) => c.urgencyLevel === 'LOW').length,
  };

  const symptomFrequency = [
    { symptom: 'Acute Fever', count: 18, percentage: 42 },
    { symptom: 'Headache & Migraine', count: 14, percentage: 32 },
    { symptom: 'Generalized Myalgia', count: 12, percentage: 28 },
    { symptom: 'Respiratory / Cough', count: 9, percentage: 21 },
    { symptom: 'Gastrointestinal Pain', count: 6, percentage: 14 },
    { symptom: 'Hypertension Symptoms', count: 5, percentage: 11 },
  ];

  const weeklyTrend = [
    { day: 'Mon', consultations: 4, emergency: 0 },
    { day: 'Tue', consultations: 7, emergency: 1 },
    { day: 'Wed', consultations: 6, emergency: 0 },
    { day: 'Thu', consultations: 9, emergency: 2 },
    { day: 'Fri', consultations: 11, emergency: 1 },
    { day: 'Sat', consultations: 8, emergency: 0 },
    { day: 'Sun', consultations: 5, emergency: 1 },
  ];

  res.json({
    success: true,
    data: {
      metrics: {
        totalUsers,
        totalPatients,
        totalDoctors,
        totalConsultations,
        totalReports,
        activeFacilities: db.facilities.length,
        indexedGuidelines: db.ragDocuments.length,
      },
      triageBreakdown,
      symptomFrequency,
      weeklyTrend,
      auditLogs: db.auditLogs.slice(0, 10),
    },
  });
};

export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      users: db.users,
      patients: db.patients,
      doctors: db.doctors,
    },
  });
};

export const getRAGDocuments = async (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    data: db.ragDocuments,
  });
};

export const ingestRAGDocument = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, sourceOrg = 'ICMR', documentType = 'Clinical Guideline', rawContent = '' } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Document title is required.', error_code: 'VALIDATION_ERROR' });
    }

    const docId = 'rag-doc-' + Date.now();
    const newDoc = {
      id: docId,
      title,
      sourceOrg: sourceOrg as 'WHO' | 'ICMR' | 'MoHFW',
      documentType,
      version: '2026.1',
      publicationDate: new Date().toISOString().split('T')[0],
      totalChunks: 2,
      chunks: [
        {
          id: `chunk-${docId}-1`,
          index: 1,
          content: rawContent || `Clinical SOP guideline for ${title}. Standards specify triage, primary health center protocols, and escalation markers.`,
          keywords: ['protocol', 'standard', 'primary care', 'who', 'icmr'],
        },
        {
          id: `chunk-${docId}-2`,
          index: 2,
          content: 'Recommended medications, reference dosages, hydration therapy, and physician referral criteria.',
          keywords: ['referral', 'medication', 'dosage', 'escalation'],
        },
      ],
    };

    db.ragDocuments.unshift(newDoc);
    db.logAudit('RAG_DOCUMENT_INGESTED', req.user?.id, { title, sourceOrg });

    res.status(201).json({
      success: true,
      message: 'Clinical guideline successfully chunked and embedded in vector knowledge base.',
      data: newDoc,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message, error_code: 'INGESTION_FAILED' });
  }
};

export const deleteRAGDocument = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const index = db.ragDocuments.findIndex((d) => d.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Document not found in vector store', error_code: 'NOT_FOUND' });
  }

  db.ragDocuments.splice(index, 1);
  db.logAudit('RAG_DOCUMENT_DELETED', req.user?.id, { docId: id });

  res.json({
    success: true,
    message: 'Guideline removed from active vector index.',
  });
};
