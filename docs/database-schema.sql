-- =====================================================================
-- RuralCare AI — PostgreSQL Production Database Schema
-- Academic Project: Final Year B.E. Information Technology Capstone
-- =====================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE user_role AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN');
CREATE TYPE triage_urgency AS ENUM ('LOW', 'MODERATE', 'HIGH', 'EMERGENCY');
CREATE TYPE consultation_status AS ENUM ('PENDING_TRIAGE', 'ASSESSED', 'UNDER_DOCTOR_REVIEW', 'COMPLETED');
CREATE TYPE facility_type AS ENUM ('PHC', 'CHC', 'DISTRICT_HOSPITAL', 'SUB_CENTRE', 'COMMUNITY_CLINIC', 'PHARMACY');

-- 1. Users Table (Core Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'PATIENT',
    phone_number VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Patient Profiles
CREATE TABLE patient_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    age INT CHECK (age >= 0 AND age <= 130),
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    village_town VARCHAR(120),
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10),
    preferred_language VARCHAR(50) DEFAULT 'English',
    emergency_contact_name VARCHAR(150),
    emergency_contact_phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Doctor Profiles
CREATE TABLE doctor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    qualification VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    hospital_affiliation VARCHAR(200),
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    years_of_experience INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Patient Medical History, Allergies & Medications
CREATE TABLE medical_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient_profiles(id) ON DELETE CASCADE,
    condition_name VARCHAR(200) NOT NULL,
    diagnosed_year INT,
    status VARCHAR(50) DEFAULT 'Ongoing',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE allergies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient_profiles(id) ON DELETE CASCADE,
    allergen VARCHAR(150) NOT NULL,
    severity VARCHAR(50) DEFAULT 'Moderate',
    reaction TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient_profiles(id) ON DELETE CASCADE,
    medication_name VARCHAR(200) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100),
    prescribed_for VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Healthcare Facilities (PHCs, CHCs, Hospitals)
CREATE TABLE healthcare_facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    facility_type facility_type NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    pincode VARCHAR(10),
    contact_phone VARCHAR(20),
    emergency_available BOOLEAN DEFAULT FALSE,
    bed_count INT DEFAULT 0,
    services_offered JSONB DEFAULT '[]',
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    operating_hours VARCHAR(100) DEFAULT '24/7'
);

-- 6. Consultations (Sessions)
CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient_profiles(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctor_profiles(id) ON DELETE SET NULL,
    status consultation_status DEFAULT 'PENDING_TRIAGE',
    urgency_level triage_urgency DEFAULT 'LOW',
    chief_complaint TEXT NOT NULL,
    input_channel VARCHAR(30) DEFAULT 'TEXT', -- TEXT, VOICE, MULTIMODAL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Symptoms
CREATE TABLE symptoms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consultation_id UUID REFERENCES consultations(id) ON DELETE CASCADE,
    symptom_name VARCHAR(150) NOT NULL,
    severity VARCHAR(50),
    duration_days INT,
    body_part VARCHAR(100),
    is_red_flag BOOLEAN DEFAULT FALSE
);

-- 8. AI Predictions & Explanations
CREATE TABLE ai_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consultation_id UUID UNIQUE REFERENCES consultations(id) ON DELETE CASCADE,
    triage_level triage_urgency NOT NULL,
    possible_conditions JSONB NOT NULL,       -- Array of {condition, probability, rationale}
    primary_explanation TEXT NOT NULL,
    risk_factors_identified JSONB NOT NULL,
    recommended_next_steps JSONB NOT NULL,
    emergency_warnings JSONB,
    model_version VARCHAR(50) DEFAULT 'gemini-2.5-flash-rag',
    confidence_score DECIMAL(4, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Follow Up Questions
CREATE TABLE follow_up_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES ai_assessments(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    category VARCHAR(100),
    patient_response TEXT,
    answered_at TIMESTAMP WITH TIME ZONE
);

-- 10. Medical Reports & OCR Analysis
CREATE TABLE medical_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient_profiles(id) ON DELETE CASCADE,
    consultation_id UUID REFERENCES consultations(id) ON DELETE SET NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_url TEXT NOT NULL,
    raw_ocr_text TEXT,
    extracted_parameters JSONB DEFAULT '{}', -- e.g. {"Hemoglobin": {"value": 10.2, "unit": "g/dL", "status": "LOW"}}
    ai_interpretation TEXT,
    is_abnormal BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. RAG Knowledge Base Documents & Chunks
CREATE TABLE rag_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    source_organization VARCHAR(150) NOT NULL, -- 'WHO', 'ICMR', 'MoHFW'
    document_type VARCHAR(100),
    version VARCHAR(50),
    publication_date DATE,
    source_url TEXT,
    file_hash VARCHAR(128),
    total_chunks INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rag_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES rag_documents(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    embedding VECTOR(768) -- Support for pgvector
);

-- 12. Consultation Source Citations
CREATE TABLE consultation_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consultation_id UUID REFERENCES consultations(id) ON DELETE CASCADE,
    chunk_id UUID REFERENCES rag_chunks(id) ON DELETE CASCADE,
    relevance_score DECIMAL(5, 4),
    citation_snippet TEXT
);

-- 13. Doctor Notes & Overrides
CREATE TABLE doctor_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consultation_id UUID REFERENCES consultations(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctor_profiles(id) ON DELETE CASCADE,
    clinical_observations TEXT NOT NULL,
    agrees_with_ai_triage BOOLEAN DEFAULT TRUE,
    doctor_triage_override triage_urgency,
    doctor_recommendations TEXT NOT NULL,
    prescriptions JSONB DEFAULT '[]',
    referral_facility_id UUID REFERENCES healthcare_facilities(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Audit Logs (Compliance & Clinical Governance)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    ip_address VARCHAR(45),
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Fast Querying in Low-Bandwidth Environments
CREATE INDEX idx_consultations_patient ON consultations(patient_id);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_symptoms_consultation ON symptoms(consultation_id);
CREATE INDEX idx_facilities_district ON healthcare_facilities(district, state);
CREATE INDEX idx_facilities_type ON healthcare_facilities(facility_type);
CREATE INDEX idx_rag_chunks_doc ON rag_chunks(document_id);
