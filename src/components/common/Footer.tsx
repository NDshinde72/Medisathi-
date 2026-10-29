/**
 * RuralCare AI — Global Footer & Clinical Governance Notice
 * Contains statutory medical disclaimers, academic accreditation, and emergency hotlines.
 */

import React from 'react';
import { Stethoscope, ShieldAlert, Heart, PhoneCall, ExternalLink, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Statutory Clinical Disclaimer Banner */}
      <div className="bg-amber-950/70 border-b border-amber-800/60 py-3.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-amber-200">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Crucial Medical Notice:</strong> RuralCare AI provides clinical decision support and health guidance based on WHO/ICMR standards. It does not provide definitive medical diagnosis or replace registered physicians.
            </span>
          </div>
          <span className="text-[11px] text-amber-300/80 shrink-0">
            In case of life-threatening emergency, call <strong>108</strong> immediately.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight">RuralCare AI</span>
                <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                  Rural Decision Support
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering primary healthcare workers and rural citizens with explainable multimodal symptom triage, WHO/ICMR grounded RAG guidance, and doctor-in-the-loop oversight.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>B.E. Information Technology Capstone</span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Platform Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-emerald-400 transition-colors">
                  Home Landing Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-emerald-400 transition-colors">
                  How AI + RAG Operates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors">
                  Project Mission & Problem Statement
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blueprint')} className="hover:text-emerald-400 transition-colors">
                  System Architecture Explorer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors">
                  Primary Health Centres Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical & RAG Guidelines */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Grounded Knowledge</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>World Health Organization (WHO) IMCI</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>ICMR Standard Treatment Guidelines</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>MoHFW National Health Mission SOPs</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Telemedicine Practice Guidelines, India</span>
              </li>
            </ul>
          </div>

          {/* Emergency Hotlines */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">National Helplines (24/7)</h4>
            <div className="space-y-2">
              <a
                href="tel:108"
                className="flex items-center justify-between p-2.5 rounded-lg bg-red-950/80 border border-red-800 text-red-200 hover:bg-red-900 transition-colors"
              >
                <span>National Ambulance (Free)</span>
                <span className="font-bold text-sm text-red-100">108</span>
              </a>
              <a
                href="tel:112"
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <span>Unified Emergency Services</span>
                <span className="font-bold text-sm text-white">112</span>
              </a>
              <a
                href="tel:104"
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <span>National Health Advice Helpline</span>
                <span className="font-bold text-sm text-white">104</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 RuralCare AI — Final Year B.E. Information Technology Engineering Project. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision for rural healthcare equity</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
