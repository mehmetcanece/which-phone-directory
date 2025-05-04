from app.models.request_models import PhoneFilterRequest

def filter_phones(filters: PhoneFilterRequest):
    with open("app/data/phones.json") as f:
        data = json.load(f)
    phones = [Phone(**item) for item in data]

    def in_range(val, rng): return not rng or (rng[0] <= val <= rng[1])

    result = []
    for phone in phones:
        if filters.brand_name and phone.brand_name != filters.brand_name:
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

    sorted_result = sorted(result, key=lambda p: p.mcda_score or 0, reverse=True)
    return [p.dict() for p in sorted_result[:5]]