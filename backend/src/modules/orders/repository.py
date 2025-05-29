from typing import List, Sequence

from sqlalchemy import select, insert, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from backend.src.database.models.orders import OrderModel
from backend.src.database.models.products_in_orders import ProductInOrderModel


class OrderRepository:

    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_order(self, user_id: int) -> OrderModel:
        stmt = (
            insert(OrderModel)
            .values(user_id=user_id)
            .returning(OrderModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def add_product_to_order(self, order_id: int, product_id: int, count: int, size: str) -> ProductInOrderModel:
        stmt = (
            insert(ProductInOrderModel)
            .values(order_id=order_id, product_id=product_id, count=count, size=size)
            .returning(ProductInOrderModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_one(self, order_id: int, user_id: int) -> OrderModel:
        stmt = (
            select(OrderModel)
            .where(
                and_(
                    OrderModel.id == order_id,
                    OrderModel.user_id == user_id,
                )
            )
            .options(selectinload(OrderModel.products))
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def get_all(self, **kwargs) -> Sequence[OrderModel]:
        stmt = (
            select(OrderModel)
            .filter_by(**kwargs)
            .options(selectinload(OrderModel.products))
            .options(selectinload(OrderModel.user))
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()
