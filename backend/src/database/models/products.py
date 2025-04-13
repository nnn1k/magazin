from sqlalchemy.orm import Mapped, mapped_column

from backend.src.database.base import Base, int_pk, created_at, updated_at


class ProductModel(Base):
    __tablename__ = 'products'

    id: Mapped[int_pk]
    name: Mapped[str]
    price: Mapped[float]
    category: Mapped[str]
    image: Mapped[str] = mapped_column(default='', nullable=True)
    description: Mapped[str] = mapped_column(default='', nullable=True)
