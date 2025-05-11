from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.vision import get_top_5_by_brand 

router = APIRouter()

@router.post("/recognition")
async def upload_phone_image(image: UploadFile = File(...)): # burda File(...) ile fastapiye aslında bu bi dosya alıcak kullanıcıdan gelen diyoruz. async koyuyoruz başa çünkü sonuçta kullanıcıdan gelen bir şey var beklemeli olacak o yğzden async
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.") #burada exception mekanizmam var, jpeg dışında vir file gelirse bad request hatası dönücem
    
    return {"predicted_brand": "Apple"}

@router.get("/recognition/result")
def recognition_result(brand: str):
    phones = get_top_5_by_brand(brand)
    return {"top_5_phones": phones}