from fastapi import APIRouter, Depends

from backend.src.modules.auth.dependencies import get_user_by_token
from backend.src.modules.products.dependencies import get_product_service
from backend.src.modules.products.schemas import ProductCreate
from backend.src.modules.products.service import ProductService
from backend.src.modules.users.schemas import UserSchema

router = APIRouter(
    prefix="/products",
    tags=['products']
)


@router.get("")
async def get_products(
    service: ProductService = Depends(get_product_service)
):
    products = await service.get_all()
    return {'products': products}


@router.post("")
async def create_product(
        new_product: ProductCreate,
        user: UserSchema = Depends(get_user_by_token),
        service: ProductService = Depends(get_product_service),
):
    product = await service.create(new_product=new_product, user=user)
    return {'product': product}
