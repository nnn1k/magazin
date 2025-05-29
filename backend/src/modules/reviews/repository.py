from sqlalchemy.ext.asyncio import AsyncSession


class ReviewRepository:

    def __init__(self, session: AsyncSession):
        self.session = session
