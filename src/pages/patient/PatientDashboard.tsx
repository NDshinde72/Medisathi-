/**
 * RuralCare AI — Patient Dashboard
 * Section 8 implementation: Welcome header, "Start Health Assessment" main CTA,
 * Voice assessment button, report upload, recent consultations, medication list, and emergency banner.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../services/api';
import { Consultation, MedicalReport, HealthcareFacility } from '../../types';
import { TriageBadge } from '../../components/common/TriageBadge';
import {
  Activity,
  Mic,
  FileText,
  Clock,
  Pill,
  MapPin,
  ShieldAlert,
  ArrowRight,
  Plus,
  PhoneCall,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  User,
  HeartPulse,
} from 'lucide-react';

interface PatientDashboardProps {
  onNavigate: (page: string) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ onNavigate }) => {
  const { patientProfile, openEmergencyModal } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cRes, rRes, fRes] = await Promise.all([
          apiClient.getConsultations(),
          apiClient.getReports(),
          apiClient.getFacilities({ emergencyOnly: false }),
        ]);
        if (cRes.success) setConsultations(cRes.data);
        if (rRes.success) setReports(rRes.data);
        if (fRes.success) setFacilities(fRes.data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load patient dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const profile = patientProfile || {
    fullName: 'Rameshwar Sharma',
    age: 48,
    gender: 'Male',
    villageTown: 'Khedgaon',
    district: 'Ahmednagar',
    bloodGroup: 'B+',
    emergencyContactName: 'Sunita Sharma',
    emergencyContactPhone: '+91 98765 43211',
  };

  const activeMedications = [
    { name: 'Tab. Paracetamol', dosage: '650mg', frequency: 'TDS (As needed)', prescribedBy: 'Dr. Anita Deshmukh' },
    { name: 'Oral Rehydration Salts (ORS)', dosage: '1 sachet / 1L water', frequency: 'Daily sips', prescribedBy: 'Rampur PHC' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Welcome & Patient Health Profile Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile.villageTown}, District {profile.district}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Namaste, {profile.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Age {profile.age} • Gender: {profile.gender} • Blood Group: <span className="font-bold text-white">{profile.bloodGroup}</span>
            </p>
          </div>

          {/* Emergency Quick Action */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openEmergencyModal}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm animate-pulse"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Emergency 108</span>
            </button>
            <button
              onClick={() => onNavigate('patient-timeline')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Medical Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Primary Action Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main CTA: Start Health Assessment */}
        <button
          onClick={() => onNavigate('patient-assessment')}
          className="p-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-left transition-all shadow-md hover:shadow-lg group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
              Primary CTA
            </span>
          </div>
          <div className="mt-6 space-y-1">
            <h3 className="font-extrabold text-lg flex items-center gap-2">
              <span>Start Health Assessment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Describe your symptoms in text or voice. Receive instant red-flag screening and WHO/ICMR clinical guidance.
            </p>
          </div>
        </button>

        {/* Voice Assessment */}
        <button
          onClick={() => onNavigate('patient-voice')}
          className="p-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all shadow-xs hover:border-emerald-400 group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Mic className="w-6 h-6" />
          </div>
          <div className="mt-6 space-y-1">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
              <span>Voice Assessment</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Speak in Hindi, English, or regional dialect. Speech recognition parses symptoms automatically.
            </p>
          </div>
        </button>

        {/* Upload Medical Report */}
        <button
          onClick={() => onNavigate('patient-reports')}
          className="p-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-left transition-all shadow-xs hover:border-purple-400 group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div className="mt-6 space-y-1">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
              <span>Upload Medical Report</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Photograph or upload blood tests or CBC reports for instant OCR parameter extraction.
            </p>
          </div>
        </button>
      </div>

      {/* 3. Dashboard Central Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Recent Consultations & AI Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Consultations */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Recent Consultations</h3>
              </div>
              <button
                onClick={() => onNavigate('patient-timeline')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>View Full Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {consultations.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No consultations recorded yet. Click "Start Health Assessment" to begin.
              </div>
            ) : (
              <div className="space-y-3">
                {consultations.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <TriageBadge level={item.urgencyLevel} size="sm" />
                        <span className="text-[11px] text-slate-400">
                          {new Date(item.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        Channel: {item.inputChannel}
                      </span>
                    </div>

                    <p className="font-medium text-slate-800 text-xs">{item.chiefComplaint}</p>

                    {item.assessment && (
                      <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80">
                        <strong className="text-slate-800">AI Clinical Summary:</strong>{' '}
                        {item.assessment.primaryExplanation}
                      </div>
                    )}

                    {item.doctorNotes && (
                      <div className="flex items-center gap-2 text-[11px] text-blue-800 bg-blue-50 p-2 rounded-lg border border-blue-200 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>
                          <strong>Reviewed by {item.doctorNotes.doctorName}:</strong>{' '}
                          {item.doctorNotes.clinicalObservations}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Current Medications */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-base text-slate-900">Current Medications & Dosages</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {activeMedications.map((med, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900 text-xs">{med.name}</div>
                  <div className="text-slate-600 text-[11px]">Dosage: {med.dosage}</div>
                  <div className="text-emerald-700 font-medium text-[11px]">Frequency: {med.frequency}</div>
                  <div className="text-[10px] text-slate-400">Prescribed: {med.prescribedBy}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Nearby PHCs & Emergency Info */}
        <div className="space-y-6">
          {/* Nearby Facilities */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Nearby Healthcare</h3>
              </div>
              <button
                onClick={() => onNavigate('patient-facilities')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Find All
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {facilities.map((fac) => (
                <div key={fac.id} className="p-3 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{fac.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {fac.distanceKm} km
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{fac.address}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`text-[10px] font-semibold ${
                        fac.emergencyAvailable ? 'text-emerald-600' : 'text-slate-500'
                      }`}
                    >
                      {fac.emergencyAvailable ? '24/7 Emergency Beds' : 'Outpatient PHC'}
                    </span>
                    <a
                      href={`tel:${fac.contactPhone}`}
                      className="text-emerald-700 font-bold flex items-center gap-1 hover:underline text-[11px]"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Assistance Banner */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 space-y-3 text-xs text-red-950">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>Emergency Assistance</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-xs">
              If you or a family member experience sudden chest crushing pain, breathing arrest, or unconsciousness:
            </p>
            <button
              onClick={openEmergencyModal}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Dial 108 Ambulance</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
