/**
 * RuralCare AI — Unified Authentication Login Page
 * Allows standard login and instant 1-click evaluation logins for Patient, Doctor, and Admin.
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { Stethoscope, Lock, Mail, UserCheck, Shield, Activity, ArrowRight, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('PATIENT');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(role, email || undefined);
    if (role === 'PATIENT') onNavigate('patient-dashboard');
    else if (role === 'DOCTOR') onNavigate('doctor-dashboard');
    else onNavigate('admin-dashboard');
  };

  const handleQuickLogin = (selectedRole: UserRole) => {
    login(selectedRole);
    if (selectedRole === 'PATIENT') onNavigate('patient-dashboard');
    else if (selectedRole === 'DOCTOR') onNavigate('doctor-dashboard');
    else onNavigate('admin-dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Stethoscope className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sign In to RuralCare AI</h1>
        <p className="text-xs text-slate-500">
          Access your clinical decision support portal or test with evaluator profiles.
        </p>
      </div>

      {/* 1-Click Demo Profiles for Evaluators */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Quick 1-Click Evaluation Profiles (For Reviewers)</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleQuickLogin('PATIENT')}
            className="p-2.5 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 text-left transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Patient</span>
            </div>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">Rameshwar (48)</p>
          </button>

          <button
            onClick={() => handleQuickLogin('DOCTOR')}
            className="p-2.5 rounded-xl bg-white hover:bg-blue-100 border border-blue-300 text-left transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-1 text-[11px] font-bold text-blue-800">
              <Activity className="w-3.5 h-3.5" />
              <span>Doctor</span>
            </div>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">Dr. Anita, MD</p>
          </button>

          <button
            onClick={() => handleQuickLogin('ADMIN')}
            className="p-2.5 rounded-xl bg-white hover:bg-purple-100 border border-purple-300 text-left transition-colors shadow-2xs group"
          >
            <div className="flex items-center gap-1 text-[11px] font-bold text-purple-800">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </div>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">Health Admin</p>
          </button>
        </div>
      </div>

      {/* Standard Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleCustomLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(['PATIENT', 'DOCTOR', 'ADMIN'] as UserRole[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-lg font-bold border transition-colors ${
                    role === r
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  role === 'PATIENT'
                    ? 'ramesh.sharma@ruralcare.org'
                    : role === 'DOCTOR'
                    ? 'dr.anita.deshmukh@phc.gov.in'
                    : 'admin@ruralcare.org'
                }
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Sign In as {role}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="text-emerald-700 font-bold hover:underline"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};
