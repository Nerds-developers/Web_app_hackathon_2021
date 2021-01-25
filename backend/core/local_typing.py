"""Types used in project"""
from pydantic import BaseModel
from typing import List


class ProductItem(BaseModel):
    """Typing for getting parsed products"""

    title: str
    cost: float
    price: float
    link: str
    packages_number: int
    producer: str


class ProductInterface(BaseModel):
    """Product item for frontend"""
    title: str
    prices: List[float]
    producers: List[str]
    links: List[str]
