from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.database.dependencies import get_db
from backend.src.modules.carts.dependencies import get_cart_service
from backend.src.modules.carts.service import CartService
from backend.src.modules.orders.repository import OrderRepository
from backend.src.modules.orders.service import OrderService


def get_order_repo(
        session: AsyncSession = Depends(get_db),
):
    return OrderRepository(session)


def get_order_service(
        order_repo: OrderRepository = Depends(get_order_repo),
        cart_serv: CartService = Depends(get_cart_service)
):
    return OrderService(order_repo=order_repo, cart_serv=cart_serv)
