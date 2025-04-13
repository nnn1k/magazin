from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.database.models.users import UserModel


class UserRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_user(self, **kwargs) -> UserModel:
        stmt = (
            select(UserModel)
            .filter_by(**kwargs)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

