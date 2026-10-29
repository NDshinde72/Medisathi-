/**
 * RuralCare AI — In-Memory Database & Seed Repository
 * Production-ready mock of PostgreSQL relational schemas as designed in docs/database-schema.sql.
 * Pre-seeded with 5 patients, 3 doctors, 1 admin, 6 healthcare facilities, and WHO/ICMR RAG guidelines.
 */

import type {
  User,
  PatientProfile,
  DoctorProfile,
  Consultation,
  HealthcareFacility,
  RAGSourceCitation,
  MedicalReport,
  TriageUrgency,
} from '../../src/types/index.ts';

export interface RAGDocument {
  id: string;
  title: string;
  sourceOrg: 'WHO' | 'ICMR' | 'MoHFW';
  documentType: string;
  version: string;
  publicationDate: string;
  totalChunks: number;
  chunks: Array<{
    id: string;
    index: number;
    content: string;
    keywords: string[];
  }>;
}

// 1. Initial Users (Section 29 Seed Data)
export const initialUsers: User[] = [
  { id: 'usr-pat-1', email: 'ramesh.sharma@ruralcare.org', role: 'PATIENT', phoneNumber: '+91 98765 43210', createdAt: '2026-01-10T09:00:00Z' },
  { id: 'usr-pat-2', email: 'savita.patil@ruralcare.org', role: 'PATIENT', phoneNumber: '+91 98765 43211', createdAt: '2026-02-14T11:00:00Z' },
  { id: 'usr-pat-3', email: 'anand.jadhav@ruralcare.org', role: 'PATIENT', phoneNumber: '+91 98765 43212', createdAt: '2026-02-20T14:30:00Z' },
  { id: 'usr-pat-4', email: 'rukmini.shinde@ruralcare.org', role: 'PATIENT', phoneNumber: '+91 98765 43213', createdAt: '2026-03-01T08:15:00Z' },
  { id: 'usr-pat-5', email: 'balu.gaikwad@ruralcare.org', role: 'PATIENT', phoneNumber: '+91 98765 43214', createdAt: '2026-03-12T16:45:00Z' },

  { id: 'usr-doc-1', email: 'dr.anita.deshmukh@phc.gov.in', role: 'DOCTOR', phoneNumber: '+91 91234 56789', createdAt: '2025-10-01T08:00:00Z' },
  { id: 'usr-doc-2', email: 'dr.vijay.kulkarni@chc.gov.in', role: 'DOCTOR', phoneNumber: '+91 91234 56790', createdAt: '2025-11-15T09:30:00Z' },
  { id: 'usr-doc-3', email: 'dr.sunita.pawar@districthosp.gov.in', role: 'DOCTOR', phoneNumber: '+91 91234 56791', createdAt: '2025-12-05T10:15:00Z' },

  { id: 'usr-adm-1', email: 'admin@ruralcare.org', role: 'ADMIN', phoneNumber: '+91 90000 00001', createdAt: '2025-01-01T00:00:00Z' },
];

// 2. Initial Patient Profiles
export const initialPatients: PatientProfile[] = [
  {
    id: 'pat-1',
    userId: 'usr-pat-1',
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
  {
    id: 'pat-2',
    userId: 'usr-pat-2',
    fullName: 'Savita Patil',
    age: 34,
    gender: 'Female',
    bloodGroup: 'O+',
    villageTown: 'Rahuri Rural',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    emergencyContactName: 'Dnyaneshwar Patil',
    emergencyContactPhone: '+91 98765 43222',
  },
  {
    id: 'pat-3',
    userId: 'usr-pat-3',
    fullName: 'Anand Jadhav',
    age: 62,
    gender: 'Male',
    bloodGroup: 'AB+',
    villageTown: 'Shirdi Outskirts',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    emergencyContactName: 'Kishore Jadhav (Son)',
    emergencyContactPhone: '+91 98765 43233',
  },
  {
    id: 'pat-4',
    userId: 'usr-pat-4',
    fullName: 'Rukmini Shinde',
    age: 26,
    gender: 'Female',
    bloodGroup: 'A+',
    villageTown: 'Belwandi',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    emergencyContactName: 'Rahul Shinde',
    emergencyContactPhone: '+91 98765 43244',
  },
  {
    id: 'pat-5',
    userId: 'usr-pat-5',
    fullName: 'Balu Gaikwad',
    age: 55,
    gender: 'Male',
    bloodGroup: 'O-',
    villageTown: 'Parner Rural',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    emergencyContactName: 'Suman Gaikwad',
    emergencyContactPhone: '+91 98765 43255',
  },
];

// 3. Initial Doctor Profiles
export const initialDoctors: DoctorProfile[] = [
  {
    id: 'doc-1',
    userId: 'usr-doc-1',
    fullName: 'Dr. Anita Deshmukh, MD',
    registrationNumber: 'MCI-2014-88421',
    qualification: 'MBBS, MD (Community Medicine)',
    specialization: 'Primary Care & Rural Medicine',
    hospitalAffiliation: 'Rampur Primary Health Centre (PHC)',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    yearsOfExperience: 12,
    isVerified: true,
  },
  {
    id: 'doc-2',
    userId: 'usr-doc-2',
    fullName: 'Dr. Vijay Kulkarni, MS',
    registrationNumber: 'MCI-2018-77192',
    qualification: 'MBBS, DCH (Pediatrics)',
    specialization: 'Maternal & Child Healthcare',
    hospitalAffiliation: 'Parner Community Health Centre (CHC)',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    yearsOfExperience: 8,
    isVerified: true,
  },
  {
    id: 'doc-3',
    userId: 'usr-doc-3',
    fullName: 'Dr. Sunita Pawar, MD',
    registrationNumber: 'MCI-2011-33104',
    qualification: 'MBBS, MD (Internal Medicine)',
    specialization: 'Critical Care & Triage Specialist',
    hospitalAffiliation: 'Ahmednagar District Hospital',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    yearsOfExperience: 15,
    isVerified: true,
  },
];

// 4. Initial Healthcare Facilities Registry
export const initialFacilities: HealthcareFacility[] = [
  {
    id: 'fac-1',
    name: 'Rampur Primary Health Centre (PHC)',
    type: 'PHC',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    address: 'Main Road, Rampur Village, Ahmednagar Dist.',
    contactPhone: '+91 241 234567',
    emergencyAvailable: false,
    bedCount: 6,
    operatingHours: '09:00 AM - 05:00 PM (Emergency on-call)',
    distanceKm: 4.2,
    latitude: 19.0948,
    longitude: 74.748,
    servicesOffered: ['Outpatient Care', 'Basic Lab (Smear, Sugar)', 'Immunization', 'Maternal Antenatal'],
  },
  {
    id: 'fac-2',
    name: 'Parner Community Health Centre (CHC)',
    type: 'CHC',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    address: 'Near Bus Stand, Parner Taluka Headquarters',
    contactPhone: '+91 241 245678',
    emergencyAvailable: true,
    bedCount: 30,
    operatingHours: '24/7 Casualty & Inpatient',
    distanceKm: 14.8,
    latitude: 19.0028,
    longitude: 74.4371,
    servicesOffered: ['24/7 Emergency Casualty', 'Minor OT', 'X-Ray & Ultrasound', 'Maternity Labour Ward', 'Ambulance 108 Base'],
  },
  {
    id: 'fac-3',
    name: 'Ahmednagar District Civil Hospital',
    type: 'DISTRICT_HOSPITAL',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    address: 'Station Road, Tophkhana, Ahmednagar City',
    contactPhone: '+91 241 232323',
    emergencyAvailable: true,
    bedCount: 350,
    operatingHours: '24/7 Trauma & Tertiary Emergency',
    distanceKm: 28.5,
    latitude: 19.0952,
    longitude: 74.7496,
    servicesOffered: ['ICU & CCU', 'Trauma Center', 'Blood Bank 24/7', 'Full Biochemistry Lab', 'Surgical Theatres'],
  },
  {
    id: 'fac-4',
    name: 'Khedgaon Health Sub-Centre',
    type: 'SUB_CENTRE',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    address: 'Near Gram Panchayat Office, Khedgaon',
    contactPhone: '+91 98765 00101',
    emergencyAvailable: false,
    bedCount: 2,
    operatingHours: '09:00 AM - 01:00 PM (ANM / ASHA Base)',
    distanceKm: 1.5,
    latitude: 19.085,
    longitude: 74.72,
    servicesOffered: ['Primary First Aid', 'BP & Blood Sugar Screening', 'Oral Rehydration Salts (ORS)'],
  },
  {
    id: 'fac-5',
    name: 'Pradhan Mantri Jan Aushadhi Kendra',
    type: 'PHARMACY',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    address: 'Market Yard, Rahuri Rural',
    contactPhone: '+91 241 289900',
    emergencyAvailable: false,
    bedCount: 0,
    operatingHours: '08:30 AM - 09:00 PM',
    distanceKm: 8.0,
    latitude: 19.39,
    longitude: 74.65,
    servicesOffered: ['Affordable Generic Medications', 'ORS Packets', 'Paracetamol & Antihistamines'],
  },
];

// 5. Initial RAG Documents (Official WHO & ICMR Guidelines)
export const initialRAGDocuments: RAGDocument[] = [
  {
    id: 'rag-doc-1',
    title: 'ICMR Standard Treatment Guidelines: Acute Febrile Illness & Vector Borne Infections',
    sourceOrg: 'ICMR',
    documentType: 'Clinical Protocol',
    version: '2024.1',
    publicationDate: '2024-03-15',
    totalChunks: 3,
    chunks: [
      {
        id: 'chunk-1-1',
        index: 1,
        content:
          'In rural endemic districts, any acute fever lasting >48 hours accompanied by severe headache, retro-orbital pain, or generalized body aches must be evaluated for Dengue or Malaria. Mandatory warning signs include persistent vomiting, abdominal pain, mucosal bleeding, and sudden lethargy.',
        keywords: ['fever', 'headache', 'body pain', 'dengue', 'malaria', 'vomiting', 'bleeding'],
      },
      {
        id: 'chunk-1-2',
        index: 2,
        content:
          'Immediate management at the Primary Health Centre level: Maintain adequate oral hydration with ORS and tender coconut water. Avoid Aspirin, Ibuprofen, and Diclofenac due to hemorrhagic risk; administer Paracetamol (500mg-650mg) only if temperature exceeds 38.5°C.',
        keywords: ['hydration', 'ors', 'paracetamol', 'fever management', 'phc'],
      },
      {
        id: 'chunk-1-3',
        index: 3,
        content:
          'Red Flag Triage Criteria: Hematocrit elevation with rapid platelet drop (<50,000/uL), postural hypotension, cold extremities, or respiratory distress mandates immediate transfer via 108 ambulance to a facility with blood transfusion facilities.',
        keywords: ['platelet', 'emergency', 'shock', 'hematocrit', 'ambulance', '108'],
      },
    ],
  },
  {
    id: 'rag-doc-2',
    title: 'WHO Integrated Management of Childhood Illness (IMCI) & Acute Respiratory Protocols',
    sourceOrg: 'WHO',
    documentType: 'International Standard',
    version: '2023.2',
    publicationDate: '2023-08-20',
    totalChunks: 2,
    chunks: [
      {
        id: 'chunk-2-1',
        index: 1,
        content:
          'Cough and cold without fast breathing or chest indrawing constitutes mild upper respiratory infection. Symptomatic home care includes warm saline gargles, honey (for children >1 year), and hydration. Do not prescribe unnecessary broad-spectrum antibiotics.',
        keywords: ['cough', 'cold', 'respiratory', 'antibiotics', 'mild'],
      },
      {
        id: 'chunk-2-2',
        index: 2,
        content:
          'Severe respiratory warning indicators: Inability to drink or breastfeed, stridor in calm child, chest wall indrawing, cyanosis around lips, or respiratory rate >50/min. These require urgent oxygen therapy and emergency referral.',
        keywords: ['stridor', 'breathing difficulty', 'cyanosis', 'oxygen', 'emergency'],
      },
    ],
  },
  {
    id: 'rag-doc-3',
    title: 'MoHFW Operational Guidelines: Prevention and Management of Hypertension & Diabetes at Health and Wellness Centres',
    sourceOrg: 'MoHFW',
    documentType: 'National Guideline',
    version: '2023.1',
    publicationDate: '2023-11-10',
    totalChunks: 2,
    chunks: [
      {
        id: 'chunk-3-1',
        index: 1,
        content:
          'Adults reporting persistent occipital headaches, palpitations, or visual blurriness should have blood pressure checked twice at 5-minute intervals. Stage 1 hypertension (140-159/90-99 mmHg) warrants dietary salt restriction and baseline creatinine check.',
        keywords: ['blood pressure', 'hypertension', 'headache', 'dizziness', 'palpitations'],
      },
      {
        id: 'chunk-3-2',
        index: 2,
        content:
          'Hypertensive emergency: BP >180/120 mmHg associated with chest tightness, shortness of breath, neurological deficit, or altered sensorium is life-threatening. Do not lower BP precipitously; transfer immediately to District Hospital.',
        keywords: ['hypertensive emergency', 'chest tightness', 'shortness of breath', '180/120'],
      },
    ],
  },
];

// 6. Initial Consultations
export const initialConsultations: Consultation[] = [
  {
    id: 'con-101',
    patientId: 'pat-1',
    patientName: 'Rameshwar Sharma',
    age: 48,
    gender: 'Male',
    district: 'Ahmednagar',
    status: 'UNDER_DOCTOR_REVIEW',
    urgencyLevel: 'MODERATE',
    chiefComplaint: '2 days high fever with throbbing headache and body pain.',
    inputChannel: 'VOICE',
    createdAt: '2026-03-24T10:15:00Z',
    symptoms: [
      { name: 'High Fever', severity: 'SEVERE', durationDays: 2 },
      { name: 'Headache', severity: 'MODERATE', durationDays: 2 },
      { name: 'Myalgia (Body Pain)', severity: 'MODERATE', durationDays: 2 },
    ],
    assessment: {
      id: 'ass-101',
      consultationId: 'con-101',
      triageLevel: 'MODERATE',
      possibleConditions: [
        { conditionName: 'Acute Febrile Illness (Suspected Dengue/Malaria)', likelihood: 'Possible', rationale: 'Acute onset high fever with retro-orbital headache and joint pain in rural agricultural setting.' },
        { conditionName: 'Viral Syndromic Infection', likelihood: 'Possible', rationale: 'Generalized myalgia without focal respiratory symptoms.' },
      ],
      primaryExplanation:
        'Reported symptoms indicate an acute febrile episode. Based on ICMR vector-borne disease protocols, monitoring hydration and ruling out mosquito-borne transmission is crucial.',
      riskFactorsIdentified: ['Age > 45', 'Agricultural field exposure', 'Fever duration 48h+'],
      recommendedNextSteps: [
        'Maintain oral hydration with ORS and fluids (2.5 - 3 liters daily).',
        'Take Paracetamol 650mg for high fever if approved by medical officer. Avoid NSAIDs/Brufen.',
        'Visit Rampur PHC for peripheral blood smear and complete blood count (CBC).',
      ],
      followUpQuestions: [
        'Have you noticed any red spots, skin rashes, or bleeding from gums?',
        'Do you feel persistent nausea or severe stomach pain?',
      ],
      sources: [
        {
          id: 'chunk-1-1',
          documentTitle: 'ICMR Standard Treatment Guidelines: Acute Febrile Illness',
          sourceOrg: 'ICMR',
          section: 'Vector Borne Fever Protocol',
          relevanceScore: 0.92,
          citationSnippet: 'In rural endemic districts, fever >48h with headache and body aches must be evaluated for vector transmission.',
        },
      ],
      confidenceScore: 0.88,
    },
    doctorNotes: {
      id: 'doc-note-101',
      consultationId: 'con-101',
      doctorId: 'doc-1',
      doctorName: 'Dr. Anita Deshmukh, MD',
      clinicalObservations: 'Patient alert. Temp 101.4 F, pulse 88 bpm. Mild dehydration signs, no petechiae.',
      agreesWithAITriage: true,
      recommendations: 'Complete Blood Count (CBC) and Rapid Malaria Test ordered at Rampur PHC.',
      prescriptions: [
        { medicineName: 'Tab. Paracetamol', dosage: '650 mg', frequency: 'TDS (Three times daily)', days: 3 },
        { medicineName: 'Oral Rehydration Salts (ORS)', dosage: '1 sachet in 1L water', frequency: 'Sip throughout day', days: 3 },
      ],
      referralFacilityName: 'Rampur Primary Health Centre (PHC)',
      createdAt: '2026-03-24T11:30:00Z',
    },
  },
  {
    id: 'con-102',
    patientId: 'pat-3',
    patientName: 'Anand Jadhav',
    age: 62,
    gender: 'Male',
    district: 'Ahmednagar',
    status: 'ASSESSED',
    urgencyLevel: 'HIGH',
    chiefComplaint: 'Chest heaviness with shortness of breath while walking, history of hypertension.',
    inputChannel: 'TEXT',
    createdAt: '2026-03-25T08:00:00Z',
    symptoms: [
      { name: 'Chest Tightness', severity: 'SEVERE', durationDays: 1, isRedFlag: true },
      { name: 'Shortness of Breath', severity: 'SEVERE', durationDays: 1, isRedFlag: true },
    ],
    assessment: {
      id: 'ass-102',
      consultationId: 'con-102',
      triageLevel: 'HIGH',
      possibleConditions: [
        { conditionName: 'Acute Coronary Syndrome (ACS) / Angina', likelihood: 'Requires Ruling Out', rationale: 'Elderly male with hypertension presenting with exertional chest heaviness.' },
        { conditionName: 'Hypertensive Cardiovascular Strain', likelihood: 'Possible', rationale: 'Known history of hypertension.' },
      ],
      primaryExplanation:
        'Reported symptoms include potential cardiovascular red flags. Immediate electrocardiogram (ECG) and clinical evaluation by a physician is essential.',
      riskFactorsIdentified: ['Age 62', 'Known Hypertension', 'Exertional dyspnea'],
      recommendedNextSteps: [
        'Proceed immediately to Parner CHC or Ahmednagar District Hospital.',
        'Avoid physical exertion or climbing stairs.',
        'If pain radiates to left arm or jaw, dial 108 Emergency Ambulance immediately.',
      ],
      sources: [
        {
          id: 'chunk-3-2',
          documentTitle: 'MoHFW Operational Guidelines: Hypertension Management',
          sourceOrg: 'MoHFW',
          section: 'Acute Cardiovascular Triage',
          relevanceScore: 0.95,
          citationSnippet: 'Chest tightness with breathlessness in hypertensive adults warrants urgent hospital transfer.',
        },
      ],
      confidenceScore: 0.94,
    },
  },
];

// 7. Initial Medical Reports
export const initialReports: MedicalReport[] = [
  {
    id: 'rep-1',
    fileName: 'CBC_Report_Rameshwar_Sharma.pdf',
    fileType: 'application/pdf',
    fileUrl: '/uploads/cbc_rameshwar.pdf',
    uploadedAt: '2026-03-24T09:30:00Z',
    extractedParameters: {
      'Hemoglobin (Hb)': { value: 11.2, unit: 'g/dL', status: 'LOW' },
      'Total WBC Count': { value: 6800, unit: '/cumm', status: 'NORMAL' },
      'Platelet Count': { value: 135000, unit: '/cumm', status: 'LOW' },
      'Packed Cell Volume (PCV)': { value: 36, unit: '%', status: 'NORMAL' },
    },
    interpretation:
      'Mild thrombocytopenia (platelet count 1.35 lakh/cumm) detected alongside mild anemia. Platelet levels should be monitored in light of recent febrile illness.',
    isAbnormal: true,
  },
];

// Active State Management for In-Memory Backend Store
class Store {
  users: User[] = [...initialUsers];
  patients: PatientProfile[] = [...initialPatients];
  doctors: DoctorProfile[] = [...initialDoctors];
  facilities: HealthcareFacility[] = [...initialFacilities];
  ragDocuments: RAGDocument[] = [...initialRAGDocuments];
  consultations: Consultation[] = [...initialConsultations];
  reports: MedicalReport[] = [...initialReports];
  auditLogs: Array<{ id: string; action: string; userId?: string; details: any; timestamp: string }> = [];

  logAudit(action: string, userId?: string, details?: any) {
    this.auditLogs.unshift({
      id: 'audit-' + Date.now(),
      action,
      userId,
      details,
      timestamp: new Date().toISOString(),
    });
  }
}

export const db = new Store();
