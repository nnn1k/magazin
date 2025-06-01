from fastapi import HTTPException, status

review_is_exist_exc = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Отзыв уже существует",
)

review_bad_rating_exc = HTTPException(
    status_code=400,
    detail='Рейтинг должен быть от 1 до 5'
)