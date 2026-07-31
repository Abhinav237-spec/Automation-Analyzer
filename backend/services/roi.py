HOURLY_RATE = 50.0

SAVINGS_MAP = {
    "repetitive_tasks": {"hrs": 2.5, "label": "Eliminating repetitive steps"},
    "manual_operations": {"hrs": 3.0, "label": "Automating manual operations"},
    "approval_bottlenecks": {"hrs": 4.0, "label": "Streamlining approvals"},
    "communication_delays": {"hrs": 1.5, "label": "Reducing communication delays"},
    "data_entry_tasks": {"hrs": 2.0, "label": "Automating data entry"}
}

def estimate_roi(detections: list, scores: dict) -> dict:
    weekly_hours_saved = 0.0
    breakdown = []
    
    automation_multiplier = 0.5 + (scores["automation"] / 100.0)
    
    for d in detections:
        key = d["key"]
        count = d["count"]
        if key in SAVINGS_MAP:
            hrs = SAVINGS_MAP[key]["hrs"] * count * automation_multiplier
            weekly_hours_saved += hrs
            breakdown.append(f"{SAVINGS_MAP[key]['label']}: ~{hrs:.1f} hrs/week")
            
    if weekly_hours_saved == 0:
        weekly_hours_saved = 2.0
        breakdown.append("Baseline automation savings: ~2.0 hrs/week")
        
    monthly_hours_saved = weekly_hours_saved * 4.33
    annual_hours_saved = weekly_hours_saved * 52
    annual_cost_saved_usd = annual_hours_saved * HOURLY_RATE
    
    impl_weeks = max(2, round((scores["automation"] / 10.0 * 8.0) / 40.0))
    implementation_cost = impl_weeks * 40 * 100  # Assume $100/hr for devs
    
    breakeven_months = (implementation_cost / (annual_cost_saved_usd / 12)) if annual_cost_saved_usd > 0 else 0
    
    return {
        "weekly_hours_saved": round(weekly_hours_saved, 1),
        "monthly_hours_saved": round(monthly_hours_saved, 1),
        "annual_hours_saved": round(annual_hours_saved, 1),
        "annual_cost_saved_usd": round(annual_cost_saved_usd, 2),
        "implementation_weeks": impl_weeks,
        "implementation_cost": implementation_cost,
        "breakeven_months": round(breakeven_months, 1),
        "breakdown": breakdown
    }
