/**
 * RuralCare AI — Global Navigation Bar with Universal Feature Access Bar
 * Features instant 1-click access to all 10 core application modules,
 * role switcher, emergency 108 shortcut, and mobile drawer.
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Stethoscope,
  PhoneCall,
  Menu,
  X,
  User,
  LogOut,
  ShieldAlert,
  ChevronDown,
  Building2,
  FileText,
  Activity,
  Layers,
  Sparkles,
  Mic,
  Clock,
  Home,
  BrainCircuit,
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { user, patientProfile, doctorProfile, logout, openEmergencyModal, login } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Top header links
  const headerLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About & Impact' },
    { id: 'contact', label: 'Helplines' },
    { id: 'blueprint', label: 'Architecture' },
  ];

  // Secondary Universal Feature Ribbon: All Core Features
  const featureRibbon = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'patient-dashboard', label: 'Patient Dashboard', icon: User, role: 'PATIENT' },
    { id: 'patient-assessment', label: 'AI Health Assessment', icon: Activity, role: 'PATIENT' },
    { id: 'patient-voice', label: 'Voice Triage', icon: Mic, role: 'PATIENT' },
    { id: 'patient-reports', label: 'Lab Reports OCR', icon: FileText, role: 'PATIENT' },
    { id: 'patient-facilities', label: 'Nearby PHC / CHC', icon: Building2 },
    { id: 'patient-timeline', label: 'Health Timeline', icon: Clock, role: 'PATIENT' },
    { id: 'doctor-dashboard', label: 'Doctor Decision Portal', icon: Stethoscope, role: 'DOCTOR' },
    { id: 'admin-dashboard', label: 'Admin & RAG Governance', icon: Layers, role: 'ADMIN' },
    { id: 'blueprint', label: 'System Blueprint', icon: BrainCircuit },
  ];

  const handleFeatureClick = (item: (typeof featureRibbon)[0]) => {
    if (item.role && (!user || user.role !== item.role)) {
      login(item.role as any);
    }
    onNavigate(item.id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Primary Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 text-left focus:outline-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">RuralCare</span>
              <span className="font-bold text-emerald-600 text-lg">AI</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 tracking-wider">
                B.E. IT
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Healthcare Decision Support Platform</p>
          </div>
        </button>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {headerLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentPage === item.id
                  ? 'bg-slate-100 text-emerald-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5">
          {/* Quick 1-Click Role Switcher Pills */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold border border-slate-200">
            <span className="text-[10px] text-slate-400 px-1 uppercase tracking-wider">Role:</span>
            <button
              onClick={() => {
                login('PATIENT');
                onNavigate('patient-dashboard');
              }}
              className={`px-2 py-1 rounded-lg transition-colors ${
                user?.role === 'PATIENT' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => {
                login('DOCTOR');
                onNavigate('doctor-dashboard');
              }}
              className={`px-2 py-1 rounded-lg transition-colors ${
                user?.role === 'DOCTOR' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Doctor
            </button>
            <button
              onClick={() => {
                login('ADMIN');
                onNavigate('admin-dashboard');
              }}
              className={`px-2 py-1 rounded-lg transition-colors ${
                user?.role === 'ADMIN' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Emergency 108 Button */}
          <button
            onClick={openEmergencyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs animate-pulse"
            title="Immediate Red-Flag Emergency Triage"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Emergency 108</span>
            <span className="sm:hidden">108</span>
          </button>

          {/* Active User Session Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.role[0]}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-semibold text-slate-900 text-[11px] leading-tight">
                    {user.role === 'PATIENT'
                      ? patientProfile?.fullName || 'Rameshwar'
                      : user.role === 'DOCTOR'
                      ? doctorProfile?.fullName || 'Dr. Anita'
                      : 'Admin Officer'}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold uppercase">{user.role}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[11px] text-slate-400 font-medium">Active Session</p>
                    <p className="font-bold text-slate-800 truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        login('PATIENT');
                        setRoleMenuOpen(false);
                        onNavigate('patient-dashboard');
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Switch to Patient View</span>
                    </button>
                    <button
                      onClick={() => {
                        login('DOCTOR');
                        setRoleMenuOpen(false);
                        onNavigate('doctor-dashboard');
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-2"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                      <span>Switch to Doctor View</span>
                    </button>
                    <button
                      onClick={() => {
                        login('ADMIN');
                        setRoleMenuOpen(false);
                        onNavigate('admin-dashboard');
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-2"
                    >
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      <span>Switch to Admin View</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setRoleMenuOpen(false);
                        onNavigate('landing');
                      }}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Secondary Universal Feature Navigation Ribbon */}
      <div className="bg-slate-100 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8 py-1.5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mr-1 shrink-0">
            All Features:
          </span>
          {featureRibbon.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleFeatureClick(item)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                    : 'text-slate-700 hover:bg-white hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Application Features
          </p>
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {featureRibbon.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleFeatureClick(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 ${
                    currentPage === item.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Switch Evaluator Role
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  login('PATIENT');
                  setMobileMenuOpen(false);
                  onNavigate('patient-dashboard');
                }}
                className="p-2 text-center rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold"
              >
                Patient
              </button>
              <button
                onClick={() => {
                  login('DOCTOR');
                  setMobileMenuOpen(false);
                  onNavigate('doctor-dashboard');
                }}
                className="p-2 text-center rounded-lg bg-blue-50 text-blue-800 text-xs font-bold"
              >
                Doctor
              </button>
              <button
                onClick={() => {
                  login('ADMIN');
                  setMobileMenuOpen(false);
                  onNavigate('admin-dashboard');
                }}
                className="p-2 text-center rounded-lg bg-purple-50 text-purple-800 text-xs font-bold"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
