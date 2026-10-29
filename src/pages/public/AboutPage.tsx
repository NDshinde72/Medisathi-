/**
 * RuralCare AI — About & Academic Project Specification Page
 * Details the B.E. Information Technology capstone scope, objectives, rural epidemiology, and governance.
 */

import React from 'react';
import { Award, ShieldCheck, Stethoscope, Heart, Users, Target, BookOpen, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Final Year B.E. Information Technology Capstone Project</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About RuralCare AI
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          An explainable, clinical decision-support and triage platform engineered to bridge the healthcare gap in underserved rural regions through multimodal intelligence and doctor oversight.
        </p>
      </div>

      {/* Academic Project Identity */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          Academic & Technical Scope
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          This system was architected and implemented as a comprehensive final-year engineering project demonstrating end-to-end full-stack software engineering, applied artificial intelligence, retrieval-augmented generation (RAG), optical character recognition (OCR), and clinical safety governance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-900">Program</span>
            <p className="text-slate-600">Bachelor of Engineering (B.E.)</p>
            <p className="text-slate-500 text-[11px]">Department of Information Technology</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-900">Domain</span>
            <p className="text-slate-600">AI in Healthcare & Clinical Decision Support</p>
            <p className="text-slate-500 text-[11px]">RAG + Explainable AI (XAI) + Multimodal</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-900">Governance</span>
            <p className="text-slate-600">Clinical Safety & Doctor-in-the-Loop</p>
            <p className="text-slate-500 text-[11px]">WHO / ICMR Guideline Adherence</p>
          </div>
        </div>
      </div>

      {/* Core Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Key Problem Solved</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Rural citizens face severe barriers: doctor shortages (&gt;1:1500), language barriers in medical reports, long travel distances to Community Health Centres, and catastrophic delays in identifying life-threatening emergencies. RuralCare AI acts as an accessible early-triage checkpoint that guides patients safely while preserving physician authority.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Ethical & Safety Mandate</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The platform is explicitly non-diagnostic. Rather than pretending to be a synthetic doctor, RuralCare AI categorizes risk (Low, Moderate, High, Emergency), provides transparent clinical rationales with official source citations, and routes acute cases directly to national 108 emergency ambulance systems.
          </p>
        </div>
      </div>

      {/* Grounding Institutions */}
      <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 space-y-4">
        <h3 className="font-bold text-slate-900 text-base text-center">
          Grounded In Authoritative Clinical Knowledge
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <div className="font-bold text-emerald-800">World Health Organization (WHO)</div>
            <p className="text-slate-600 text-[11px]">
              Integrated Management of Childhood Illness (IMCI) and essential primary health standards.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <div className="font-bold text-emerald-800">ICMR, Govt of India</div>
            <p className="text-slate-600 text-[11px]">
              Standard Treatment Guidelines (STGs) for vector-borne infections, anemia, and rural chronic care.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <div className="font-bold text-emerald-800">MoHFW National Health Mission</div>
            <p className="text-slate-600 text-[11px]">
              Sub-Centre and PHC operational guidelines, referral protocols, and emergency triage definitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
