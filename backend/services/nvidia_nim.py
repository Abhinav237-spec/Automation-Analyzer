import httpx
from core.config import settings

async def call_nvidia_nim(workflow: str, category: str, scores: dict, similar: list, api_key: str) -> dict:
    if not api_key:
        return {"available": False, "error": "No API key provided"}
        
    prompt = f"""
    Analyze this {category} workflow for automation potential.
    
    Workflow:
    {workflow}
    
    Scores: Complexity {scores['complexity']}, Automation {scores['automation']}, Efficiency {scores['efficiency']}
    
    Please provide your analysis strictly in the following format with these exact markdown headings:
    
    # recommendations
    (Provide 3 strategic automation recommendations here)
    
    # bottlenecks
    (Identify the main bottlenecks)
    
    # roadmap
    (Provide a short implementation roadmap)
    
    # executive_summary
    (Provide a 2-sentence executive summary)
    """
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
            payload = {
                "model": settings.nvidia_model,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.3,
                "max_tokens": 2048
            }
            response = await client.post(f"{settings.nvidia_base_url}/chat/completions", json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            
            # Parse response
            sections = {
                "recommendations": None,
                "bottlenecks": None,
                "roadmap": None,
                "executive_summary": None
            }
            
            import re
            parts = re.split(r'#\s*(recommendations|bottlenecks|roadmap|executive_summary)', content, flags=re.IGNORECASE)
            
            current_section = None
            for part in parts:
                part_lower = part.strip().lower()
                if part_lower in sections:
                    current_section = part_lower
                elif current_section:
                    sections[current_section] = part.strip()
                    
            return {
                "available": True,
                **sections
            }
    except Exception as e:
        return {"available": False, "error": str(e)}
