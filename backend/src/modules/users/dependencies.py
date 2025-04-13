from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.database.dependencies import get_db
from backend.src.modules.users.repository import UserRepository
from backend.src.modules.users.service import UserService


def get_user_repo(
        session: AsyncSession = Depends(get_db)
):
    return UserRepository(session)


def get_user_service(
        user_repo: UserRepository = Depends(get_user_repo)
):
    return UserService(user_repo)
