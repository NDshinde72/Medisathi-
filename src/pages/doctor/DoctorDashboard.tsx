/**
 * RuralCare AI — Doctor Decision Support Dashboard
 * Section 19 implementation: Priority triage queue, clinical sign-offs, and risk statistics.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../services/api';
import { Consultation, TriageUrgency } from '../../types';
import { TriageBadge } from '../../components/common/TriageBadge';
import { ClinicalReviewModal } from '../../components/doctor/ClinicalReviewModal';
import {
  Stethoscope,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Eye,
  Hospital,
  ShieldAlert,
  ChevronRight,
  Activity,
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const { doctorProfile } = useAuth();
  const [queue, setQueue] = useState<Consultation[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUrgency, setFilterUrgency] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  const profile = doctorProfile || {
    fullName: 'Dr. Anita Deshmukh, MD',
    registrationNumber: 'MCI-2014-88421',
    qualification: 'MBBS, MD',
    hospitalAffiliation: 'Rampur Primary Health Centre (PHC)',
    district: 'Ahmednagar',
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  async function fetchQueue() {
    setLoading(true);
    try {
      const res = await apiClient.getDoctorQueue();
      if (res.success) {
        setQueue(res.data.queue);
      }
    } catch (err) {
      console.error('Failed to load doctor queue', err);
    } finally {
      setLoading(false);
    }
  }

  // Filter queue by search & urgency
  const filteredQueue = queue.filter((c) => {
    const matchesSearch =
      c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUrgency = filterUrgency === 'ALL' || c.urgencyLevel === filterUrgency;
    return matchesSearch && matchesUrgency;
  });

  const emergencyCount = queue.filter((c) => c.urgencyLevel === 'EMERGENCY').length;
  const highRiskCount = queue.filter((c) => c.urgencyLevel === 'HIGH').length;
  const pendingCount = queue.filter((c) => c.status !== 'COMPLETED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Doctor Header */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">{profile.fullName}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                Verified Medical Officer
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Registration No: {profile.registrationNumber} • {profile.hospitalAffiliation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
            District: <strong className="text-white">{profile.district}</strong>
          </div>
          <button
            onClick={fetchQueue}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          >
            Refresh Queue
          </button>
        </div>
      </div>

      {/* 2. Key Triage Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Encounters</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{queue.length}</div>
          <div className="text-[11px] text-slate-500">Across Primary Catchment</div>
        </div>

        <div className="p-5 rounded-2xl bg-red-50 border border-red-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-red-700 text-xs font-semibold">
            <span>Red-Flag Emergency</span>
            <ShieldAlert className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-900">{emergencyCount}</div>
          <div className="text-[11px] text-red-700">108 Protocol Triggered</div>
        </div>

        <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-orange-700 text-xs font-semibold">
            <span>High Urgency</span>
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-orange-900">{highRiskCount}</div>
          <div className="text-[11px] text-orange-700">Priority Clinical Review</div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>Pending Reviews</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-900">{pendingCount}</div>
          <div className="text-[11px] text-emerald-700">Awaiting Sign-Off</div>
        </div>
      </div>

      {/* 3. Priority Triage Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-slate-900">Priority Patient Triage Queue</h3>
            <p className="text-xs text-slate-500">
              Sorted by clinical urgency. Click "Review & Override" to add notes, write prescriptions, and finalize triage.
            </p>
          </div>

          {/* Search & Urgency Filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient..."
                className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
            >
              <option value="ALL">All Triage Levels</option>
              <option value="EMERGENCY">Emergency Only</option>
              <option value="HIGH">High Urgency</option>
              <option value="MODERATE">Moderate</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Triage Priority</th>
                <th className="py-3 px-4">Patient Name & Demographics</th>
                <th className="py-3 px-4">Chief Complaint & Symptoms</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Clinical Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQueue.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    No consultations matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <TriageBadge level={item.urgencyLevel} size="sm" />
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.patientName}</div>
                      <div className="text-[11px] text-slate-500">
                        {item.age} yrs • {item.gender} • {item.district}
                      </div>
                    </td>

                    <td className="py-3 px-4 max-w-xs truncate">
                      <div className="truncate font-medium text-slate-800">{item.chiefComplaint}</div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {item.symptoms.map((s) => s.name).join(', ')}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {item.inputChannel}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === 'COMPLETED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status === 'COMPLETED' ? 'Reviewed' : 'Pending Review'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedConsultation(item)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review & Override</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Active Review Modal */}
      {selectedConsultation && (
        <ClinicalReviewModal
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
          onSaved={() => {
            fetchQueue();
            setSelectedConsultation(null);
          }}
        />
      )}
    </div>
  );
};
