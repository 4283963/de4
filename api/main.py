import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routers.booths import router as booths_router
from routers.traffic import router as traffic_router

app = FastAPI(title="Exhibition Digital Twin API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    init_db()


@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Exhibition Digital Twin API is running"}


app.include_router(booths_router, prefix="/api/booths", tags=["booths"])
app.include_router(traffic_router, prefix="/api/traffic", tags=["traffic"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
