/**
 * RuralCare AI — Registration Page
 * Accommodates Patient registration (with rural demographics) and Doctor registration (with clinical credentials).
 */

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { Stethoscope, User, Heart, Building2, PhoneCall, ShieldCheck, ArrowRight } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { registerPatient, registerDoctor } = useAuth();
  const [role, setRole] = useState<'PATIENT' | 'DOCTOR'>('PATIENT');

  // Patient Fields
  const [patientData, setPatientData] = useState({
    fullName: '',
    email: '',
    age: 35,
    gender: 'Male',
    bloodGroup: 'B+',
    villageTown: '',
    district: '',
    state: 'Maharashtra',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  // Doctor Fields
  const [doctorData, setDoctorData] = useState({
    fullName: '',
    email: '',
    registrationNumber: '',
    qualification: 'MBBS',
    specialization: 'General Medicine',
    hospitalAffiliation: '',
    district: '',
    state: 'Maharashtra',
    yearsOfExperience: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'PATIENT') {
      registerPatient(patientData);
      onNavigate('patient-dashboard');
    } else {
      registerDoctor(doctorData);
      onNavigate('doctor-dashboard');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Stethoscope className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create RuralCare AI Account</h1>
        <p className="text-xs text-slate-500">
          Join the rural healthcare network as a patient or verified medical officer.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole('PATIENT')}
            className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              role === 'PATIENT'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Register as Patient / Citizen</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('DOCTOR')}
            className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              role === 'DOCTOR'
                ? 'bg-blue-50 border-blue-500 text-blue-800'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Register as Doctor / Medical Officer</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {role === 'PATIENT' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={patientData.fullName}
                    onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                    placeholder="e.g. Rameshwar Sharma"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={patientData.email}
                    onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                    placeholder="rameshwar@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min={0}
                    max={120}
                    value={patientData.age}
                    onChange={(e) => setPatientData({ ...patientData, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={patientData.gender}
                    onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={patientData.bloodGroup}
                    onChange={(e) => setPatientData({ ...patientData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Village / Town</label>
                  <input
                    type="text"
                    required
                    value={patientData.villageTown}
                    onChange={(e) => setPatientData({ ...patientData, villageTown: e.target.value })}
                    placeholder="e.g. Khedgaon"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={patientData.district}
                    onChange={(e) => setPatientData({ ...patientData, district: e.target.value })}
                    placeholder="e.g. Ahmednagar"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={patientData.state}
                    onChange={(e) => setPatientData({ ...patientData, state: e.target.value })}
                    placeholder="e.g. Maharashtra"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Emergency Kin Name</label>
                  <input
                    type="text"
                    value={patientData.emergencyContactName}
                    onChange={(e) => setPatientData({ ...patientData, emergencyContactName: e.target.value })}
                    placeholder="Sunita Sharma (Spouse)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Emergency Phone</label>
                  <input
                    type="tel"
                    value={patientData.emergencyContactPhone}
                    onChange={(e) => setPatientData({ ...patientData, emergencyContactPhone: e.target.value })}
                    placeholder="+91 98765 43211"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Doctor Name</label>
                  <input
                    type="text"
                    required
                    value={doctorData.fullName}
                    onChange={(e) => setDoctorData({ ...doctorData, fullName: e.target.value })}
                    placeholder="Dr. Anita Deshmukh, MD"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={doctorData.email}
                    onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                    placeholder="dr.anita@phc.gov.in"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Medical Registration No.</label>
                  <input
                    type="text"
                    required
                    value={doctorData.registrationNumber}
                    onChange={(e) => setDoctorData({ ...doctorData, registrationNumber: e.target.value })}
                    placeholder="MCI-2014-88421"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Qualification</label>
                  <input
                    type="text"
                    required
                    value={doctorData.qualification}
                    onChange={(e) => setDoctorData({ ...doctorData, qualification: e.target.value })}
                    placeholder="MBBS, MD"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hospital / PHC Affiliation</label>
                  <input
                    type="text"
                    required
                    value={doctorData.hospitalAffiliation}
                    onChange={(e) => setDoctorData({ ...doctorData, hospitalAffiliation: e.target.value })}
                    placeholder="Rampur Primary Health Centre (PHC)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={doctorData.district}
                    onChange={(e) => setDoctorData({ ...doctorData, district: e.target.value })}
                    placeholder="Ahmednagar"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className={`w-full py-2.5 rounded-xl text-white font-bold transition-colors flex items-center justify-center gap-1.5 ${
              role === 'PATIENT' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <span>Complete Registration as {role}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Already registered?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-emerald-700 font-bold hover:underline"
          >
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
};
