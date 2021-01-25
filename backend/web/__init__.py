from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
import os

from backend.web.api import GrechkaApi
from backend.web.models import db, ProductItem


def create_app():
    """Application factory for Flask"""
    app = Flask(__name__)
    app.config.from_mapping(
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        SQLALCHEMY_DATABASE_URI=os.getenv("DB_URI")
    )
    api = Api(app)
    api.add_resource(GrechkaApi, "/api/grechka")
    db.init_app(app)
    Migrate(app, db)

    app.app_context().push()
    db.create_all()

    item = ProductItem(title="h", price=1, producer="p", prod_link="http", image_link="http")
    db.session.add(item)
    db.session.commit()

    return app
