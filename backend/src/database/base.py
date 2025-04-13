from datetime import datetime, timedelta
from typing import Annotated

from sqlalchemy import text
from sqlalchemy.orm import mapped_column, DeclarativeBase

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

from backend.src.config.settings import settings

engine = create_async_engine(
    url=settings.db.url
)

session_factory = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

int_pk = Annotated[
    int,
    mapped_column(primary_key=True)
]

created_at = Annotated[
    datetime,
    mapped_column(
        server_default=text("CURRENT_TIMESTAMP + interval '3 hours'"),
    )
]

updated_at = Annotated[
    datetime,
    mapped_column(
        server_default=text("CURRENT_TIMESTAMP + interval '3 hours'"),
        onupdate=lambda: datetime.utcnow() + timedelta(hours=3),
    )
]


class Base(DeclarativeBase):
    ...
