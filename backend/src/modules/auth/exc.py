from fastapi import HTTPException, status

incorrect_login_or_password_exc = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect username or password",
)

user_is_exist_exc = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="User is exist",
)

invalid_token_exc = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="invalid token (refresh)",
)

user_is_not_admin_exc = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="User is not admin",
)