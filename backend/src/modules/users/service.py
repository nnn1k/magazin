from backend.src.modules.users.repository import UserRepository
from backend.src.modules.users.schemas import UserSchema


class UserService:

    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def get_user(self, **kwargs) -> UserSchema:
        user = await self.user_repo.get_user(**kwargs)
        return UserSchema.model_validate(user)


