from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, field_validator

from backend.src.modules.reviews.exc import review_bad_rating_exc


class ReviewSchema(BaseModel):
    id: int
    user_id: int
    product_id: int
    rating: int
    description: str
    created_at: datetime
    updated_at: datetime

    user: Optional['UserSchema'] = None
    model_config = ConfigDict(from_attributes=True)


class ReviewCreate(BaseModel):
    rating: int = 5
    description: str

    @field_validator('rating')
    def validate_rating(cls, v):
        if not 1 <= v <= 5:
            raise review_bad_rating_exc
        return v
