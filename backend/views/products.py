from typing import Annotated

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
import os
import uuid

from backend.src.modules.auth.dependencies import get_user_by_token, get_admin_by_token
from backend.src.modules.products.dependencies import get_product_service
from backend.src.modules.products.schemas import ProductCreate
from backend.src.modules.products.service import ProductService
from backend.src.modules.users.schemas import UserSchema

UPLOAD_DIR = "frontend/photos/products"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(
    prefix="/products",
    tags=['products']
)


async def save_file(file):
    filename = f'{uuid.uuid4()}{os.path.splitext(file.filename)[1]}'
    # Сохраняем файл на диск
    file_location = os.path.join(UPLOAD_DIR, filename)
    try:
        contents = await file.read()
        with open(file_location, "wb") as f:
            f.write(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка при сохранении файла: {str(e)}")
    url = UPLOAD_DIR + '/' + filename
    return url


@router.get("")
async def get_products(
    service: ProductService = Depends(get_product_service)
):
    products = await service.get_all()
    return {'products': products}


@router.post("")
async def create_product(
        new_product: Annotated[ProductCreate, Depends()],
        file: UploadFile = File(...),
        user: UserSchema = Depends(get_admin_by_token),
        service: ProductService = Depends(get_product_service),
):
    url = await save_file(file)
    product = await service.create(new_product=new_product, user=user, url=url)
    return {'product': product}


@router.put("/{product_id}")
async def update_product(
        product_id: int,
        new_product: ProductCreate,
        user: UserSchema = Depends(get_admin_by_token),
        service: ProductService = Depends(get_product_service),
):
    product = await service.update(product_id=product_id, new_product=new_product, user=user)
    return {'product': product}


@router.delete("/{product_id}")
async def delete_product(
        product_id: int,
        user: UserSchema = Depends(get_admin_by_token),
        service: ProductService = Depends(get_product_service),
):
    await service.delete(product_id=product_id)
    return {'status': True}