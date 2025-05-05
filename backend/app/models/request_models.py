from pydantic import BaseModel
from typing import Optional, Tuple

class PhoneFilterRequest(BaseModel):
    brand_name: Optional[str] = None
    price: Optional[Tuple[int, int]] = None
    battery_capacity: Optional[Tuple[int, int]] = None
    ram_capacity: Optional[Tuple[int, int]] = None
    internal_memory: Optional[Tuple[int, int]] = None
    screen_size: Optional[Tuple[float, float]] = None
    cpu_benchmark: Optional[Tuple[int, int]] = None
    avg_rating: Optional[Tuple[float, float]] = None
    camera_quality: Optional[Tuple[int, int]] = None
    weight: Optional[Tuple[int, int]] = None