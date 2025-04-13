from fastapi import HTTPException, status

user_is_not_owner_exc = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="user is not owner",
)
