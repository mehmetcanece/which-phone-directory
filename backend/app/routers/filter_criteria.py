from fastapi import APIRouter
from app.models.request_models import PhoneFilterRequest
from app.services.filter import filter_phones

router = APIRouter()

@router.post("/filter-criteria/result")
def filter_result(filters: PhoneFilterRequest):
    return {"top_5_phones": filter_phones(filters)}