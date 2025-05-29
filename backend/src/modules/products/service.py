from typing import Sequence


from backend.src.modules.products.repository import ProductRepository
from backend.src.modules.products.schemas import ProductSchema, ProductCreate
from backend.src.modules.users.exc import user_is_not_owner_exc
from backend.src.modules.users.schemas import UserSchema
from backend.src.modules.users.service import UserService


class ProductService:
    def __init__(self, product_repo: ProductRepository):
        self.product_repo = product_repo

    async def get_all(self) -> Sequence[ProductSchema]:
        products = await self.product_repo.get_all()
        return [ProductSchema.model_validate(product) for product in products]

    async def create(self, new_product: ProductCreate, user: UserSchema) -> ProductSchema:
        if not user.is_admin:
            raise user_is_not_owner_exc
        product = await self.product_repo.create(
                name=new_product.name,
                description=new_product.description,
                price=new_product.price,
                category=new_product.category,
                image_url=new_product.image_url,
            )
        schema = ProductSchema.model_validate(product)
        return schema
