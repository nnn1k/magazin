from typing import Sequence

from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.src.database.base import Base, int_pk, created_at, updated_at


class ProductModel(Base):
    __tablename__ = 'products'

    id: Mapped[int_pk]
    name: Mapped[str]
    price: Mapped[float]
    category: Mapped[str]
    image: Mapped[str] = mapped_column(default='', nullable=True)
    description: Mapped[str] = mapped_column(default='', nullable=True)
    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]

    carts: Mapped['CartModel'] = relationship(
        'CartModel',
        back_populates='product',
        lazy='noload'
    )

    orders: Mapped[Sequence['OrderModel']] = relationship(
        'OrderModel',
        secondary='products_in_orders',
        back_populates='products',
        lazy='noload'
    )
