from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict




class OrderSchema(BaseModel):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    products: Optional[List['ProductSchema']] = []
    user: Optional['UserSchema'] = None

    model_config = ConfigDict(from_attributes=True)

