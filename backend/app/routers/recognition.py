from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter()

@router.post("/recognition")
async def upload_phone_image(image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")
    
    # Gerçek model yok, dummy brand döndürülüyor
    return {"predicted_brand": "Apple"}

@router.get("/recognition/result")
def recognition_result(brand: str):
    phones = get_top_5_by_brand(brand)
    return {"top_5_phones": phones}