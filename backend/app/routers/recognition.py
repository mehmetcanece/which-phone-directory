from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.vision import detect_brand_from_image
from app.services.filter import get_top_5_by_brand

router = APIRouter()

@router.post("/recognition")
async def upload_phone_image(image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")
    
    image_bytes = await image.read()
    predicted_brand = detect_brand_from_image(image_bytes)

    return {"predicted_brand": predicted_brand}

@router.get("/recognition/result")
def recognition_result(brand: str):
    phones = get_top_5_by_brand(brand)
    return {"top_5_phones": phones}