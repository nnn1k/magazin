from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.database.dependencies import get_db
from backend.src.modules.carts.repository import CartRepository
from backend.src.modules.carts.service import CartService


def get_cart_repo(
        session: AsyncSession = Depends(get_db)
):
    return CartRepository(session)


def get_cart_service(
        cart_repo: CartRepository = Depends(get_cart_repo)
):
    return CartService(cart_repo)