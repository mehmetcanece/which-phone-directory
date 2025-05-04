from fastapi import FastAPI
from app.routers import home, recognition, filter_criteria

app = FastAPI(title="Which Phone Backend")

app.include_router(home.router)
app.include_router(recognition.router)
app.include_router(filter_criteria.router)