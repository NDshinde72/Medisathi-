/**
 * RuralCare AI — How It Works Page
 * In-depth clinical and technical walkthrough of the multimodal RAG decision support engine.
 */

import React from 'react';
import {
  BrainCircuit,
  ShieldAlert,
  Mic,
  FileText,
  Search,
  CheckCircle,
  Database,
  ArrowRight,
  BookOpen,
  Activity,
  Layers,
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
          Architecture & Methodology
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How RuralCare AI Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Explore the transparent, multi-stage pipeline connecting multimodal patient input to grounded clinical reasoning and physician verification.
        </p>
      </div>

      {/* Visual Pipeline Stages */}
      <div className="space-y-6">
        {/* Stage 1 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg shrink-0">
            01
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-bold text-slate-900 text-base">Multimodal Ingestion (Text, Vernacular Voice, Lab OCR)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Patients or village ASHA workers can describe symptoms in typed text, speak in Hindi or English using Web Speech / Whisper models, or upload photographs of diagnostic lab reports (CBC, malaria smear, blood sugar).
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-slate-500">
              <span className="bg-slate-100 px-2 py-0.5 rounded">Speech-to-Text NLP</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">Tesseract / Vision OCR</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded">Symptom Normalization</span>
            </div>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="p-6 rounded-2xl bg-red-50/50 border border-red-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg shrink-0">
            02
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-red-950 text-base">Deterministic Red-Flag Emergency Gate</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-200 text-red-800">
                Critical Safety Layer
              </span>
            </div>
            <p className="text-xs text-red-900 leading-relaxed">
              Before running generative AI, a high-priority deterministic filter inspects reported complaints against life-threatening criteria: crushing chest pain, acute hemiplegia, severe breathing difficulty, massive hemorrhage, or anaphylaxis.
            </p>
            <p className="text-xs text-red-800 font-semibold">
              Action: If triggered, conversational AI halts immediately and dials 108 Emergency Ambulance.
            </p>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg shrink-0">
            03
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-bold text-slate-900 text-base">RAG Semantic Retrieval from WHO & ICMR Knowledge Base</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The query vector searches a vector index of indexed clinical guideline chunks. Rather than generating answers from general internet training, the LLM is strictly constrained to synthesize guidance using the retrieved evidence snippets.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700">
              Query Vector ──▶ Cosine Similarity &gt; 0.65 ──▶ Top-K Evidence Chunks (WHO IMCI / ICMR STGs)
            </div>
          </div>
        </div>

        {/* Stage 4 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg shrink-0">
            04
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-bold text-slate-900 text-base">Explainable AI (XAI) & Adaptive Follow-Up Questions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The AI formulates non-definitive possibilities (*"Symptoms suggest potential causes such as..."*) along with transparent explanations of why specific risk factors were flagged. It prompts 2 targeted follow-up queries to refine severity.
            </p>
          </div>
        </div>

        {/* Stage 5 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg shrink-0">
            05
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-bold text-slate-900 text-base">Doctor Verification & Rural Facility Navigation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The complete session is recorded on the patient’s longitudinal medical timeline and queued for review by the registered Primary Health Centre doctor. Nearest PHCs/CHCs with operating hours and travel distance are mapped.
            </p>
          </div>
        </div>
      </div>

      {/* Try Assessment Banner */}
      <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-lg">Test the Pipeline Now</h4>
          <p className="text-xs text-slate-400">
            Launch a simulated patient consultation to see the safety checks and RAG retrieval in real time.
          </p>
        </div>
        <button
          onClick={() => onNavigate('patient-assessment')}
          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-2"
        >
          <span>Start Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
