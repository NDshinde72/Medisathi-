/**
 * RuralCare AI — Authentication & Session Context
 * Supports Patient, Doctor, and Admin roles with preset demo credentials for evaluation.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, PatientProfile, DoctorProfile } from '../types';

interface AuthContextType {
  user: User | null;
  patientProfile: PatientProfile | null;
  doctorProfile: DoctorProfile | null;
  login: (role: UserRole, email?: string) => void;
  logout: () => void;
  registerPatient: (data: Partial<PatientProfile> & { email: string }) => void;
  registerDoctor: (data: Partial<DoctorProfile> & { email: string }) => void;
  isEmergencyModalOpen: boolean;
  openEmergencyModal: () => void;
  closeEmergencyModal: () => void;
}

const DEMO_PATIENT: { user: User; profile: PatientProfile } = {
  user: {
    id: 'pat-101',
    email: 'ramesh.sharma@ruralcare.org',
    role: 'PATIENT',
    phoneNumber: '+91 98765 43210',
    createdAt: '2026-03-15T08:30:00Z',
  },
  profile: {
    id: 'prof-pat-101',
    userId: 'pat-101',
    fullName: 'Rameshwar Sharma',
    age: 48,
    gender: 'Male',
    bloodGroup: 'B+',
    villageTown: 'Khedgaon',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    emergencyContactName: 'Sunita Sharma (Spouse)',
    emergencyContactPhone: '+91 98765 43211',
  },
};

const DEMO_DOCTOR: { user: User; profile: DoctorProfile } = {
  user: {
    id: 'doc-201',
    email: 'dr.anita.deshmukh@phc.gov.in',
    role: 'DOCTOR',
    phoneNumber: '+91 91234 56789',
    createdAt: '2025-11-10T10:00:00Z',
  },
  profile: {
    id: 'prof-doc-201',
    userId: 'doc-201',
    fullName: 'Dr. Anita Deshmukh, MD',
    registrationNumber: 'MCI-2014-88421',
    qualification: 'MBBS, MD (Community Medicine)',
    specialization: 'General Medicine & Rural Health',
    hospitalAffiliation: 'Rampur Primary Health Centre (PHC)',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    yearsOfExperience: 12,
    isVerified: true,
  },
};

const DEMO_ADMIN: User = {
  id: 'adm-301',
  email: 'admin@ruralcare.org',
  role: 'ADMIN',
  createdAt: '2025-01-01T00:00:00Z',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);

  // Restore session from localStorage if present
  useEffect(() => {
    const savedRole = localStorage.getItem('ruralcare_saved_role') as UserRole | null;
    if (savedRole === 'PATIENT') {
      setUser(DEMO_PATIENT.user);
      setPatientProfile(DEMO_PATIENT.profile);
    } else if (savedRole === 'DOCTOR') {
      setUser(DEMO_DOCTOR.user);
      setDoctorProfile(DEMO_DOCTOR.profile);
    } else if (savedRole === 'ADMIN') {
      setUser(DEMO_ADMIN);
    }
  }, []);

  const login = (role: UserRole, email?: string) => {
    if (role === 'PATIENT') {
      const u = { ...DEMO_PATIENT.user, email: email || DEMO_PATIENT.user.email };
      setUser(u);
      setPatientProfile(DEMO_PATIENT.profile);
      setDoctorProfile(null);
      localStorage.setItem('ruralcare_saved_role', 'PATIENT');
    } else if (role === 'DOCTOR') {
      const u = { ...DEMO_DOCTOR.user, email: email || DEMO_DOCTOR.user.email };
      setUser(u);
      setDoctorProfile(DEMO_DOCTOR.profile);
      setPatientProfile(null);
      localStorage.setItem('ruralcare_saved_role', 'DOCTOR');
    } else {
      const u = { ...DEMO_ADMIN, email: email || DEMO_ADMIN.email };
      setUser(u);
      setPatientProfile(null);
      setDoctorProfile(null);
      localStorage.setItem('ruralcare_saved_role', 'ADMIN');
    }
  };

  const logout = () => {
    setUser(null);
    setPatientProfile(null);
    setDoctorProfile(null);
    localStorage.removeItem('ruralcare_saved_role');
  };

  const registerPatient = (data: Partial<PatientProfile> & { email: string }) => {
    const newUserId = 'pat-' + Date.now();
    const newUser: User = {
      id: newUserId,
      email: data.email,
      role: 'PATIENT',
      createdAt: new Date().toISOString(),
    };
    const newProfile: PatientProfile = {
      id: 'prof-' + newUserId,
      userId: newUserId,
      fullName: data.fullName || 'Patient User',
      age: data.age || 35,
      gender: data.gender || 'Other',
      bloodGroup: data.bloodGroup || 'Unknown',
      villageTown: data.villageTown || 'Rural Settlement',
      district: data.district || 'District Center',
      state: data.state || 'State',
      emergencyContactName: data.emergencyContactName || 'Family Kin',
      emergencyContactPhone: data.emergencyContactPhone || '+91 99999 88888',
    };
    setUser(newUser);
    setPatientProfile(newProfile);
    setDoctorProfile(null);
    localStorage.setItem('ruralcare_saved_role', 'PATIENT');
  };

  const registerDoctor = (data: Partial<DoctorProfile> & { email: string }) => {
    const newDocId = 'doc-' + Date.now();
    const newUser: User = {
      id: newDocId,
      email: data.email,
      role: 'DOCTOR',
      createdAt: new Date().toISOString(),
    };
    const newProfile: DoctorProfile = {
      id: 'prof-' + newDocId,
      userId: newDocId,
      fullName: data.fullName || 'Dr. Medical Officer',
      registrationNumber: data.registrationNumber || 'NMC-' + Math.floor(10000 + Math.random() * 90000),
      qualification: data.qualification || 'MBBS',
      specialization: data.specialization || 'Primary Care Physician',
      hospitalAffiliation: data.hospitalAffiliation || 'Primary Health Centre',
      district: data.district || 'Rural District',
      state: data.state || 'State',
      yearsOfExperience: data.yearsOfExperience || 5,
      isVerified: true,
    };
    setUser(newUser);
    setDoctorProfile(newProfile);
    setPatientProfile(null);
    localStorage.setItem('ruralcare_saved_role', 'DOCTOR');
  };

  const openEmergencyModal = () => setIsEmergencyModalOpen(true);
  const closeEmergencyModal = () => setIsEmergencyModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        patientProfile,
        doctorProfile,
        login,
        logout,
        registerPatient,
        registerDoctor,
        isEmergencyModalOpen,
        openEmergencyModal,
        closeEmergencyModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
