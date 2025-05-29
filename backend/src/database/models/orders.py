from typing import Sequence, List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.src.database.base import Base, int_pk, created_at, updated_at


class OrderModel(Base):
    __tablename__ = 'orders'

    id: Mapped[int_pk]
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'))
    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]

    products: Mapped[List['ProductModel']] = relationship(
        'ProductModel',
        secondary='products_in_orders',
        overlaps='products_in_orders',
        back_populates='orders',
        lazy='noload'
    )
    user: Mapped['UserModel'] = relationship(
        'UserModel',
        back_populates='orders',
        lazy='noload'
    )


