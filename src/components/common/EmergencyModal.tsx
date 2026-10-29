/**
 * RuralCare AI — Emergency Red-Flag Triage Modal
 * Critical clinical safety protocol that bypasses conversational AI when life-threatening symptoms are detected.
 */

import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldAlert, PhoneCall, Hospital, X, AlertTriangle, ArrowRight } from 'lucide-react';

interface EmergencyModalProps {
  onNavigateToFacilities?: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ onNavigateToFacilities }) => {
  const { isEmergencyModalOpen, closeEmergencyModal } = useAuth();

  if (!isEmergencyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border-2 border-red-500 shadow-2xl overflow-hidden text-slate-900">
        {/* Urgent Header */}
        <div className="bg-red-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Emergency Medical Alert</h3>
              <p className="text-xs text-red-100 mt-0.5">Immediate Attention Required</p>
            </div>
          </div>
          <button
            onClick={closeEmergencyModal}
            className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex gap-3 text-red-900">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <p className="font-semibold text-sm mb-1">
                Your reported symptoms indicate a potential medical emergency.
              </p>
              <p>
                <strong>Do NOT rely on AI assessment or conversational guidance.</strong> Please seek immediate professional medical care or call emergency ambulance services right now.
              </p>
            </div>
          </div>

          {/* Quick Dial Emergency Numbers */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              National Emergency Hotlines (Toll-Free 24/7)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:108"
                className="flex items-center justify-between p-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-sm group"
              >
                <div>
                  <div className="text-xs opacity-90 font-normal">Ambulance Service</div>
                  <div className="text-xl">Dial 108</div>
                </div>
                <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="tel:112"
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold transition-all shadow-sm group"
              >
                <div>
                  <div className="text-xs opacity-90 font-normal">Unified Emergency</div>
                  <div className="text-xl">Dial 112</div>
                </div>
                <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs text-slate-700 space-y-1.5">
            <div className="font-semibold text-slate-900">Crucial Immediate Steps:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Keep the patient calm, seated or in recovery position.</li>
              <li>Do not give oral medication or water if swallowing difficulty or chest pain exists.</li>
              <li>Alert family, ASHA healthcare worker, or local village representative.</li>
              <li>Proceed immediately to the nearest 24/7 Community Health Centre (CHC) or District Hospital.</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              closeEmergencyModal();
              if (onNavigateToFacilities) onNavigateToFacilities();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
          >
            <Hospital className="w-4 h-4" />
            <span>Locate Nearest 24/7 Hospital</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={closeEmergencyModal}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-colors"
          >
            Dismiss Alert
          </button>
        </div>
      </div>
    </div>
  );
};
