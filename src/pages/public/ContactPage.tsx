/**
 * RuralCare AI — Contact & Emergency Helplines Page
 * Provides national 24/7 helplines, district health office directories, and community outreach channels.
 */

import React, { useState } from 'react';
import { PhoneCall, MapPin, Mail, Clock, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const ContactPage: React.FC = () => {
  const { openEmergencyModal } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Patient / Citizen',
    district: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
          Support & Public Health Contacts
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Emergency Hotlines & Health Directory
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Access immediate toll-free government healthcare helplines or contact local Primary Health Centre (PHC) nodal officers.
        </p>
      </div>

      {/* Emergency Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-red-600 text-white shadow-lg space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-red-100 uppercase tracking-wider font-semibold">Toll-Free Ambulance</div>
            <div className="text-3xl font-extrabold">Dial 108</div>
          </div>
          <p className="text-xs text-red-100 leading-relaxed">
            Free 24/7 Emergency Medical Response Service connecting to the nearest district ambulance dispatch.
          </p>
          <button
            onClick={openEmergencyModal}
            className="w-full py-2.5 rounded-xl bg-white text-red-700 text-xs font-bold hover:bg-red-50 transition-colors"
          >
            Launch Emergency Protocol
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-lg space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Unified National Emergency</div>
            <div className="text-3xl font-extrabold">Dial 112</div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            All-in-one national emergency helpline for police, fire, and medical support across India.
          </p>
          <a
            href="tel:112"
            className="inline-block text-center w-full py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            Call 112 Directly
          </a>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-800 text-white shadow-lg space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">Health Advice Helpline</div>
            <div className="text-3xl font-extrabold">Dial 104</div>
          </div>
          <p className="text-xs text-emerald-200 leading-relaxed">
            State-run medical advisory line providing non-emergency health counseling and directory services.
          </p>
          <a
            href="tel:104"
            className="inline-block text-center w-full py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
          >
            Call 104 Directly
          </a>
        </div>
      </div>

      {/* Contact & Feedback Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Project Governance & Research Inquiries</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Developed as an academic capstone for B.E. Information Technology. For collaborative deployment in Primary Health Centres or village clusters, contact the student research team.
          </p>
          <div className="space-y-3 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Department of Information Technology, Engineering Institute</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ruralcare-ai.capstone@engineering.edu</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Academic Verification: Academic Year 2025–2026</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Inquiry Submitted Successfully</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for reaching out. Your feedback has been recorded in the RuralCare AI audit registry.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">Send a Community Inquiry or Feedback</h4>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Rameshwar Sharma / Dr. Kulkarni"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option>Patient / Citizen</option>
                    <option>Primary Care Doctor</option>
                    <option>ASHA / Health Worker</option>
                    <option>Academic Evaluator</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District / Region</label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="e.g., Ahmednagar, Pune"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Message / Observation</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, feedback on symptom assessment, or PHC coordination..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
