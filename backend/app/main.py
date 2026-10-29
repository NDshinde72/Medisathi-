"""
RuralCare AI — FastAPI Application Entry Point
Academic Project: Final Year B.E. Information Technology Capstone
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="RuralCare AI — Clinical Decision Support API",
    description="Backend API powering AI triage, WHO/ICMR RAG guidance, report OCR, and clinician review workflows.",
    version="1.0.0",
)

# Cross-Origin Resource Sharing (CORS) Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "RuralCare AI Backend",
        "version": "1.0.0",
        "triage_safety_engine": "active",
        "rag_retrieval_status": "ready"
    }
