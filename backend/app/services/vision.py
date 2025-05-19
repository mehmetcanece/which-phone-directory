import json
import os
from typing import List, Dict

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PHONES_PATH = os.path.join(BASE_DIR, "../data/phones.json")
PHONES_PATH = os.path.abspath(PHONES_PATH)

with open(PHONES_PATH, "r") as f:
    PHONE_DATA = json.load(f)

def get_top_5_by_brand(brand: str) -> List[Dict]:
    brand = brand.strip().lower()
    
    filtered = [
        phone for phone in PHONE_DATA
        if phone.get("brand_name", "").lower() == brand
    ]
    
    sorted_phones = sorted(filtered, key=lambda x: x.get("ranking", float('inf')))
    
    return [
    {
        "model": phone["model"],
        "price": phone["price"],
        "ram": phone["ram_capacity"],
        "storage": phone["internal_memory"],
        "avg_rating": phone["avg_rating"],           
        "camera_quality": phone["camera_quality"],
        "ranking": phone.get("ranking", 0)      
    }
    for phone in sorted_phones[:5]
]