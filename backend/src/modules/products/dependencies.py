from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.database.dependencies import get_db
from backend.src.modules.products.repository import ProductRepository
from backend.src.modules.products.service import ProductService
from backend.src.modules.users.dependencies import get_user_service
from backend.src.modules.users.service import UserService


def get_product_repo(
        session: AsyncSession = Depends(get_db)
):
    return ProductRepository(session)


def get_product_service(
        product_repo: ProductRepository = Depends(get_product_repo),
):
    return ProductService(product_repo=product_repo)
