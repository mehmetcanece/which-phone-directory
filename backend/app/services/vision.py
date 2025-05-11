def get_top_5_by_brand(brand: str):
    sample_phones = {
        "Apple": [
            {"name": "iPhone 14 Pro Max", "price": 1199, "ram": 6, "storage": 256},
            {"name": "iPhone 13 Pro", "price": 999, "ram": 6, "storage": 128},
            {"name": "iPhone 12", "price": 799, "ram": 4, "storage": 64},
            {"name": "iPhone SE", "price": 429, "ram": 4, "storage": 64},
            {"name": "iPhone 11", "price": 599, "ram": 4, "storage": 128},
        ],
        "Samsung": [
            {"name": "Galaxy S23 Ultra", "price": 1199, "ram": 12, "storage": 512},
            {"name": "Galaxy S22", "price": 899, "ram": 8, "storage": 256},
            {"name": "Galaxy A54", "price": 349, "ram": 6, "storage": 128},
            {"name": "Galaxy Z Flip", "price": 999, "ram": 8, "storage": 128},
            {"name": "Galaxy M14", "price": 229, "ram": 4, "storage": 64},
        ]
    }

    return sample_phones.get(brand, [])