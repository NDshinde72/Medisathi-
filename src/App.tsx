/**
 * RuralCare AI — Master Application Entry Point
 * Complete integration of Patient, Doctor, and Admin workspaces with
 * Multimodal Symptom Assessment, Lab OCR, Facility Discovery, and RAG Governance.
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EmergencyModal } from './components/common/EmergencyModal';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Patient Pages
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { SymptomAssessmentPage } from './pages/patient/SymptomAssessmentPage';
import { MedicalReportsPage } from './pages/patient/MedicalReportsPage';
import { FacilityDiscoveryPage } from './pages/patient/FacilityDiscoveryPage';
import { PatientTimelinePage } from './pages/patient/PatientTimelinePage';

// Doctor & Admin Pages
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Blueprint explorer
import {
  Layers,
  Server,
  Database,
  BrainCircuit,
  Layout,
  Activity,
  GitBranch,
  FolderTree,
  CalendarCheck,
  ChevronRight,
} from 'lucide-react';

function BlueprintView({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState<'system' | 'tech' | 'er' | 'rag' | 'frontend' | 'backend' | 'flow' | 'folder' | 'roadmap'>('system');
  const [selectedTable, setSelectedTable] = useState<string>('consultations');

  const navItems = [
    { id: 'system', label: '1. System Architecture', icon: Layers },
    { id: 'tech', label: '2. Technology Stack', icon: Server },
    { id: 'er', label: '3. Database ER Design', icon: Database },
    { id: 'rag', label: '4. AI + RAG Pipeline', icon: BrainCircuit },
    { id: 'frontend', label: '5. Frontend Architecture', icon: Layout },
    { id: 'backend', label: '6. Backend Specification', icon: Activity },
    { id: 'flow', label: '7. Triage & Data Flow', icon: GitBranch },
    { id: 'folder', label: '8. Folder Structure', icon: FolderTree },
    { id: 'roadmap', label: '9. Development Roadmap', icon: CalendarCheck },
  ] as const;

  const dbTables: Record<string, { desc: string; columns: { name: string; type: string; key?: string; note: string }[] }> = {
    users: {
      desc: 'Central authentication identity and role management (Patient, Doctor, Admin)',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK', note: 'Unique identifier' },
        { name: 'email', type: 'VARCHAR(255)', key: 'UNIQUE', note: 'Account login email' },
        { name: 'password_hash', type: 'VARCHAR(255)', note: 'Bcrypt hashed password' },
        { name: 'role', type: 'ENUM', note: 'PATIENT | DOCTOR | ADMIN' },
        { name: 'phone_number', type: 'VARCHAR(20)', note: 'Mobile verification number' },
        { name: 'created_at', type: 'TIMESTAMP', note: 'Registration timestamp' },
      ],
    },
    patient_profiles: {
      desc: 'Demographic and rural residency baseline records',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK', note: 'Primary key' },
        { name: 'user_id', type: 'UUID', key: 'FK -> users.id', note: 'Linked auth profile' },
        { name: 'full_name', type: 'VARCHAR(150)', note: 'Patient legal name' },
        { name: 'age', type: 'INT', note: 'Age in years' },
        { name: 'gender', type: 'VARCHAR(20)', note: 'Gender identity' },
        { name: 'district', type: 'VARCHAR(100)', note: 'Rural district' },
        { name: 'state', type: 'VARCHAR(100)', note: 'State of residence' },
        { name: 'emergency_contact_phone', type: 'VARCHAR(20)', note: 'Direct kin hotline' },
      ],
    },
    consultations: {
      desc: 'Core patient assessment encounters, chief complaints and urgency grading',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK', note: 'Consultation encounter ID' },
        { name: 'patient_id', type: 'UUID', key: 'FK -> patient_profiles.id', note: 'Patient initiator' },
        { name: 'doctor_id', type: 'UUID', key: 'FK -> doctor_profiles.id', note: 'Assigned physician (nullable)' },
        { name: 'status', type: 'ENUM', note: 'PENDING_TRIAGE | ASSESSED | UNDER_DOCTOR_REVIEW' },
        { name: 'urgency_level', type: 'ENUM', note: 'LOW | MODERATE | HIGH | EMERGENCY' },
        { name: 'chief_complaint', type: 'TEXT', note: 'Raw symptom prompt or voice transcript' },
        { name: 'input_channel', type: 'VARCHAR(30)', note: 'TEXT | VOICE | MULTIMODAL_REPORT' },
      ],
    },
    ai_assessments: {
      desc: 'Grounded clinical decision support, risk analysis & structured recommendations',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK', note: 'Assessment record ID' },
        { name: 'consultation_id', type: 'UUID', key: 'FK -> consultations.id', note: 'Linked encounter' },
        { name: 'triage_level', type: 'ENUM', note: 'LOW | MODERATE | HIGH | EMERGENCY' },
        { name: 'possible_conditions', type: 'JSONB', note: 'Array of {condition, probability, rationale}' },
        { name: 'primary_explanation', type: 'TEXT', note: 'Explainable clinical reasoning text' },
        { name: 'risk_factors_identified', type: 'JSONB', note: 'Extracted comorbidities & alerts' },
        { name: 'recommended_next_steps', type: 'JSONB', note: 'Actionable home/clinic advice' },
      ],
    },
    rag_documents: {
      desc: 'Verified clinical knowledge base documents (WHO, ICMR, MoHFW guidelines)',
      columns: [
        { name: 'id', type: 'UUID', key: 'PK', note: 'Document record' },
        { name: 'title', type: 'VARCHAR(255)', note: 'Official clinical guideline title' },
        { name: 'source_organization', type: 'VARCHAR(150)', note: 'WHO | ICMR | MoHFW' },
        { name: 'document_type', type: 'VARCHAR(100)', note: 'Protocol / Clinical Standard' },
        { name: 'total_chunks', type: 'INT', note: 'Count of embedded segments' },
      ],
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            Engineering Blueprint
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">RuralCare AI System Architecture</h2>
        </div>
        <button
          onClick={() => onNavigate('landing')}
          className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Return to Landing Page
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs sticky top-24 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </aside>

        <main className="lg:col-span-3">
          {activeTab === 'system' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">1. Overall System Architecture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                RuralCare AI is organized as a three-tier distributed architecture ensuring rapid responsiveness even on rural 2G/3G connections.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto">
                <pre>{`[ Patient Web / Voice / OCR ]   [ Doctor Review Queue ]   [ Admin Knowledge Base ]
               │                          │                          │
               └──────────────────────────┼──────────────────────────┘
                                          ▼
                      [ REST API Gateway & JWT Auth / RBAC ]
                                          │
                   ┌──────────────────────┴──────────────────────┐
                   ▼                                             ▼
       [ Red-Flag Safety Filter ]                  [ Multimodal Ingestion Engine ]
       (Emergency 108 Hotline)                     (Text, Whisper STT, OCR)
                                                                 │
                                                                 ▼
                                                  [ Vector Search: WHO/ICMR RAG ]
                                                                 │
                                                                 ▼
                                                  [ Explainable LLM Reasoning ]
                                                                 │
                                                                 ▼
                                                  [ PostgreSQL Clinical Records ]`}</pre>
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">2. Technology Architecture</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-900 mb-1">Frontend Tier</div>
                  <p className="text-slate-600">React 19, TypeScript, Vite, Tailwind CSS, Lucide icons, Recharts</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-900 mb-1">Backend & API Tier</div>
                  <p className="text-slate-600">Express / FastAPI Gateway, Pydantic, Python services, REST endpoints</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-900 mb-1">AI & RAG Pipeline</div>
                  <p className="text-slate-600">Gemini 2.5/Flash, FAISS vector index, sentence-transformers, Tesseract OCR</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-900 mb-1">Database & Storage</div>
                  <p className="text-slate-600">PostgreSQL with pgvector, JSONB clinical schemas, strict foreign keys</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'er' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">3. Database Entity-Relationship Design</h3>
              <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
                {Object.keys(dbTables).map((tbl) => (
                  <button
                    key={tbl}
                    onClick={() => setSelectedTable(tbl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      selectedTable === tbl
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tbl}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Column Name</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Constraint</th>
                      <th className="py-2.5 px-3">Clinical Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dbTables[selectedTable].columns.map((col, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3 font-mono font-semibold text-slate-800">{col.name}</td>
                        <td className="py-2 px-3 font-mono text-purple-700">{col.type}</td>
                        <td className="py-2 px-3 text-amber-700 font-mono font-bold">{col.key || '—'}</td>
                        <td className="py-2 px-3 text-slate-600">{col.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'rag' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900">4. AI + RAG Architecture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Knowledge sources are strictly restricted to WHO, ICMR, and MoHFW guidelines to eliminate hallucinations.
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <strong>Document Ingestion:</strong> Official clinical PDFs parsed into 500-token chunks with 50-token overlap.
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <strong>Vector Embedding:</strong> Embedded with sentence-transformers into a 768-dimensional vector space.
                </div>
                <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <strong>Cosine Retrieval:</strong> Similarity search fetches top-k clinical evidence snippets for LLM synthesis.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'frontend' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-lg font-bold text-slate-900">5. Frontend Architecture</h3>
              <p className="text-xs text-slate-600">
                Modular React architecture cleanly divided into Public, Patient, Doctor, and Admin zones with centralized AuthContext and EmergencyModal safety protocols.
              </p>
            </div>
          )}

          {activeTab === 'backend' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-lg font-bold text-slate-900">6. Backend Architecture</h3>
              <p className="text-xs text-slate-600">
                RESTful API gateway with JWT authorization, deterministic red-flag triage interceptor, and asynchronous queue for heavy multimodal OCR and speech-to-text inference.
              </p>
            </div>
          )}

          {activeTab === 'flow' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-lg font-bold text-slate-900">7. Clinical Triage & Data Flow</h3>
              <p className="text-xs text-slate-600">
                User input is screened for emergency red flags first. Non-critical inputs proceed to symptom entity extraction, RAG similarity search, explainable AI reasoning, and doctor queue review.
              </p>
            </div>
          )}

          {activeTab === 'folder' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-lg font-bold text-slate-900">8. Project Folder Structure</h3>
              <p className="text-xs text-slate-600">
                Clean separation into <code>/backend</code> (FastAPI services, models, schemas), <code>/src</code> (React components, pages, hooks, contexts), <code>/docs</code> (architecture, SQL schema), and <code>/knowledge_base</code>.
              </p>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-lg font-bold text-slate-900">9. Phased Development Roadmap</h3>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Phase 1: Architecture Blueprint & Database ER Design</span>
                  <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded">COMPLETED</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Phase 2: Frontend Foundation & Design System</span>
                  <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded">COMPLETED</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Phase 3: Backend Foundation & API Gateway</span>
                  <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded">COMPLETED</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Phase 4-13: Patient, Doctor, Admin, RAG & Triage Modules</span>
                  <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded">ACTIVE</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function MainApp() {
  const [currentPage, setCurrentPage] = useState<string>('landing');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1">
        {/* Public Pages */}
        {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage onNavigate={setCurrentPage} />}
        {currentPage === 'how-it-works' && <HowItWorksPage onNavigate={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'login' && <LoginPage onNavigate={setCurrentPage} />}
        {currentPage === 'register' && <RegisterPage onNavigate={setCurrentPage} />}
        {currentPage === 'blueprint' && <BlueprintView onNavigate={setCurrentPage} />}

        {/* Patient Pages */}
        {currentPage === 'patient-dashboard' && <PatientDashboard onNavigate={setCurrentPage} />}
        {currentPage === 'patient-assessment' && <SymptomAssessmentPage onNavigate={setCurrentPage} />}
        {currentPage === 'patient-voice' && (
          <SymptomAssessmentPage onNavigate={setCurrentPage} initialMode="VOICE" />
        )}
        {currentPage === 'patient-reports' && <MedicalReportsPage />}
        {currentPage === 'patient-facilities' && <FacilityDiscoveryPage />}
        {currentPage === 'patient-timeline' && <PatientTimelinePage />}

        {/* Doctor Pages */}
        {currentPage === 'doctor-dashboard' && <DoctorDashboard />}

        {/* Admin Pages */}
        {currentPage === 'admin-dashboard' && <AdminDashboard />}
      </main>

      <EmergencyModal onNavigateToFacilities={() => setCurrentPage('patient-facilities')} />

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
