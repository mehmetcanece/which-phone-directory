from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from backend.app.routers import home, recognition, filter_criteria
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

app = FastAPI(
    title="Which Phone API",
    description="Brand recognition and phone recommendation backend",
    version="1.0.0" 
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home.router)
app.include_router(recognition.router)
app.include_router(filter_criteria.router)

@app.get("/")
def read_root():
    return {"message": "Backend is working."}