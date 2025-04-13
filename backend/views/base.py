from fastapi import APIRouter

from backend.views.test import router as test_router
from backend.views.auth import router as auth_router
from backend.views.users import router as users_router
from backend.views.products import router as product_router
from backend.views.carts import router as cart_router
backend_router = APIRouter(
    prefix='/api'
)

backend_router.include_router(test_router)
backend_router.include_router(auth_router)
backend_router.include_router(users_router)
backend_router.include_router(product_router)
backend_router.include_router(cart_router)