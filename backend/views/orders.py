from fastapi import APIRouter, Depends

from backend.src.modules.auth.dependencies import get_user_by_token
from backend.src.modules.orders.dependencies import get_order_service
from backend.src.modules.orders.service import OrderService
from backend.src.modules.users.schemas import UserSchema

router = APIRouter(
    prefix="/orders",
)


@router.get("")
async def get_orders(
        user: UserSchema = Depends(get_user_by_token),
        service: OrderService = Depends(get_order_service)
):
    ...