TEMPLATES = [
    {
        "trigger": "repetitive_tasks",
        "min": 1,
        "title": "Implement RPA for Repetitive Actions",
        "why": "Detected {n} instances of repetitive tasks that require no decision-making.",
        "impact": "Reduces manual effort and eliminates human error.",
        "implementation": "Deploy a simple RPA bot or write a script to handle these recurring actions automatically.",
        "confidence": 0.85,
        "effort": "Medium"
    },
    {
        "trigger": "manual_operations",
        "min": 1,
        "title": "Automate Manual Data Transfers",
        "why": "Found {n} manual operations like copy-pasting or file exports.",
        "impact": "Significant time savings and reduced data inconsistency.",
        "implementation": "Use API integrations or middleware tools like Zapier/Make to sync data directly between systems.",
        "confidence": 0.90,
        "effort": "Low"
    },
    {
        "trigger": "approval_bottlenecks",
        "min": 1,
        "title": "Deploy Smart Routing for Approvals",
        "why": "Identified {n} points where the process stops waiting for human approval.",
        "impact": "Decreases cycle time drastically by removing idle waiting periods.",
        "implementation": "Create an automated rules engine to auto-approve standard requests and only escalate exceptions.",
        "confidence": 0.80,
        "effort": "Medium"
    },
    {
        "trigger": "communication_delays",
        "min": 1,
        "title": "Automate Notifications and Follow-ups",
        "why": "Spotted {n} mentions of manual emails, follow-ups, or messaging.",
        "impact": "Improves response times and ensures no tasks are forgotten.",
        "implementation": "Set up triggered emails or Slack/Teams notifications based on status changes in your core system.",
        "confidence": 0.95,
        "effort": "Low"
    },
    {
        "trigger": "data_entry_tasks",
        "min": 1,
        "title": "Digitize and Extract Data Automatically",
        "why": "Highlighted {n} manual data entry or form-filling steps.",
        "impact": "Frees up staff for higher-value work and accelerates processing.",
        "implementation": "Implement OCR for documents or webhooks for digital forms to ingest data without typing.",
        "confidence": 0.88,
        "effort": "High"
    }
]

CATEGORY_RECS = {
    "Customer Support": {
        "title": "Deploy AI Triage & Self-Service",
        "why": "Customer support workflows benefit highly from intent recognition.",
        "impact": "Deflects up to 40% of tier-1 tickets.",
        "implementation": "Train an NLP model on historical tickets to auto-categorize and suggest help articles.",
        "confidence": 0.92,
        "effort": "High"
    },
    "Sales": {
        "title": "Automate Lead Scoring & Routing",
        "why": "Sales processes often have leaks due to delayed follow-ups on hot leads.",
        "impact": "Increases conversion rates by reaching prospects faster.",
        "implementation": "Implement a predictive lead scoring model that triggers instant routing and outreach.",
        "confidence": 0.87,
        "effort": "Medium"
    },
    "HR": {
        "title": "Implement an Employee Self-Service Hub",
        "why": "HR spends excessive time answering policy questions and handling simple updates.",
        "impact": "Reduces HR administrative burden significantly.",
        "implementation": "Create an internal portal with an AI chatbot connected to the employee handbook and HRIS.",
        "confidence": 0.89,
        "effort": "Medium"
    },
    "Marketing": {
        "title": "Centralize Campaign Analytics",
        "why": "Marketing workflows often involve pulling data from siloed ad platforms.",
        "impact": "Enables real-time optimization instead of retrospective reporting.",
        "implementation": "Use an ETL tool to pipe all platform data into a central warehouse and visualize with BI.",
        "confidence": 0.91,
        "effort": "Medium"
    },
    "Operations": {
        "title": "Implement Event-Driven Supply Chain Alerts",
        "why": "Operations rely on timely information about inventory and logistics.",
        "impact": "Prevents stockouts and production delays.",
        "implementation": "Connect IoT sensors or partner APIs to trigger automated alerts when thresholds are breached.",
        "confidence": 0.85,
        "effort": "High"
    },
    "Finance": {
        "title": "Automate Invoice Processing with OCR",
        "why": "Finance teams spend days manually keying in invoice details.",
        "impact": "Reduces processing cost per invoice by up to 80%.",
        "implementation": "Deploy an intelligent document processing (IDP) solution connected directly to the ERP.",
        "confidence": 0.94,
        "effort": "High"
    }
}

def generate_recommendations(detections: list, scores: dict, category: str) -> list:
    recs = []
    det_map = {d["key"]: d["count"] for d in detections}
    
    for t in TEMPLATES:
        count = det_map.get(t["trigger"], 0)
        if count >= t["min"]:
            rec = t.copy()
            rec["why"] = rec["why"].format(n=count)
            del rec["trigger"]
            del rec["min"]
            rec["confidence_pct"] = int(rec["confidence"] * 100)
            recs.append(rec)
            
    if category in CATEGORY_RECS:
        cat_rec = CATEGORY_RECS[category].copy()
        cat_rec["confidence_pct"] = int(cat_rec["confidence"] * 100)
        recs.append(cat_rec)
        
    recs.sort(key=lambda x: x["confidence"], reverse=True)
    return recs[:6]
