from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.src.database.base import Base, int_pk, created_at, updated_at


class ReviewModel(Base):
    __tablename__ = 'reviews'

    id: Mapped[int_pk]
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'))
    product_id: Mapped[int] = mapped_column(ForeignKey('products.id', ondelete='CASCADE'))
    rating: Mapped[int]
    description: Mapped[str]
    created_at: Mapped[created_at]
    updated_at: Mapped[updated_at]

    user: Mapped['UserModel'] = relationship(
        'UserModel',
        back_populates='reviews',
        lazy='noload'
    )