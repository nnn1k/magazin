from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from backend.src.database.base import Base, int_pk, created_at, updated_at


class OrderModel(Base):
    __tablename__ = 'orders'

    id: Mapped[int_pk]
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'))
    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]


