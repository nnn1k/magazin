from typing import Sequence

from backend.src.modules.carts.repository import CartRepository
from backend.src.modules.carts.schemas import CartSchema


class CartService:

    def __init__(self, cart_repo: CartRepository):
        self.cart_repo = cart_repo

    async def add(self, product_id: int, user_id: int, size: str, count: int):
        check_cart = await self.cart_repo.get_one(product_id=product_id, user_id=user_id, size=size)
        if check_cart:
            cart = await self.cart_repo.update(product_id=product_id, user_id=user_id, size=size, count=count)
        else:
            cart = await self.cart_repo.add(product_id=product_id, user_id=user_id, size=size, count=count)
        return CartSchema.model_validate(cart)

    async def get_one(self, product_id: int, user_id: int, size: str) -> CartSchema:
        cart = await self.cart_repo.get_one(product_id=product_id, user_id=user_id, size=size)
        return CartSchema.model_validate(cart)

    async def get_all(self, user_id: int) -> Sequence[CartSchema]:
        carts = await self.cart_repo.get_all(user_id=user_id)
        return [CartSchema.model_validate(cart) for cart in carts]

    async def delete(self, user_id: int, product_id: int, size: str) -> CartSchema:
        cart = await self.cart_repo.delete(product_id=product_id, user_id=user_id, size=size)
        return CartSchema.model_validate(cart)

    async def delete_all(self, user_id: int) -> Sequence[CartSchema]:
        carts = await self.cart_repo.delete_all(user_id=user_id)
        return [CartSchema.model_validate(cart) for cart in carts]

