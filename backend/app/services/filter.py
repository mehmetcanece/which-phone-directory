import os
import json
from typing import List
from backend.app.models.phone_model import Phone
from backend.app.models.request_models import PhoneFilterRequest


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PHONES_PATH = os.path.join(BASE_DIR, "../data/phones.json")

def filter_phones(filters: PhoneFilterRequest) -> List[dict]:
    with open(PHONES_PATH, "r") as f:
        data = json.load(f)

    phones = [Phone(**item) for item in data]

    def in_range(value, range_tuple):
        if not range_tuple:
            return True
        return range_tuple[0] <= value <= range_tuple[1]

    result = []
    for phone in phones:
        if filters.brand_name and phone.brand_name.lower() != filters.brand_name.lower():
            continue
        if not in_range(phone.price, filters.price):
            continue
        if not in_range(phone.battery_capacity, filters.battery_capacity):
            continue
        if not in_range(phone.ram_capacity, filters.ram_capacity):
            continue
        if not in_range(phone.internal_memory, filters.internal_memory):
            continue
        if not in_range(phone.screen_size, filters.screen_size):
            continue
        if not in_range(phone.cpu_benchmark, filters.cpu_benchmark):
            continue
        if not in_range(phone.avg_rating, filters.avg_rating):
            continue
        if not in_range(phone.camera_quality, filters.camera_quality):
            continue
        if not in_range(phone.weight, filters.weight):
            continue
        result.append(phone)

    sorted_result = sorted(result, key=lambda p: p.ranking or 0)
    return [p.dict() for p in sorted_result[:5]]

def get_filter_options():
    with open(PHONES_PATH, "r") as f:
        data = json.load(f)

    phones = [Phone(**item) for item in data]

    def get_range(field):
        values = [getattr(p, field) for p in phones]
        return {"min": min(values), "max": max(values)}

    def get_unique(field):
        return sorted(list({getattr(p, field) for p in phones}))

    brands = sorted(list({p.brand_name for p in phones}))

    return {
        "brand_names": brands,
        "price_range": get_range("price"),
        "battery_range": get_range("battery_capacity"),
        "ram_options": get_unique("ram_capacity"),
        "internal_memory_options": get_unique("internal_memory"),
        "screen_size_range": get_range("screen_size"),
        "cpu_benchmark_range": get_range("cpu_benchmark"),
        "avg_rating_range": get_range("avg_rating"),
        "camera_quality_options": get_unique("camera_quality"),
        "weight_range": get_range("weight"),
    }