from typing import List , Dict, Any
from fastapi import APIRouter
from backend.app.models.phone_model import Phone
from backend.app.models.request_models import PhoneFilterRequest
from backend.app.services.filter import filter_phones, get_filter_options

router = APIRouter()

@router.get("/filter-criteria")
def get_filter_criteria() -> Dict[str, Any]:
 
    return get_filter_options()

@router.post("/filter-criteria/result")
def filter_result(filters: PhoneFilterRequest):
    return {"top_5_phones": filter_phones(filters)}