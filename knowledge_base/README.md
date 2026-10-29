# RuralCare AI — Medical Knowledge Base Repository

This directory contains authoritative clinical documents, clinical management protocols, and primary healthcare standard operating procedures (SOPs) utilized by the **Retrieval-Augmented Generation (RAG)** pipeline.

### Grounding Sources:
1. **World Health Organization (WHO)**
   - Integrated Management of Childhood Illness (IMCI)
   - WHO Guidelines on Maternal and Neonatal Care
   - Essential Medicines List and Dosage Standards
2. **Indian Council of Medical Research (ICMR)**
   - Standard Treatment Guidelines (STGs) for Primary Health Centres (PHCs)
   - Clinical Management Protocols for Vector-Borne Diseases (Malaria, Dengue, Chikungunya)
   - Management Guidelines for Type 2 Diabetes and Hypertension in Rural Settings
3. **Ministry of Health and Family Welfare (MoHFW), Govt of India**
   - National Health Mission (NHM) Operational Guidelines for Sub-Centres and PHCs
   - Telemedicine Practice Guidelines

### Ingestion Pipeline:
- Documents placed in this folder (`.pdf`, `.txt`, `.docx`) are parsed via `backend/app/rag/ingestion.py`.
- Text is cleaned, chunked into 500-token windows with 50-token overlap, embedded using `sentence-transformers`, and indexed in FAISS / `pgvector`.
