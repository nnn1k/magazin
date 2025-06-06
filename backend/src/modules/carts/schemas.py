from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class CartSchema(BaseModel):
    id: int
    product_id: int
    user_id: int
    count: int
    size: str
    created_at: datetime
    updated_at: datetime

    product: Optional['ProductSchema'] = None

    model_config = ConfigDict(from_attributes=True)
