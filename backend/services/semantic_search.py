import numpy as np
from core.models_loader import loader
from services.knowledge_base import WORKFLOW_KB

def semantic_search(query: str, top_k: int = 3) -> list:
    query_emb = loader.embed(query)
    results = []
    
    if query_emb is not None and loader.kb_embeddings is not None:
        similarities = np.dot(loader.kb_embeddings, query_emb) / (np.linalg.norm(loader.kb_embeddings, axis=1) * np.linalg.norm(query_emb))
        top_indices = np.argsort(similarities)[::-1][:top_k]
        
        for idx in top_indices:
            workflow = WORKFLOW_KB[idx].copy()
            workflow["similarity"] = float(similarities[idx])
            workflow["similarity_pct"] = int(workflow["similarity"] * 100)
            results.append(workflow)
    else:
        # Fallback to Jaccard word overlap
        query_words = set(query.lower().split())
        scored_workflows = []
        for kb in WORKFLOW_KB:
            kb_words = set(kb["description"].lower().split())
            intersection = len(query_words & kb_words)
            union = len(query_words | kb_words)
            sim = intersection / union if union > 0 else 0
            scored_workflows.append((sim, kb))
            
        scored_workflows.sort(key=lambda x: x[0], reverse=True)
        for sim, kb in scored_workflows[:top_k]:
            workflow = kb.copy()
            workflow["similarity"] = sim
            workflow["similarity_pct"] = int(sim * 100)
            results.append(workflow)
            
    return results
