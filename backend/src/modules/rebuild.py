def rebuild_schemas():
    from backend.src.modules.carts.schemas import CartSchema
    from backend.src.modules.orders.schemas import OrderSchema
    from backend.src.modules.products.schemas import ProductSchema
    from backend.src.modules.users.schemas import UserSchema
    from backend.src.modules.reviews.schemas import ReviewSchema

    CartSchema.model_rebuild()
    OrderSchema.model_rebuild()
    ProductSchema.model_rebuild()
    ReviewSchema.model_rebuild()
    UserSchema.model_rebuild()
