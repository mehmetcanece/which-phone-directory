from pydantic import BaseModel
from typing import Optional

class Phone(BaseModel):
    brand_name: str
    model: str
    price: int
    battery_capacity: int
    ram_capacity: int
    internal_memory: int
    screen_size: float
    cpu_benchmark: int
    avg_rating: float
    mcda_score: Optional[float] = None