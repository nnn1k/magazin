from fastapi import APIRouter, Depends

from backend.src.modules.auth.dependencies import get_user_by_token
from backend.src.modules.carts.dependencies import get_cart_service
from backend.src.modules.carts.service import CartService
from backend.src.modules.users.schemas import UserSchema

router = APIRouter(
    prefix="/carts",
    tags=['carts'],
)


@router.get('')
async def get_all(
        user: UserSchema = Depends(get_user_by_token),
        service: CartService = Depends(get_cart_service)
):
    carts = await service.get_all(user_id=user.id)
    return {'carts': carts}


@router.get('/{product_id}')
async def get_one(
        product_id: int,
        size: str,
        user: UserSchema = Depends(get_user_by_token),
        service: CartService = Depends(get_cart_service),
):
    cart = await service.get_one(product_id=product_id, user_id=user.id, size=size)
    return {'cart': cart}


@router.post('/{product_id}')
async def create_cart(
        product_id: int,
        size: str,
        count: int,
        user: UserSchema = Depends(get_user_by_token),
        service: CartService = Depends(get_cart_service),
):
    cart = await service.add(product_id=product_id, user_id=user.id, size=size, count=count)
    return {'cart': cart}


@router.delete('/{product_id}')
async def delete_cart(
        product_id: int,
        size: str,
        user: UserSchema = Depends(get_user_by_token),
        service: CartService = Depends(get_cart_service),
):
    await service.delete(product_id=product_id, user_id=user.id, size=size)
    return {'msg': 'product deleted'}
