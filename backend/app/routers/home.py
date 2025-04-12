from fastapi import APIRouter

router = APIRouter()

@router.get("/home")
def read_home():
    return {
    }