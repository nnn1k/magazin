from backend.src.classes.AuthJWT import jwt_token
from backend.src.classes.HashPwd import HashPwd
from backend.src.modules.auth.exc import incorrect_login_or_password_exc, user_is_exist_exc
from backend.src.modules.auth.repository import AuthRepository
from fastapi import Response

from backend.src.modules.auth.schemas import UserLogin, UserRegister
from backend.src.modules.users.schemas import UserSchema


class AuthService:
    def __init__(self, auth_repo: AuthRepository):
        self.auth_repo = auth_repo

    async def login(self, login_schema: UserLogin, response: Response):
        user = await self.auth_repo.login(login_schema.email)
        if not user:
            raise incorrect_login_or_password_exc
        if not HashPwd.validate_password(password=login_schema.password, hashed_password=user.password):
            raise incorrect_login_or_password_exc
        schema = UserSchema.model_validate(user)
        self._create_token(response=response, user=schema)
        return schema

    async def register(self, register_schema: UserRegister, response: Response):
        check_user = await self.auth_repo.login(email=register_schema.email)
        if check_user:
            raise user_is_exist_exc
        user = await self.auth_repo.register(
            name=register_schema.name,
            email=register_schema.email,
            hashed_password=HashPwd.hash_password(register_schema.password),
        )
        schema = UserSchema.model_validate(user)
        self._create_token(response=response, user=schema)
        return schema


    @staticmethod
    def _create_token(
            response: Response,
            user: UserSchema
    ) -> None:
        payload = {'sub': user.id}

        response.set_cookie(
            'access_token',
            jwt_token.create_access_token(payload=payload),
            max_age=60 * 60 * 24 * 365
        )
        response.set_cookie(
            'refresh_token',
            jwt_token.create_refresh_token(payload=payload),
            max_age=60 * 60 * 24 * 365
        )

