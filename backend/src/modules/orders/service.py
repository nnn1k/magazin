from typing import List

from fastapi import HTTPException

from backend.src.modules.carts.service import CartService
from backend.src.modules.orders.repository import OrderRepository
from backend.src.modules.orders.schemas import OrderSchema


class OrderService:
    def __init__(self, order_repo: OrderRepository, cart_serv: CartService):
        self.order_repo = order_repo
        self.cart_serv = cart_serv

    async def hot_buy(self, product_id: int, user_id: int, count: int, size: str) -> OrderSchema:
        order = await self.order_repo.create_order(user_id=user_id)
        await self.order_repo.add_product_to_order(order_id=order.id, product_id=product_id, size=size, count=count)
        order = await self.order_repo.get_one(order_id=order.id, user_id=user_id)
        return OrderSchema.model_validate(order)

    async def buy_on_cart(self, user_id: int):
        products_on_cart = await self.cart_serv.delete_all(user_id=user_id)
        order = await self.order_repo.create_order(user_id=user_id)
        for product in products_on_cart:
            await self.order_repo.add_product_to_order(
                order_id=order.id, product_id=product.id, size=product.size, count=product.count
            )

        order = await self.order_repo.get_one(order_id=order.id, user_id=user_id)
        return OrderSchema.model_validate(order)

    async def get_all(self, **kwargs) -> List[OrderSchema]:
        orders = await self.order_repo.get_all(**kwargs)
        return [OrderSchema.model_validate(order) for order in orders]

    async def get_one(self, order_id: int, user_id: int) -> OrderSchema:
        order = await self.order_repo.get_one(order_id=order_id, user_id=user_id)
        return OrderSchema.model_validate(order)
