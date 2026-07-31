CATEGORY_ICONS = {
    "Customer Support": "🎧",
    "Sales": "📈",
    "HR": "👥",
    "Marketing": "🎯",
    "Finance": "💰",
    "Operations": "⚙️"
}

WORKFLOW_KB = [
    {
        "id": "CS-001",
        "name": "Ticket Triage",
        "category": "Customer Support",
        "description": "Agents manually read incoming emails, categorize them based on content, and assign them to the correct department. This process is slow and prone to errors.",
        "automation_tips": ["Use NLP to categorize tickets", "Automate routing rules", "Implement auto-responses for common queries"]
    },
    {
        "id": "CS-002",
        "name": "Customer Onboarding",
        "category": "Customer Support",
        "description": "New customers are sent a series of emails with manual follow-ups to ensure they complete their setup. Support agents spend hours tracking progress in a spreadsheet.",
        "automation_tips": ["Set up an email drip campaign", "Use a CRM to track milestones", "Automate check-in messages"]
    },
    {
        "id": "CS-003",
        "name": "Refund Processing",
        "category": "Customer Support",
        "description": "Customers request refunds via email. Agents manually verify the order, calculate the refund amount, and submit a request to finance for approval.",
        "automation_tips": ["Automate policy checks", "Integrate CRM with billing system", "Enable self-service refunds for eligible orders"]
    },
    {
        "id": "CS-004",
        "name": "Feedback Collection",
        "category": "Customer Support",
        "description": "Agents manually send surveys to customers after resolving an issue, then compile the results into a weekly report.",
        "automation_tips": ["Trigger surveys automatically upon ticket closure", "Use sentiment analysis on responses", "Generate reports automatically"]
    },
    {
        "id": "SA-001",
        "name": "Lead Qualification",
        "category": "Sales",
        "description": "Sales reps manually review leads from marketing campaigns, research their company size, and decide if they are worth pursuing.",
        "automation_tips": ["Use lead scoring models", "Automate data enrichment", "Route qualified leads automatically"]
    },
    {
        "id": "SA-002",
        "name": "Contract Generation",
        "category": "Sales",
        "description": "Sales reps manually copy data from the CRM into a Word document to generate a contract, then email it to the prospect for signature.",
        "automation_tips": ["Use document generation tools", "Integrate e-signature platforms", "Automate CRM updates upon signature"]
    },
    {
        "id": "SA-003",
        "name": "Follow-up Emails",
        "category": "Sales",
        "description": "Reps manually track when to follow up with prospects and send personalized emails one by one.",
        "automation_tips": ["Create automated outreach sequences", "Use templates with dynamic fields", "Set up task reminders"]
    },
    {
        "id": "SA-004",
        "name": "Sales Reporting",
        "category": "Sales",
        "description": "Managers manually export data from the CRM to Excel every week to create performance reports for the team.",
        "automation_tips": ["Build live dashboards", "Automate weekly report emails", "Use CRM built-in analytics"]
    },
    {
        "id": "HR-001",
        "name": "Employee Onboarding",
        "category": "HR",
        "description": "HR manually sends welcome emails, schedules training sessions, and requests IT to set up accounts for new hires.",
        "automation_tips": ["Automate the welcome sequence", "Use an onboarding portal", "Trigger IT provisioning workflows"]
    },
    {
        "id": "HR-002",
        "name": "Leave Approval",
        "category": "HR",
        "description": "Employees email managers to request time off. Managers forward the approval to HR, who manually updates the payroll system.",
        "automation_tips": ["Implement an HRIS self-service portal", "Automate approval routing", "Sync directly with payroll"]
    },
    {
        "id": "HR-003",
        "name": "Resume Screening",
        "category": "HR",
        "description": "Recruiters manually read hundreds of resumes to find candidates with the right skills and experience for open roles.",
        "automation_tips": ["Use ATS keyword parsing", "Implement AI-driven screening", "Automate rejection emails for unqualified applicants"]
    },
    {
        "id": "HR-004",
        "name": "Performance Reviews",
        "category": "HR",
        "description": "HR manually sends forms to managers and employees, tracks completion status in a spreadsheet, and compiles the final scores.",
        "automation_tips": ["Use performance management software", "Automate reminder notifications", "Generate aggregated reports"]
    },
    {
        "id": "MK-001",
        "name": "Social Media Posting",
        "category": "Marketing",
        "description": "Marketers manually log into different social platforms every day to post content and reply to comments.",
        "automation_tips": ["Use a social media scheduling tool", "Automate cross-posting", "Set up keyword alerts"]
    },
    {
        "id": "MK-002",
        "name": "Campaign Analytics",
        "category": "Marketing",
        "description": "Marketing team manually downloads data from Google Analytics, Facebook Ads, and email tools to create a monthly performance report.",
        "automation_tips": ["Use a data integration platform", "Build unified BI dashboards", "Automate KPI alerts"]
    },
    {
        "id": "MK-003",
        "name": "Newsletter Curation",
        "category": "Marketing",
        "description": "Marketers manually search for industry news, write summaries, and format them into an email template every week.",
        "automation_tips": ["Use RSS feeds to aggregate content", "Automate template population", "Use AI to summarize articles"]
    },
    {
        "id": "MK-004",
        "name": "Event Registration",
        "category": "Marketing",
        "description": "Attendees sign up via a form. Marketers manually add them to the CRM, send confirmation emails, and create name badges.",
        "automation_tips": ["Integrate form directly to CRM", "Automate confirmation and reminder emails", "Use event management software"]
    },
    {
        "id": "FI-001",
        "name": "Invoice Processing",
        "category": "Finance",
        "description": "Accounts payable receives invoices via email, manually enters the details into the accounting system, and routes them for manager approval.",
        "automation_tips": ["Implement OCR for data extraction", "Automate approval workflows based on amount", "Integrate email parsing"]
    },
    {
        "id": "FI-002",
        "name": "Expense Reimbursement",
        "category": "Finance",
        "description": "Employees submit physical receipts or PDFs. Finance manually reviews them against policy and enters the data for payout.",
        "automation_tips": ["Use mobile expense apps with OCR", "Automate policy violation flags", "Direct integration with payroll"]
    },
    {
        "id": "FI-003",
        "name": "Month-End Close",
        "category": "Finance",
        "description": "Finance team manually reconciles bank statements with ledger entries in Excel, searching for discrepancies row by row.",
        "automation_tips": ["Use automated bank feeds", "Implement auto-matching rules", "Standardize reconciliation templates"]
    },
    {
        "id": "FI-004",
        "name": "Payroll Processing",
        "category": "Finance",
        "description": "HR sends timesheets to finance, who manually calculates overtime and tax deductions before entering into the payroll portal.",
        "automation_tips": ["Integrate time tracking with payroll", "Automate tax calculations", "Enable employee self-service for tax forms"]
    },
    {
        "id": "OP-001",
        "name": "Inventory Management",
        "category": "Operations",
        "description": "Warehouse staff manually count stock levels and update a spreadsheet, then email purchasing when items are running low.",
        "automation_tips": ["Implement barcode scanning", "Set up automated reorder points", "Integrate WMS with ERP"]
    },
    {
        "id": "OP-002",
        "name": "Vendor Onboarding",
        "category": "Operations",
        "description": "Operations team emails PDFs to new vendors, waits for them to be filled out, and manually types the info into the system.",
        "automation_tips": ["Use digital vendor portals", "Automate compliance checks", "Standardize digital forms"]
    },
    {
        "id": "OP-003",
        "name": "Quality Assurance",
        "category": "Operations",
        "description": "Inspectors fill out paper forms on the manufacturing floor, which are later typed into the database by an admin.",
        "automation_tips": ["Deploy mobile inspection apps", "Automate alert routing for defects", "Generate real-time QA dashboards"]
    },
    {
        "id": "OP-004",
        "name": "Fleet Scheduling",
        "category": "Operations",
        "description": "Dispatchers manually assign drivers to routes using a whiteboard and call them one by one to confirm their schedule.",
        "automation_tips": ["Use route optimization software", "Automate driver notifications via SMS", "Implement GPS tracking integrations"]
    }
]
