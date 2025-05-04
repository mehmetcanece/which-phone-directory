from fastapi import APIRouter

router = APIRouter()

@router.get("/home")
def home_info():
    return {
    }