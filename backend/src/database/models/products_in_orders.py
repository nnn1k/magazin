from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from backend.src.database.base import Base, int_pk, created_at, updated_at


class ProductInOrderModel(Base):
    __tablename__ = 'products_in_orders'

    product_id: Mapped[int] = mapped_column(ForeignKey('products.id', ondelete='CASCADE'), primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey('orders.id', ondelete='CASCADE'), primary_key=True)
    count: Mapped[int]
    size: Mapped[str]

