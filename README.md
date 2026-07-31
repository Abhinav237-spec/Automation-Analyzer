# Autopsy AI v3 — Process Intelligence Platform

Autopsy AI is an intelligent process analysis platform designed to take manual, text-based workflow descriptions and automatically analyze them for automation potential, ROI, and strategic bottlenecks.

## Hugging Face Integration

This platform heavily leverages **Hugging Face** models running completely locally on the Python backend for Explainable AI (XAI) capabilities:
1. **Semantic Search (`sentence-transformers`)**: Uses the `all-MiniLM-L6-v2` model to encode workflows into dense vector embeddings. This allows the system to semantically match your workflow against an internal knowledge base of known processes, regardless of exact keyword matches.
2. **Zero-Shot Classification (`transformers`)**: Uses the `facebook/bart-large-mnli` model to automatically categorize your workflow into departments (e.g., Sales, Marketing, HR, Finance) without needing any labeled training data.

## Tech Stack

* **Backend**: FastAPI (Python), Hugging Face Transformers, Sentence Transformers, NVIDIA NIM API (Meta Llama 3.1 70B)
* **Frontend**: React, Vite, Recharts, Vanilla CSS with custom CSS variables

## Running the Application

### 1. Backend Setup
Open a terminal and navigate to the backend directory:
```bash
cd backend
cp .env.example .env
pip install -r requirements.txt
python main.py
```
*Note: The first time you run the backend, it will download approximately 500MB of Hugging Face models. These will be cached for future runs.*

### 2. Frontend Setup
Open a second terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```

### 3. Usage
Visit [http://localhost:5173](http://localhost:5173) in your browser.
You can use the NVIDIA NIM integration for advanced Llama 3.1 70B analysis by providing a free API key from [build.nvidia.com](https://build.nvidia.com) in the sidebar.
