"""
RuralCare AI — Core Settings & Configuration Module
"""

import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "RuralCare AI"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql://ruralcare_user:ruralcare_secure_pass@localhost:5432/ruralcare_db"
    )
    
    # Security
    JWT_SECRET: str = os.getenv("JWT_SECRET", "ruralcare_insecure_jwt_dev_secret")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours
    
    # AI & RAG
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
    VECTOR_DB_PATH: str = os.getenv("VECTOR_DB_PATH", "./backend/data/vector_store")
    
    # Emergency Hotline Defaults
    AMBULANCE_HOTLINE: str = "108"
    UNIFIED_EMERGENCY: str = "112"
    HEALTH_LINE: str = "104"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
