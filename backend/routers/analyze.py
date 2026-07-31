from fastapi import APIRouter
from datetime import datetime
from models.schemas import AnalyzeRequest, AnalyzeResponse, Scores
from services.scorer import detect_patterns, compute_scores
from services.classifier import get_category_result
from services.semantic_search import semantic_search
from services.roi import estimate_roi
from services.explainer import generate_recommendations
from services.nvidia_nim import call_nvidia_nim

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    text = request.workflow
    word_count = len(text.split())
    step_estimate = max(3, word_count // 15)
    
    detections = detect_patterns(text)
    scores_dict = compute_scores(text, detections)
    scores = Scores(**scores_dict)
    
    category = get_category_result(text)
    similar_workflows = semantic_search(text, top_k=3)
    
    roi = estimate_roi(detections, scores_dict)
    recommendations = generate_recommendations(detections, scores_dict, category["top"])
    
    nim_result = {"available": False}
    if request.use_nim and request.nvidia_api_key:
        nim_result = await call_nvidia_nim(
            text, 
            category["top"], 
            scores_dict, 
            similar_workflows, 
            request.nvidia_api_key
        )
        
    return AnalyzeResponse(
        workflow_text=text,
        word_count=word_count,
        step_estimate=step_estimate,
        scores=scores,
        detections=detections,
        category=category,
        similar_workflows=similar_workflows,
        roi=roi,
        recommendations=recommendations,
        nim=nim_result,
        processed_at=datetime.utcnow().isoformat()
    )
