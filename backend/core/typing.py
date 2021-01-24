"""Types used in project"""
from pydantic import BaseModel


class ProductItem(BaseModel):
    """Typing for getting parsed products"""

    title: str
    cost: float
    price: float
    link: str
    packages_number: int
    producer: str
