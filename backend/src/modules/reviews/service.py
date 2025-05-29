from backend.src.modules.reviews.repository import ReviewRepository


class ReviewService:

    def __init__(self, review_repo: ReviewRepository):
        self.review_repo = review_repo
