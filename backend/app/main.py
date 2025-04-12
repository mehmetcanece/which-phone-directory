from fastapi import FastAPI
from app.routers import home, brand_detector, phone_list

app = FastAPI()

app.include_router(home.router)
app.include_router(brand_detector.router)