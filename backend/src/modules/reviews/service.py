from typing import List

from backend.src.modules.reviews.exc import review_is_exist_exc
from backend.src.modules.reviews.repository import ReviewRepository
from backend.src.modules.reviews.schemas import ReviewCreate, ReviewSchema
from backend.src.modules.users.schemas import UserSchema


class ReviewService:

    def __init__(self, review_repo: ReviewRepository):
        self.review_repo = review_repo

    async def create(self, user: UserSchema, product_id: int, new_review: ReviewCreate):
        old_review = await self.review_repo.get_one(user_id=user.id, product_id=product_id)
        if old_review:
            raise review_is_exist_exc
        review = await self.review_repo.create(
            user_id=user.id, product_id=product_id, rating=new_review.rating, description=new_review.description
        )
        schema = ReviewSchema.model_validate(review)
        return schema

    async def get_all(self, **kwargs) -> List[ReviewSchema]:
        reviews = await self.review_repo.get_all(**kwargs)
        return [ReviewSchema.model_validate(rev) for rev in reviews]

    async def get_one(self, **kwargs) -> ReviewSchema:
        review = await self.review_repo.get_one(**kwargs)
        schema = ReviewSchema.model_validate(review)
        return schema



