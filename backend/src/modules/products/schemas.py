from pydantic import BaseModel, ConfigDict


class ProductSchema(BaseModel):
    id: int
    name: str
    price: float
    category: str
    image: str
    description: str

    reviews: list['ReviewSchema'] = []

    model_config = ConfigDict(from_attributes=True)


class ProductCreate(BaseModel):
    name: str
    price: float
    category: str
    image_url: str = ''
    description: str = ''
