from sqlalchemy.orm import Mapped, mapped_column

from backend.src.database.base import Base, int_pk, created_at, updated_at


class UserModel(Base):
    __tablename__ = 'users'

    id: Mapped[int_pk]
    email: Mapped[str]
    name: Mapped[str]
    password: Mapped[bytes]
    photo_url: Mapped[str] = mapped_column(default='')
    is_admin: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]
