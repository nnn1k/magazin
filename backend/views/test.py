from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

from backend.src.database.dependencies import get_db
from backend.src.database.recreate import recreate

router = APIRouter(
    prefix="/test",
)


@router.get('/test_db', summary='Проверка времени подключения бд')
async def get_test_db(
        session: AsyncSession = Depends(get_db)
):
    res = await session.execute(text('SELECT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::int'))
    result = res.scalars().one_or_none()
    return {
        'result': result,
    }


@router.get('/recreate', summary='Дроп бд')
async def recreate_db():
    await recreate()
    return {
        'msg': 'Recreate database successfully'
    }
