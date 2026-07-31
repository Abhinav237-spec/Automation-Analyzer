from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class AnalyzeRequest(BaseModel):
    workflow: str = Field(..., min_length=20)
    nvidia_api_key: str = ""
    use_nim: bool = True

class Scores(BaseModel):
    complexity: int
    automation: int
    efficiency: int

class DetectedPattern(BaseModel):
    key: str
    label: str
    icon: str
    count: int
    snippets: List[str]

class SimilarWorkflow(BaseModel):
    id: str
    name: str
    category: str
    description: str
    similarity: float
    similarity_pct: int
    automation_tips: List[str]

class ROIData(BaseModel):
    weekly_hours_saved: float
    monthly_hours_saved: float
    annual_hours_saved: float
    annual_cost_saved_usd: float
    implementation_weeks: int
    implementation_cost: float
    breakeven_months: Any
    breakdown: List[str]

class Recommendation(BaseModel):
    title: str
    why: str
    impact: str
    implementation: str
    confidence: float
    confidence_pct: int
    effort: str

class NIMResult(BaseModel):
    available: bool
    recommendations: Optional[str] = None
    bottlenecks: Optional[str] = None
    roadmap: Optional[str] = None
    executive_summary: Optional[str] = None
    error: Optional[str] = None

class CategoryResult(BaseModel):
    top: str
    scores: Dict[str, float]
    icon: str

class AnalyzeResponse(BaseModel):
    workflow_text: str
    word_count: int
    step_estimate: int
    scores: Scores
    detections: List[DetectedPattern]
    category: CategoryResult
    similar_workflows: List[SimilarWorkflow]
    roi: ROIData
    recommendations: List[Recommendation]
    nim: NIMResult
    processed_at: str

class SearchRequest(BaseModel):
    query: str = Field(..., min_length=5)
    top_k: int = 5

class SearchResponse(BaseModel):
    query: str
    results: List[SimilarWorkflow]
