from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import uuid
import shutil

from computer_vision.code.logo_focus_predict import predict_phone_brand
from backend.app.services.vision import get_top_5_by_brand 

router = APIRouter()

@router.post("/recognition")
async def upload_phone_image(image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")
    
    # Geçici dosya adı oluşturdum
    temp_dir = "temp_uploads"
    os.makedirs(temp_dir, exist_ok=True)
    temp_path = os.path.join(temp_dir, f"{uuid.uuid4()}.jpg")  # uuid ile unique ad üretiyorum

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    try:
        result = predict_phone_brand(temp_path)

        if result["confidence"] > 40.0:
            return {
                "predicted_brand": result["brand"],
                "source": result["source"],
                "confidence": result["confidence"]
            }
        else:
            raise HTTPException(
                status_code=422,
                detail="Could not confidently recognize the phone brand. Please try another image."
            )
    finally:
        os.remove(temp_path)


@router.get("/recognition/result")
def recognition_result(brand: str):
    phones = get_top_5_by_brand(brand)
    return {"top_5_phones": phones}