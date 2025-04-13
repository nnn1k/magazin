from pydantic import BaseModel, EmailStr


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str


