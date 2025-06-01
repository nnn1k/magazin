from fastapi import HTTPException, status

product_not_found_exc = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Продукт не найден",
)