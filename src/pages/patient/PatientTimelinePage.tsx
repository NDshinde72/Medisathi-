/**
 * RuralCare AI — Longitudinal Patient Timeline
 * Section 18 implementation: Historical chronicle of registrations, symptoms, AI assessments, and doctor notes.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../services/api';
import { Consultation, MedicalReport, TriageUrgency } from '../../types';
import { TriageBadge } from '../../components/common/TriageBadge';
import {
  Clock,
  Calendar,
  Activity,
  FileText,
  Stethoscope,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  UserCheck,
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  date: string;
  details: string;
  urgency?: TriageUrgency;
  assessment?: any;
  doctorNotes?: any;
  channel?: string;
  isAbnormal?: boolean;
}

export const PatientTimelinePage: React.FC = () => {
  const { patientProfile } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [cRes, rRes] = await Promise.all([
          apiClient.getConsultations(),
          apiClient.getReports(),
        ]);
        if (cRes.success) setConsultations(cRes.data);
        if (rRes.success) setReports(rRes.data);
      } catch (err) {
        console.error('Failed to load timeline', err);
      }
    }
    loadData();
  }, []);

  // Merge and sort events in reverse chronological order
  const timeline: TimelineEvent[] = [
    {
      id: 'reg-0',
      type: 'REGISTRATION',
      title: 'Patient Profile Created & Rural Health Baseline Established',
      subtitle: `${patientProfile?.fullName || 'Rameshwar Sharma'} registered in District Ahmednagar.`,
      date: '2026-03-15T08:30:00Z',
      details: 'Demographics recorded: Age 48, B+ Blood Group, emergency kin contact verified.',
    },
    ...consultations.map((c) => ({
      id: c.id,
      type: 'CONSULTATION',
      title: `Symptom Assessment Encounter (${c.urgencyLevel} Urgency)`,
      subtitle: c.chiefComplaint,
      date: c.createdAt,
      urgency: c.urgencyLevel,
      assessment: c.assessment,
      doctorNotes: c.doctorNotes,
      channel: c.inputChannel,
      details: c.assessment?.primaryExplanation || '',
    })),
    ...reports.map((r) => ({
      id: r.id,
      type: 'REPORT',
      title: `Lab Diagnostic Report Digitized: ${r.fileName}`,
      subtitle: r.interpretation,
      date: r.uploadedAt,
      isAbnormal: r.isAbnormal,
      details: Object.entries(r.extractedParameters)
        .map(([k, v]) => `${k}: ${v.value} ${v.unit} (${v.status})`)
        .join(' | '),
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
          Longitudinal Health Record
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Patient Health Timeline
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Auditable chronicle of symptom assessments, diagnostic lab reports, and physician sign-offs.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
        {timeline.map((item) => {
          const isExpanded = expandedEvent === item.id;
          return (
            <div key={item.id} className="relative group">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-xs ${
                  item.type === 'REGISTRATION'
                    ? 'bg-slate-400'
                    : item.type === 'CONSULTATION'
                    ? 'bg-emerald-600'
                    : 'bg-purple-600'
                }`}
              />

              {/* Event Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.type === 'REGISTRATION'
                          ? 'bg-slate-100 text-slate-700'
                          : item.type === 'CONSULTATION'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {item.type}
                    </span>
                    {item.urgency && <TriageBadge level={item.urgency as any} size="sm" />}
                  </div>

                  <span className="text-[11px] text-slate-400">
                    {new Date(item.date).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-600">{item.subtitle}</p>

                {/* Doctor Sign-off preview if present */}
                {item.doctorNotes && (
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-medium">
                    <strong>Medical Officer Review ({item.doctorNotes.doctorName}):</strong>{' '}
                    {item.doctorNotes.clinicalObservations}
                  </div>
                )}

                {/* Collapsible Details */}
                <div className="pt-2">
                  <button
                    onClick={() => setExpandedEvent(isExpanded ? null : item.id)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Clinical Details'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 animate-in fade-in duration-150">
                      <div>
                        <strong>Clinical Extract:</strong>
                        <p className="text-slate-600 mt-0.5">{item.details}</p>
                      </div>

                      {item.assessment && (
                        <div className="pt-1">
                          <strong>Grounded WHO / ICMR Citations:</strong>
                          <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-600">
                            {item.assessment.sources?.map((s: any, idx: number) => (
                              <li key={idx}>
                                {s.documentTitle} ({s.sourceOrg})
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
