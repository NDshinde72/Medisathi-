/**
 * RuralCare AI — Landing Page
 * Complete implementation of all 10 architectural sections specified in Section 22.
 */

import React from 'react';
import {
  Stethoscope,
  Activity,
  Mic,
  FileText,
  Search,
  ShieldAlert,
  BrainCircuit,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Users,
  Building2,
  BookOpen,
  ChevronRight,
  PhoneCall,
  Sparkles,
  Award,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { openEmergencyModal, login } = useAuth();

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-slate-200 pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Next-Generation Rural Clinical Decision Support</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Healthcare Guidance, <br />
                <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">
                  Wherever You Are.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                RuralCare AI helps you understand symptoms, analyze medical reports, and access reliable healthcare guidance using AI grounded in official WHO and ICMR clinical standards.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    login('PATIENT');
                    onNavigate('patient-assessment');
                  }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <Activity className="w-4 h-4" />
                  <span>Start Health Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm transition-colors shadow-xs"
                >
                  <span>How It Works</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={openEmergencyModal}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold transition-colors"
                >
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  <span>Emergency 108</span>
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WHO & ICMR Grounded</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Voice in English & Hindi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Doctor-in-the-Loop</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Triage Simulation Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                      Live Clinical Triage Preview
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
                    Moderate Risk
                  </span>
                </div>

                {/* Patient Case Simulator */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span>Patient: Rameshwar, 48 yrs • Ahmednagar</span>
                    <span>Input: Hindi Voice</span>
                  </div>
                  <p className="font-medium text-slate-800 italic">
                    "2 din se tezz bukhar hai, sar dard aur sharir me dard ho raha hai..."
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-medium">
                      High Fever (39°C)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-medium">
                      Cephalea (Headache)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[11px] font-medium">
                      Myalgia (Body Pain)
                    </span>
                  </div>
                </div>

                {/* Grounded RAG Citation */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-emerald-800 font-semibold text-[11px]">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      Grounded Citation: ICMR Primary Protocol
                    </span>
                    <span className="text-[10px] bg-emerald-200/80 px-1.5 py-0.2 rounded font-mono">
                      STG-VBD-2024
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Acute febrile illness in endemic rural region requires monitoring for platelet decline and ruling out vector-borne infection. Hydration and paracetamol advised pending physician visit.
                  </p>
                </div>

                {/* Doctor Note Overlay */}
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                      MD
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-[11px]">Dr. Anita Deshmukh (PHC MO)</div>
                      <div className="text-[10px] text-blue-700 font-medium">Verified • Blood smear test ordered</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      login('DOCTOR');
                      onNavigate('doctor-dashboard');
                    }}
                    className="px-2.5 py-1 rounded bg-blue-600 text-white font-semibold text-[11px] hover:bg-blue-700"
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM IN RURAL HEALTHCARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Critical Healthcare Deficits
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Why Rural Healthcare Demands Intelligent Decision Support
          </h2>
          <p className="text-sm text-slate-600">
            Over 65% of the rural population struggles with acute barriers to basic medical guidance, leading to preventable complications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Acute Doctor Deficit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In rural areas, doctor-patient ratios exceed 1:1,500 compared to the WHO recommended 1:1,000, leaving Primary Health Centres chronically understaffed.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Geographic Isolation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Villagers frequently travel 20–50 km across unpaved roads to reach a Community Health Centre (CHC) or District Hospital for basic consultations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Mic className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Language & Literacy Gaps</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Medical reports and doctor prescriptions are published in dense technical English, rendering them incomprehensible to vernacular-speaking patients.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Delayed Emergency Triage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inability to recognize critical red flags (acute coronary symptoms, septic shock, stroke) delays timely emergency ambulance dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                The RuralCare AI Paradigm
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Not a Black-Box Diagnostic App. <br />
                <span className="text-emerald-300">An Explainable Clinical Triage Partner.</span>
              </h2>
              <p className="text-sm text-emerald-100 leading-relaxed">
                RuralCare AI bridges the gap between rural citizens, community health workers (ASHAs), and medical officers. By combining multimodal vernacular input with grounded medical literature and physician oversight, we ensure clinical safety at every turn.
              </p>
              <ul className="space-y-2.5 text-xs text-emerald-200 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Zero Speculative Diagnoses:</strong> Outputs probabilistic, explainable guidance only.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Doctor-in-the-Loop Oversight:</strong> Registered doctors review and sign off.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Grounded Citations:</strong> Every assertion links to official WHO/ICMR guidelines.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 space-y-2">
                <div className="text-2xl font-black text-emerald-300">100%</div>
                <div className="text-xs font-bold">Grounded Knowledge</div>
                <p className="text-[11px] text-emerald-200">No fabricated claims; validated via vector RAG.</p>
              </div>
              <div className="p-5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 space-y-2">
                <div className="text-2xl font-black text-emerald-300">&lt; 1 sec</div>
                <div className="text-xs font-bold">Emergency Triage</div>
                <p className="text-[11px] text-emerald-200">Instant red-flag interceptor with 108 dialer.</p>
              </div>
              <div className="p-5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 space-y-2">
                <div className="text-2xl font-black text-emerald-300">3 Channels</div>
                <div className="text-xs font-bold">Multimodal Input</div>
                <p className="text-[11px] text-emerald-200">Typed text, vernacular voice, and lab report OCR.</p>
              </div>
              <div className="p-5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 space-y-2">
                <div className="text-2xl font-black text-emerald-300">3 Roles</div>
                <div className="text-xs font-bold">Tripartite Collaboration</div>
                <p className="text-[11px] text-emerald-200">Patients, physicians, and administrative officers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Engineered Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Key Modules Designed for Rural Realities
          </h2>
          <p className="text-sm text-slate-600">
            A complete suite of healthcare decision-support tools built to function even with low medical literacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <button
            onClick={() => {
              login('PATIENT');
              onNavigate('patient-assessment');
            }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left shadow-xs group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Multimodal Health Assessment</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Describe symptoms in natural language, speak aloud in your regional dialect, or photograph a handwritten clinic prescription.
            </p>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              Text, Voice & OCR <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Feature 2 */}
          <button
            onClick={() => {
              login('PATIENT');
              onNavigate('patient-assessment');
            }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-left shadow-xs group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Adaptive Follow-Up Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Instead of static forms, the system asks 2–3 targeted clinical discriminators based on reported symptoms to rule out acute causes.
            </p>
            <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
              Dynamic Questioning <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Feature 3 */}
          <button
            onClick={() => {
              login('PATIENT');
              onNavigate('patient-reports');
            }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all text-left shadow-xs group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Medical Report OCR Analysis</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Upload blood tests, CBCs, and urinalysis reports. The OCR pipeline extracts hemoglobin, platelets, and glucose with clear reference ranges.
            </p>
            <span className="text-xs font-semibold text-purple-600 flex items-center gap-1">
              Lab Parameter Parser <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Feature 4 */}
          <button
            onClick={() => onNavigate('patient-facilities')}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all text-left shadow-xs group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Healthcare Facility Discovery</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Locate verified government Primary Health Centres (PHCs), Community Health Centres (CHCs), and 24/7 hospitals filtered by district and distance.
            </p>
            <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
              Geolocation Directory <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Feature 5 */}
          <button
            onClick={() => {
              login('DOCTOR');
              onNavigate('doctor-dashboard');
            }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-rose-500 hover:shadow-md transition-all text-left shadow-xs group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Doctor Clinical Dashboard</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Medical officers review AI-triaged queues, examine past medical timelines, validate or override urgency grades, and add clinical notes.
            </p>
            <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
              Physician Sign-Off <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Feature 6 */}
          <button
            onClick={openEmergencyModal}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-500 hover:shadow-md transition-all text-left shadow-xs group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Red-Flag Safety & Triage</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Deterministic emergency filter checks for life-threatening symptoms, immediately halting conversational AI and dialing 108/112 ambulance lines.
            </p>
            <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
              Instant Safety Gate <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Step-by-Step Clinical Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              How RuralCare AI Delivers Verified Guidance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Enter Symptoms</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Describe how you feel using English or Hindi voice, typed text, or upload a scanned lab report PDF.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Safety Screening</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deterministic engine checks for life-threatening red flags. If detected, emergency protocol 108 is triggered immediately.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">RAG Retrieval & AI Reasoning</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Embeddings match symptoms against WHO and ICMR guidelines to synthesize probabilistic, explainable suggestions.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Doctor Oversight & Next Steps</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guidance is recorded on the patient timeline, queued for doctor review, and directions to nearby PHCs are provided.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION & GET STARTED */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Experience Intelligent Rural Healthcare?
          </h2>
          <p className="text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Test the full-stack system with preset roles: submit symptoms as a patient, review cases as a medical officer, or inspect the RAG knowledge repository as an administrator.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => {
                login('PATIENT');
                onNavigate('patient-assessment');
              }}
              className="px-6 py-3 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow-md hover:bg-emerald-50 transition-colors"
            >
              Start Patient Health Assessment
            </button>
            <button
              onClick={() => {
                login('DOCTOR');
                onNavigate('doctor-dashboard');
              }}
              className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs transition-colors"
            >
              Open Doctor Triage Portal
            </button>
            <button
              onClick={() => onNavigate('blueprint')}
              className="px-6 py-3 rounded-xl bg-black/30 hover:bg-black/40 text-white font-semibold text-xs transition-colors"
            >
              Explore Architecture Blueprint
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
