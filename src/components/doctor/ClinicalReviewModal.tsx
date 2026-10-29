/**
 * RuralCare AI — Doctor Clinical Review & Sign-Off Modal
 * Section 19 implementation: Clinical observation editor, AI triage overrides, and prescription orders.
 */

import React, { useState } from 'react';
import { Consultation, TriageUrgency } from '../../types';
import { apiClient } from '../../services/api';
import { TriageBadge } from '../common/TriageBadge';
import {
  X,
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  Pill,
  Building2,
  BookOpen,
  User,
  Activity,
  Send,
  Plus,
  Trash2,
} from 'lucide-react';

interface ClinicalReviewModalProps {
  consultation: Consultation;
  onClose: () => void;
  onSaved: () => void;
}

export const ClinicalReviewModal: React.FC<ClinicalReviewModalProps> = ({
  consultation,
  onClose,
  onSaved,
}) => {
  const [agreesWithAI, setAgreesWithAI] = useState(true);
  const [triageOverride, setTriageOverride] = useState<TriageUrgency>(consultation.urgencyLevel);
  const [clinicalObservations, setClinicalObservations] = useState(
    consultation.doctorNotes?.clinicalObservations ||
      'Patient examined. Alert, oriented. Stable vitals. Lungs clear bilaterally.'
  );
  const [recommendations, setRecommendations] = useState(
    consultation.doctorNotes?.recommendations ||
      'Advised oral hydration and rest. Review in 48 hours if fever spikes above 101 F.'
  );
  const [prescriptions, setPrescriptions] = useState<
    Array<{ medicineName: string; dosage: string; frequency: string; days: number }>
  >(
    consultation.doctorNotes?.prescriptions || [
      { medicineName: 'Tab. Paracetamol', dosage: '650 mg', frequency: 'TDS (Three times daily)', days: 3 },
      { medicineName: 'Oral Rehydration Salts (ORS)', dosage: '1 sachet / 1L water', frequency: 'Daily sips', days: 3 },
    ]
  );
  const [referralFacility, setReferralFacility] = useState('Rampur Primary Health Centre (PHC)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { medicineName: '', dosage: '500 mg', frequency: 'BD (Twice daily)', days: 3 },
    ]);
  };

  const removePrescription = (idx: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await apiClient.submitDoctorNotes({
        consultationId: consultation.id,
        clinicalObservations,
        agreesWithAITriage: agreesWithAI,
        doctorTriageOverride: agreesWithAI ? undefined : triageOverride,
        recommendations,
        prescriptions,
        referralFacilityName: referralFacility,
      });

      if (res.success) {
        onSaved();
        onClose();
      }
    } catch (err) {
      console.error('Failed to submit doctor notes', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">Doctor Decision Support Review</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/30 text-blue-200">
                  Encounter: #{consultation.id.slice(-6)}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Patient: {consultation.patientName} ({consultation.age} yrs, {consultation.gender}) • District {consultation.district}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-300"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Patient Complaint & AI Assessment Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Patient Symptoms */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                Reported Complaint & Symptoms
              </span>
              <p className="font-semibold text-slate-900 text-sm">{consultation.chiefComplaint}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {consultation.symptoms.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px]"
                  >
                    {s.name} ({s.severity})
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Channel: <strong>{consultation.inputChannel}</strong> • Submitted:{' '}
                {new Date(consultation.createdAt).toLocaleTimeString()}
              </div>
            </div>

            {/* Right: AI Triage & RAG Citations */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">
                  AI Grounded Triage
                </span>
                <TriageBadge level={consultation.urgencyLevel} size="sm" />
              </div>
              <p className="text-slate-700 text-xs">
                {consultation.assessment?.primaryExplanation || 'Standard clinical guidance processed.'}
              </p>
              <div className="pt-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Citations Used:
                </span>
                {consultation.assessment?.sources.map((src, idx) => (
                  <div key={idx} className="text-[11px] text-emerald-800 font-medium">
                    • {src.documentTitle} ({src.sourceOrg})
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DOCTOR CLINICAL DECISION FORM */}
          <form onSubmit={handleSubmit} className="space-y-4 border-t border-slate-200 pt-4">
            <h4 className="font-bold text-slate-900 text-sm">
              Medical Officer Clinical Evaluation & Overrides
            </h4>

            {/* AI Urgency Validation & Override */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">
                  Do you agree with the AI Triage Grade ({consultation.urgencyLevel})?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAgreesWithAI(true)}
                    className={`px-3 py-1 rounded-lg font-bold text-xs ${
                      agreesWithAI
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-600'
                    }`}
                  >
                    Agree with AI
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgreesWithAI(false)}
                    className={`px-3 py-1 rounded-lg font-bold text-xs ${
                      !agreesWithAI
                        ? 'bg-orange-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-600'
                    }`}
                  >
                    Override Grade
                  </button>
                </div>
              </div>

              {!agreesWithAI && (
                <div className="pt-2 flex items-center gap-3">
                  <span className="font-semibold text-slate-700">Physician Override Level:</span>
                  {(['LOW', 'MODERATE', 'HIGH', 'EMERGENCY'] as TriageUrgency[]).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setTriageOverride(lvl)}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        triageOverride === lvl
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Doctor Clinical Observations */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Doctor Clinical Observations & Physical Findings
              </label>
              <textarea
                rows={2}
                required
                value={clinicalObservations}
                onChange={(e) => setClinicalObservations(e.target.value)}
                placeholder="e.g. Temp 100.8 F, Pulse 84, chest clear, no dehydration signs, alert..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Prescriptions Builder */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">
                  Prescription Recommendations ({prescriptions.length})
                </label>
                <button
                  type="button"
                  onClick={addPrescription}
                  className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Medicine</span>
                </button>
              </div>

              <div className="space-y-2">
                {prescriptions.map((rx, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <input
                      type="text"
                      placeholder="Medicine name"
                      value={rx.medicineName}
                      onChange={(e) => {
                        const copy = [...prescriptions];
                        copy[idx].medicineName = e.target.value;
                        setPrescriptions(copy);
                      }}
                      className="flex-2 px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g. 500mg)"
                      value={rx.dosage}
                      onChange={(e) => {
                        const copy = [...prescriptions];
                        copy[idx].dosage = e.target.value;
                        setPrescriptions(copy);
                      }}
                      className="flex-1 px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Frequency (TDS / BD)"
                      value={rx.frequency}
                      onChange={(e) => {
                        const copy = [...prescriptions];
                        copy[idx].frequency = e.target.value;
                        setPrescriptions(copy);
                      }}
                      className="flex-1 px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => removePrescription(idx)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Facility */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Referral / Nearest Health Facility
                </label>
                <select
                  value={referralFacility}
                  onChange={(e) => setReferralFacility(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option>Rampur Primary Health Centre (PHC)</option>
                  <option>Parner Community Health Centre (CHC)</option>
                  <option>Ahmednagar District Civil Hospital</option>
                  <option>Khedgaon Health Sub-Centre</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Physician Next Steps & Precautions
                </label>
                <input
                  type="text"
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  placeholder="e.g. Repeat CBC in 48 hours, monitor hydration"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Sign-Off Consultation & Save Notes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
