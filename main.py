import os
import time

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.views.base import backend_router
from frontend.routers.routers import router as frontend_router
app = FastAPI()

app.include_router(backend_router)
app.include_router(frontend_router)
frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")
app.mount("/frontend", StaticFiles(directory=frontend_dir), name="static")


app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.middleware("http")
async def log_time_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    if request.url.path.startswith("/api"):
        print(
            f"{request.method} {request.url.path} - \n"
            f"Статус: {response.status_code} - Время обработки: {duration:.4f} секунд\n"
        )

    return response




