from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class ProductItem(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(60))
    price = db.Column(db.Numeric)
    product_link = db.Column(db.String(200))
    image_link = db.Column(db.String(200))
    producer = db.Column(db.String(50))
    adding_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, title, price, producer,  prod_link, image_link):
        self.title = title
        self.price = price
        self.product_link = prod_link
        self.image_link = image_link
        self.producer = producer
