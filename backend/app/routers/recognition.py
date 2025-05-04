from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from pydantic import BaseModel
from app.utils import detect_brand


router = APIRouter()