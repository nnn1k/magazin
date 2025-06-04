from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory='frontend')

router = APIRouter(
    prefix="",
)


@router.get("/")
def main_page(request: Request):
    return templates.TemplateResponse("/main_page/main_page.html", {"request": request})


@router.get("/profile")
def profile_page(request: Request):
    user_type = request.cookies.get("user_type")
    if not user_type:
        return templates.TemplateResponse("/auth/auth.html", {"request": request})
    if user_type == 'admin':
        return templates.TemplateResponse("/admin/admin.html", {"request": request})
    return templates.TemplateResponse("/profile/profile.html", {"request": request})


@router.get("/admin")
def admin_page(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        return templates.TemplateResponse("/auth/auth.html", {"request": request})
    return templates.TemplateResponse("/admin/admin.html", {"request": request})


@router.get("/login")
def login_page(request: Request):
    return templates.TemplateResponse("/auth/auth.html", {"request": request})


@router.get("/catalog")
def catalog_page(request: Request):
    return templates.TemplateResponse("/catalog_page/catalog_page.html", {"request": request})


@router.get("/about")
def about_page(request: Request):
    return templates.TemplateResponse("/about_page/about_page.html", {"request": request})



