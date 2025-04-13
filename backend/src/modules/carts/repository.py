from typing import Sequence

from sqlalchemy import insert, select, update, and_, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from backend.src.database.models.carts import CartModel


class CartRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def add(self, product_id: int,  user_id: int, count: int, size: str) -> CartModel:
        stmt = (
            insert(CartModel)
            .values(product_id=product_id, user_id=user_id, count=count, size=size)
            .returning(CartModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_one(self, product_id: int, user_id: int, size: str) -> CartModel:
        stmt = (
            select(CartModel)
            .filter_by(product_id=product_id, user_id=user_id, size=size)
            .options(joinedload(CartModel.product))
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_all(self, user_id: int) -> Sequence[CartModel]:
        stmt = (
            select(CartModel)
            .filter_by(user_id=user_id)
            .options(joinedload(CartModel.product))
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def update(self, product_id: int, user_id: int, count: int, size: str) -> CartModel:
        stmt = (
            update(CartModel)
            .where(
                and_(
                    CartModel.product_id == product_id,
                    CartModel.user_id == user_id,
                    CartModel.size == size,
                )
            )
            .values(count=count)
            .returning(CartModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def delete(self, product_id: int, user_id: int, size: str) -> CartModel:
        stmt = (
            delete(CartModel)
            .where(
                and_(
                    CartModel.product_id == product_id,
                    CartModel.user_id == user_id,
                    CartModel.size == size,
                )
            )
            .returning(CartModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def delete_all(self, user_id: int) -> Sequence[CartModel]:
        stmt = (
            delete(CartModel)
            .where(
                and_(
                    CartModel.user_id == user_id,
                )
            )
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()
