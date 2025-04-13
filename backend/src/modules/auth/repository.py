from sqlalchemy import select, and_, insert
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.database.models.users import UserModel


class AuthRepository:

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def login(self, email: str) -> UserModel:
        stmt = (
            select(UserModel)
            .where(and_(UserModel.email == email))
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def register(self, email: str, name: str, hashed_password: bytes) -> UserModel:
        stmt = (
            insert(UserModel)
            .values(
                email=email,
                name=name,
                password=hashed_password,
            )
            .returning(UserModel)
        )
        result = await self.session.execute(stmt)
        return result.scalars().first()
