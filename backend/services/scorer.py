import re

PATTERNS = {
    "repetitive_tasks": {
        "icon": "🔄",
        "label": "Repetitive Tasks",
        "regexes": [r"(?i)repetitive", r"(?i)over and over", r"(?i)routine", r"(?i)every (day|week|month)", r"(?i)recurring", r"(?i)same process", r"(?i)duplicate effort", r"(?i)redundant"],
        "savings_per_instance": 2.5,
        "complexity_weight": 5,
        "automation_weight": 15
    },
    "manual_operations": {
        "icon": "✋",
        "label": "Manual Operations",
        "regexes": [r"(?i)manually", r"(?i)by hand", r"(?i)copy and paste", r"(?i)copying", r"(?i)typing", r"(?i)data entry", r"(?i)export", r"(?i)import"],
        "savings_per_instance": 3.0,
        "complexity_weight": 10,
        "automation_weight": 20
    },
    "approval_bottlenecks": {
        "icon": "⏳",
        "label": "Approval Bottlenecks",
        "regexes": [r"(?i)wait for approval", r"(?i)bottleneck", r"(?i)pending", r"(?i)manager approval", r"(?i)sign off", r"(?i)review by", r"(?i)stuck", r"(?i)delayed"],
        "savings_per_instance": 4.0,
        "complexity_weight": 15,
        "automation_weight": 10
    },
    "communication_delays": {
        "icon": "📧",
        "label": "Communication Delays",
        "regexes": [r"(?i)email back and forth", r"(?i)chasing", r"(?i)follow up", r"(?i)reply", r"(?i)send an email to", r"(?i)message someone", r"(?i)call them", r"(?i)notify"],
        "savings_per_instance": 1.5,
        "complexity_weight": 5,
        "automation_weight": 10
    },
    "data_entry_tasks": {
        "icon": "📝",
        "label": "Data Entry Tasks",
        "regexes": [r"(?i)spreadsheet", r"(?i)excel", r"(?i)csv", r"(?i)input data", r"(?i)update the system", r"(?i)enter into", r"(?i)fill out", r"(?i)form"],
        "savings_per_instance": 2.0,
        "complexity_weight": 8,
        "automation_weight": 18
    }
}

def detect_patterns(text: str) -> list:
    detections = []
    for key, p in PATTERNS.items():
        snippets = []
        count = 0
        for regex in p["regexes"]:
            for match in re.finditer(regex, text):
                count += 1
                start = max(0, match.start() - 30)
                end = min(len(text), match.end() + 30)
                snippets.append("..." + text[start:end].strip() + "...")
        if count > 0:
            detections.append({
                "key": key,
                "label": p["label"],
                "icon": p["icon"],
                "count": count,
                "snippets": list(set(snippets))[:3]
            })
    return detections

def compute_scores(text: str, detections: list) -> dict:
    auto_score = 0
    comp_score = 0
    fric_score = 0
    
    for d in detections:
        key = d["key"]
        p = PATTERNS[key]
        auto_score += d["count"] * p["automation_weight"]
        comp_score += d["count"] * p["complexity_weight"]
        fric_score += d["count"] * 5
        
    word_count = len(text.split())
    comp_score += word_count // 40
    
    automation = max(10, min(95, auto_score))
    complexity = max(10, min(95, comp_score))
    efficiency = max(10, min(90, 90 - fric_score))
    
    return {
        "automation": automation,
        "complexity": complexity,
        "efficiency": efficiency
    }
