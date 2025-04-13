from pathlib import Path

from pydantic import BaseModel
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent


class JWTConfig(BaseModel):
    private_key: str = BASE_DIR / 'certs' / 'jwt-private.pem'
    public_key: str = BASE_DIR / 'certs' / 'jwt-public.pem'


class Settings(BaseSettings):
    jwt: JWTConfig = JWTConfig()

