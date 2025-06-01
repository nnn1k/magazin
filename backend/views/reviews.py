from fastapi import APIRouter, Depends

from backend.src.modules.auth.dependencies import get_user_by_token
from backend.src.modules.reviews.dependencies import get_review_serv
from backend.src.modules.reviews.schemas import ReviewCreate
from backend.src.modules.reviews.service import ReviewService
from backend.src.modules.users.schemas import UserSchema

router = APIRouter(
    prefix="/reviews",
    tags=["reviews"],
)


@router.post('/{product_id}')
async def create_review(
        new_review: ReviewCreate,
        product_id: int,
        user: UserSchema = Depends(get_user_by_token),
        service: ReviewService = Depends(get_review_serv)
):
    review = await service.create(user=user, new_review=new_review, product_id=product_id)
    return {'review': review}


@router.get('/{review_id}')
async def get_review(
        review_id: int,
        user: UserSchema = Depends(get_user_by_token),
        service: ReviewService = Depends(get_review_serv)
):
    reviews = await service.get_one(id=review_id)
    return {'reviews': reviews}


@router.get('')
async def get_all_review(
        user: UserSchema = Depends(get_user_by_token),
        service: ReviewService = Depends(get_review_serv)
):
    reviews = await service.get_one()
    return {'reviews': reviews}


@router.put('/{review_id}')
async def update_views(
        review_id: int,
        new_review: ReviewCreate,
        user: UserSchema = Depends(get_user_by_token),
        service: ReviewService = Depends(get_review_serv)
):
    review = await service.update(review_id=review_id, new_review=new_review, user=user)
    return {'review': review}


@router.delete('/{review_id}')
async def delete_review(
        review_id: int,
        user: UserSchema = Depends(get_user_by_token),
        service: ReviewService = Depends(get_review_serv)
):
    await service.delete(review_id=review_id, user=user)
    return {'status': True}

