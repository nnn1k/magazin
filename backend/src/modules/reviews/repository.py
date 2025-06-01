from typing import Sequence

from sqlalchemy import select, insert, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from backend.src.database.models import ReviewModel


class ReviewRepository:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all(self, **kwargs) -> Sequence[ReviewModel]:
        stmt = (
            select(ReviewModel)
            .filter_by(**kwargs)
            .options(joinedload(ReviewModel.user))
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def get_one(self, **kwargs) -> ReviewModel:
        stmt = (
            select(ReviewModel)
            .filter_by(**kwargs)
            .options(joinedload(ReviewModel.user))
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def create(
            self,
            user_id: int,
            product_id: int,
            rating: int,
            description: str
    ) -> ReviewModel:
        stmt = (
            insert(ReviewModel)
            .values(user_id=user_id, product_id=product_id, rating=rating, description=description)
            .returning(ReviewModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def update(self, review_id: int, rating: int, description: str) -> ReviewModel:
        stmt = (
            update(ReviewModel)
            .values(rating=rating, description=description)
            .filter_by(review_id=review_id)
            .returning(ReviewModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def delete(self, review_id: int) -> ReviewModel:
        stmt = (
            delete(ReviewModel)
            .filter_by(review_id=review_id)
            .returning(ReviewModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()
