"""Types used in project"""
from typing import Tuple
from pydantic import BaseModel


class ProductItem(BaseModel):
    """Typing for getting parsed products"""

    title: str
    cost: float
    price: float
    link: str
    packages_number: int
    producer: str


class ProductInterface(BaseModel):
    """Typing for sending products to frontend"""
    title: str
    price: float
    producers: Tuple[str, ...]
    links: Tuple[str, ...]
