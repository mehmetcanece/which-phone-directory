from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # CORS import
from app.routers import home, recognition, filter_criteria

app = FastAPI(title="Which Phone Backend")

# CORS ayarı react için localhost:3000'e izin verir
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # gerekirse * ile tüm hepsine izin veririz
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router'lar
app.include_router(home.router)
app.include_router(recognition.router)
app.include_router(filter_criteria.router)

@app.get("/")
def read_root():
    return {"message": "Backend is working."}