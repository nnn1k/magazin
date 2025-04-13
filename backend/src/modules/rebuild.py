def rebuild_schemas():
    from backend.src.modules.carts.schemas import CartSchema
    from backend.src.modules.products.schemas import ProductSchema
    CartSchema.model_rebuild()
