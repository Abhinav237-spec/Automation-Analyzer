from fastapi import APIRouter
from models.schemas import SearchRequest, SearchResponse
from services.semantic_search import semantic_search

router = APIRouter()

@router.post("/search", response_model=SearchResponse)
def search(request: SearchRequest):
    results = semantic_search(request.query, top_k=request.top_k)
    return SearchResponse(query=request.query, results=results)
