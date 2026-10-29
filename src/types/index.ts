/**
 * RuralCare AI — Core TypeScript Type Definitions
 * Academic Project: Final Year B.E. Information Technology Capstone
 */

export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export type TriageUrgency = 'LOW' | 'MODERATE' | 'HIGH' | 'EMERGENCY';

export type ConsultationStatus =
  | 'PENDING_TRIAGE'
  | 'ASSESSED'
  | 'UNDER_DOCTOR_REVIEW'
  | 'COMPLETED';

export type FacilityType =
  | 'PHC'
  | 'CHC'
  | 'DISTRICT_HOSPITAL'
  | 'SUB_CENTRE'
  | 'COMMUNITY_CLINIC'
  | 'PHARMACY';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
  createdAt: string;
}

export interface PatientProfile {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  villageTown: string;
  district: string;
  state: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface DoctorProfile {
  id: string;
  userId: string;
  fullName: string;
  registrationNumber: string;
  qualification: string;
  specialization: string;
  hospitalAffiliation: string;
  district: string;
  state: string;
  yearsOfExperience: number;
  isVerified: boolean;
}

export interface SymptomItem {
  id?: string;
  name: string;
  severity: 'MILD' | 'MODERATE' | 'SEVERE';
  durationDays: number;
  bodySite?: string;
  isRedFlag?: boolean;
}

export interface RAGSourceCitation {
  id: string;
  documentTitle: string;
  sourceOrg: 'WHO' | 'ICMR' | 'MoHFW';
  section: string;
  relevanceScore: number;
  citationSnippet: string;
  sourceUrl?: string;
}

export interface AIAssessmentResult {
  id: string;
  consultationId: string;
  triageLevel: TriageUrgency;
  possibleConditions: Array<{
    conditionName: string;
    likelihood: 'Possible' | 'Less Likely' | 'Requires Ruling Out';
    rationale: string;
  }>;
  primaryExplanation: string;
  riskFactorsIdentified: string[];
  recommendedNextSteps: string[];
  safetyWarnings?: string[];
  followUpQuestions?: string[];
  sources: RAGSourceCitation[];
  confidenceScore: number;
}

export interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  district: string;
  status: ConsultationStatus;
  urgencyLevel: TriageUrgency;
  chiefComplaint: string;
  inputChannel: 'TEXT' | 'VOICE' | 'MULTIMODAL';
  createdAt: string;
  symptoms: SymptomItem[];
  assessment?: AIAssessmentResult;
  doctorNotes?: DoctorNote;
}

export interface DoctorNote {
  id: string;
  consultationId: string;
  doctorId: string;
  doctorName: string;
  clinicalObservations: string;
  agreesWithAITriage: boolean;
  doctorTriageOverride?: TriageUrgency;
  recommendations: string;
  prescriptions?: Array<{
    medicineName: string;
    dosage: string;
    frequency: string;
    days: number;
  }>;
  referralFacilityName?: string;
  createdAt: string;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: FacilityType;
  district: string;
  state: string;
  address: string;
  contactPhone: string;
  emergencyAvailable: boolean;
  bedCount: number;
  operatingHours: string;
  distanceKm?: number;
  latitude: number;
  longitude: number;
  servicesOffered: string[];
}

export interface MedicalReport {
  id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadedAt: string;
  extractedParameters: Record<
    string,
    { value: number | string; unit: string; status: 'NORMAL' | 'LOW' | 'HIGH'; referenceRange?: string }
  >;
  interpretation: string;
  isAbnormal: boolean;
  testType?: string;
  patientName?: string;
  labDate?: string;
}
