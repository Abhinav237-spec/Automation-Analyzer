from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from core.models_loader import loader
from routers import health, search, analyze
import uvicorn

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Initializing models...")
    await loader.initialize()
    print("Models ready.")
    yield
    print("Shutting down.")

app = FastAPI(title="Autopsy AI v3 API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(search.router, prefix="/api", tags=["search"])
app.include_router(analyze.router, prefix="/api", tags=["analyze"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
