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
        order = await self.order_repo.get_order(order_id=order.id)
        return OrderSchema.model_validate(order)
