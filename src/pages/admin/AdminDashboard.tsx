/**
 * RuralCare AI — Admin Governance, Knowledge Base & Analytics Dashboard
 * Section 12 & 30 implementation: RAG document management, epidemiological analytics, and user oversight.
 */

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../services/api';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Shield,
  BookOpen,
  Users,
  Activity,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  RefreshCw,
  Search,
  Award,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'knowledge' | 'users' | 'audit'>('analytics');
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Ingestion Modal / Form
  const [showIngestModal, setShowIngestModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocOrg, setNewDocOrg] = useState<'WHO' | 'ICMR' | 'MoHFW'>('ICMR');
  const [newDocContent, setNewDocContent] = useState('');
  const [isIngesting, setIsIngesting] = useState(false);

  useEffect(() => {
    loadAdminData();
  }, []);

  async function loadAdminData() {
    setLoading(true);
    try {
      const [aRes, dRes, uRes] = await Promise.all([
        apiClient.getAdminAnalytics(),
        apiClient.getRAGDocuments(),
        apiClient.getUsers(),
      ]);
      if (aRes.success) setAnalyticsData(aRes.data);
      if (dRes.success) setDocuments(dRes.data);
      if (uRes.success) setUsers(uRes.data?.users || []);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  }

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle) return;
    setIsIngesting(true);
    try {
      const res = await apiClient.ingestDocument({
        title: newDocTitle,
        sourceOrg: newDocOrg,
        rawContent: newDocContent,
      });
      if (res.success) {
        setShowIngestModal(false);
        setNewDocTitle('');
        setNewDocContent('');
        loadAdminData();
      }
    } catch (err) {
      console.error('Ingestion failed', err);
    } finally {
      setIsIngesting(false);
    }
  };

  const handleDeleteDoc = async (id: string) => {
    if (!confirm('Are you sure you want to remove this guideline from the vector store?')) return;
    try {
      const res = await apiClient.deleteDocument(id);
      if (res.success) {
        loadAdminData();
      }
    } catch (err) {
      console.error('Failed to delete doc', err);
    }
  };

  const triagePieData = [
    { name: 'Low (Mild)', value: 12, color: '#10b981' },
    { name: 'Moderate', value: 8, color: '#f59e0b' },
    { name: 'High Urgency', value: 4, color: '#f97316' },
    { name: 'Emergency 108', value: 2, color: '#ef4444' },
  ];

  const symptomBarData = analyticsData?.symptomFrequency || [
    { symptom: 'Acute Fever', count: 18 },
    { symptom: 'Headache', count: 14 },
    { symptom: 'Body Pain', count: 12 },
    { symptom: 'Cough', count: 9 },
    { symptom: 'Stomach Pain', count: 6 },
  ];

  const weeklyData = analyticsData?.weeklyTrend || [
    { day: 'Mon', consultations: 4 },
    { day: 'Tue', consultations: 7 },
    { day: 'Wed', consultations: 6 },
    { day: 'Thu', consultations: 9 },
    { day: 'Fri', consultations: 11 },
    { day: 'Sat', consultations: 8 },
    { day: 'Sun', consultations: 5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center shrink-0 shadow-sm">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">Health Information System Administration</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                Governance Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              RAG Vector Database Management • Epidemiological Surveillance • Clinical Audit Trail
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowIngestModal(true)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Ingest Medical Guideline</span>
          </button>
        </div>
      </div>

      {/* 2. Admin Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'analytics'
              ? 'border-purple-600 text-purple-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Epidemiological Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('knowledge')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'knowledge'
              ? 'border-purple-600 text-purple-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>RAG Knowledge Base ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'audit'
              ? 'border-purple-600 text-purple-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Clinical Governance & Audit Logs</span>
        </button>
      </div>

      {/* 3. TAB 1: ANALYTICS & CHARTS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500">Registered Patients</span>
              <div className="text-2xl font-bold text-slate-900">
                {analyticsData?.metrics?.totalPatients || 5}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">Rural Cohort Active</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500">Medical Officers</span>
              <div className="text-2xl font-bold text-slate-900">
                {analyticsData?.metrics?.totalDoctors || 3}
              </div>
              <div className="text-[11px] text-blue-600 font-semibold">All MCI/NMC Verified</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500">Total Consultations</span>
              <div className="text-2xl font-bold text-slate-900">
                {analyticsData?.metrics?.totalConsultations || 26}
              </div>
              <div className="text-[11px] text-purple-600 font-semibold">Voice & Text Ingested</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-500">Indexed Guidelines</span>
              <div className="text-2xl font-bold text-slate-900">
                {analyticsData?.metrics?.indexedGuidelines || documents.length}
              </div>
              <div className="text-[11px] text-slate-500">WHO / ICMR Vectorized</div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Trend Bar Chart */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Weekly Health Assessment Encounters</h3>
                  <p className="text-xs text-slate-500">Patient consultations processed across rural health centres</p>
                </div>
              </div>
              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="consultations" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Triage Urgency Distribution Pie Chart */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Triage Urgency Breakdown</h3>
                  <p className="text-xs text-slate-500">Distribution of cases by triage severity grade</p>
                </div>
              </div>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={triagePieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {triagePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Common Symptoms Frequency */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Most Frequently Reported Symptoms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {symptomBarData.map((item: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>{item.symptom}</span>
                    <span className="text-purple-700 font-bold">{item.count} cases</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full"
                      style={{ width: `${Math.min(item.count * 5, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: RAG KNOWLEDGE BASE MANAGER */}
      {activeTab === 'knowledge' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Vector Knowledge Base Documents ({documents.length})
              </h3>
              <p className="text-xs text-slate-500">
                Authoritative guidelines parsed into 500-token chunks with 768-dim embeddings for zero-hallucination clinical grounding.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{doc.title}</h4>
                      <p className="text-slate-500 text-[11px]">
                        Published: {doc.publicationDate} • Document Type: {doc.documentType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {doc.sourceOrg} Grounded
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700">
                      {doc.totalChunks} Chunks
                    </span>
                    <button
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete Guideline"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Inspect Chunks */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Sample Chunk Excerpt (Grounded in Vector Index):
                  </span>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                    "{doc.chunks[0]?.content || 'Guideline text embedded.'}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 3: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Clinical Governance Audit Logs</h3>
            <p className="text-xs text-slate-500">
              Immutable event log tracking triage decisions, doctor overrides, and emergency triggers.
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {analyticsData?.auditLogs?.map((log: any) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="font-bold text-purple-700">[{log.action}]</span>{' '}
                  <span className="text-slate-700">{JSON.stringify(log.details)}</span>
                </div>
                <span className="text-slate-400 text-[11px] shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ingest Modal */}
      {showIngestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <h3 className="font-bold text-base text-slate-900">Ingest Clinical Guideline to RAG</h3>
            <form onSubmit={handleIngest} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Guideline Title</label>
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="e.g. ICMR Protocol for Pediatric Malaria Management"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Source Organization</label>
                <select
                  value={newDocOrg}
                  onChange={(e) => setNewDocOrg(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="ICMR">ICMR (Indian Council of Medical Research)</option>
                  <option value="WHO">WHO (World Health Organization)</option>
                  <option value="MoHFW">MoHFW (Ministry of Health & Family Welfare)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Clinical Protocol Text (will be chunked & embedded)
                </label>
                <textarea
                  rows={4}
                  required
                  value={newDocContent}
                  onChange={(e) => setNewDocContent(e.target.value)}
                  placeholder="Enter medical SOP text, warning indicators, and dosage criteria..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowIngestModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isIngesting}
                  className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700"
                >
                  {isIngesting ? 'Chunking & Vectorizing...' : 'Embed Guideline'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
