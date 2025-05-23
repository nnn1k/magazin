from typing import Sequence

from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.database.models.products import ProductModel


class ProductRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all(self) -> Sequence[ProductModel]:
        stmt = (
            select(ProductModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def create(
            self, name: str, price: float, category: str, image_url: str = '', description: str = ''
    ) -> ProductModel:
        stmt = (
            insert(ProductModel)
            .values(name=name, price=price, category=category, image_url=image_url, description=description)
            .returning(ProductModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()


