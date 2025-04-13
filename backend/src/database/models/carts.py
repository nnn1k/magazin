from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.src.database.base import Base, int_pk, created_at, updated_at


class CartModel(Base):
    __tablename__ = 'carts'

    id: Mapped[int_pk]
    product_id: Mapped[int] = mapped_column(ForeignKey('products.id', ondelete='CASCADE'))
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'))
    count: Mapped[int]
    size: Mapped[str]
    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]

    product: Mapped['ProductModel'] = relationship(
        'ProductModel',
        back_populates='carts',
        lazy='noload'
    )


