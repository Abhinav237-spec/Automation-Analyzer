from fastapi import APIRouter
from core.models_loader import loader

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "models_ready": loader.ready,
        "sentence_transformer": loader.sentence_transformer is not None,
        "classifier": loader.classifier_pipeline is not None,
        "kb_embeddings": loader.kb_embeddings is not None
    }
