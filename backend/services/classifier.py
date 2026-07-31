from core.models_loader import loader
from services.knowledge_base import CATEGORY_ICONS

CATEGORIES = ["Sales", "Marketing", "HR", "Customer Support", "Operations", "Finance"]

KEYWORDS = {
    "Sales": ["lead", "prospect", "crm", "contract", "quote", "deal", "pipeline", "outreach", "revenue", "close"],
    "Marketing": ["campaign", "social media", "ads", "seo", "newsletter", "event", "webinar", "content", "audience", "brand"],
    "HR": ["onboarding", "payroll", "leave", "resume", "interview", "performance", "benefits", "employee", "training", "hiring"],
    "Customer Support": ["ticket", "refund", "complaint", "feedback", "chat", "agent", "resolution", "escalation", "helpdesk", "sla"],
    "Operations": ["inventory", "warehouse", "logistics", "supply chain", "vendor", "quality", "fleet", "dispatch", "manufacturing", "procurement"],
    "Finance": ["invoice", "expense", "reimbursement", "ledger", "reconciliation", "tax", "budget", "audit", "accounts payable", "billing"]
}

def classify_workflow(text: str) -> tuple:
    result = loader.classify(text, CATEGORIES)
    scores = {}
    top_cat = CATEGORIES[0]
    
    if result:
        for label, score in zip(result["labels"], result["scores"]):
            scores[label] = score
        top_cat = result["labels"][0]
    else:
        counts = {cat: 0 for cat in CATEGORIES}
        text_lower = text.lower()
        for cat, words in KEYWORDS.items():
            for w in words:
                counts[cat] += text_lower.count(w)
                
        total = sum(counts.values())
        if total > 0:
            scores = {cat: count / total for cat, count in counts.items()}
            top_cat = max(counts, key=counts.get)
        else:
            scores = {cat: 1.0 / len(CATEGORIES) for cat in CATEGORIES}
            top_cat = "Operations"
            
    return top_cat, scores

def get_category_result(text: str) -> dict:
    top, scores = classify_workflow(text)
    return {
        "top": top,
        "scores": scores,
        "icon": CATEGORY_ICONS.get(top, "⚙️")
    }
