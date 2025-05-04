import json
from typing import List
from app.models.phone_model import Phone
from app.models.request_models import PhoneFilterRequest

def filter_phones(filters: PhoneFilterRequest) -> List[dict]:
    with open("app/data/phones.json") as f:
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
        result.append(phone)

    sorted_result = sorted(result, key=lambda p: p.ranking or 0, reverse=False)
    return [p.dict() for p in sorted_result[:5]]

def get_filter_options():
    with open("app/data/phones.json") as f:
        data = json.load(f)

    phones = [Phone(**item) for item in data]

    def get_range(field):
        values = [getattr(p, field) for p in phones]
        return {"min": min(values), "max": max(values)}

    brands = sorted(list({p.brand_name for p in phones}))

    return {
        "brand_names": brands,
        "price": get_range("price"),
        "battery_capacity": get_range("battery_capacity"),
        "ram_capacity": get_range("ram_capacity"),
        "internal_memory": get_range("internal_memory"),
        "screen_size": get_range("screen_size"),
        "cpu_benchmark": get_range("cpu_benchmark"),
        "avg_rating": get_range("avg_rating")
    }