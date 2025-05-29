from fastapi import APIRouter, Depends

from backend.src.modules.auth.dependencies import get_user_by_token, get_admin_by_token
from backend.src.modules.orders.dependencies import get_order_service
from backend.src.modules.orders.service import OrderService
from backend.src.modules.users.schemas import UserSchema

router = APIRouter(
    prefix="/orders",
    tags=['orders']
)


@router.get('')
async def get_orders(
        user: UserSchema = Depends(get_user_by_token),
        service: OrderService = Depends(get_order_service)
):
    orders = await service.get_all(user_id=user.id)
    return {'orders': orders}


@router.get('/admin')
async def get_all_orders(
        user: UserSchema = Depends(get_admin_by_token),
        service: OrderService = Depends(get_order_service),
):
    orders = await service.get_all()
    return {'orders': orders}

@router.get('/{order_id}')
async def get_order(
        order_id: int,
        user: UserSchema = Depends(get_user_by_token),
        service: OrderService = Depends(get_order_service)
):
    order = service.get_one(order_id=order_id, user_id=user.id)
    return {'order': order}


@router.post('/fast_buy/{product_id}')
async def fast_buy(
        product_id: int,
        count: int,
        size: str,
        user: UserSchema = Depends(get_user_by_token),
        service: OrderService = Depends(get_order_service),
):
    order = await service.hot_buy(product_id=product_id, user_id=user.id, count=count, size=size)
    return {'order': order}


@router.post('/cart')
async def buy_on_cart(
        user: UserSchema = Depends(get_user_by_token),
        service: OrderService = Depends(get_order_service),
):
    order = await service.buy_on_cart(user_id=user.id)
    return {'order': order}
