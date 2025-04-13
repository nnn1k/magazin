from fastapi import APIRouter, Response, Depends, HTTPException

from backend.src.modules.auth.dependencies import get_auth_service
from backend.src.modules.auth.schemas import UserLogin, UserRegister
from backend.src.modules.auth.service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/login")
async def login(
        login_schema: UserLogin,
        response: Response,
        service: AuthService = Depends(get_auth_service)
):
    user = await service.login(login_schema=login_schema, response=response)
    return {'user': user}


@router.post("/register")
async def register(
        register_schema: UserRegister,
        response: Response,
        service: AuthService = Depends(get_auth_service)
):
    user = await service.register(register_schema=register_schema, response=response)
    return {'user': user}


@router.post("/logout")
async def logout(
        response: Response,
):
    response.delete_cookie(key='access_token')
    response.delete_cookie(key='refresh_token')
    return {'msg': 'logged out'}
