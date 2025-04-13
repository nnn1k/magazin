from fastapi import APIRouter, Depends

from backend.src.modules.auth.dependencies import get_user_by_token
from backend.src.modules.users.dependencies import get_user_service
from backend.src.modules.users.schemas import UserSchema
from backend.src.modules.users.service import UserService

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get('/me')
async def get_user(
        user: UserSchema = Depends(get_user_by_token),
):
    return {'user': user}
