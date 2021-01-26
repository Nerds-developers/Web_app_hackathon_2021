from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
import os

from backend.web.api import GrechkaApi
from backend.web.models import db
from backend.web.celery_utils import init_celery
from backend.web import celery


def create_app():
    """Application factory for Flask"""
    app = Flask(__name__)
    app.config.from_mapping(
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        SQLALCHEMY_DATABASE_URI=os.getenv("DB_URI"),
        CELERY_BROKER_URL=os.getenv("CELERY_BROKER_URL"),
        CELERY_RESULT_BACKEND=os.getenv("CELERY_RESULT_BACKEND")
    )
    init_celery(app, celery)
    api_instance = Api(app)
    api_instance.add_resource(GrechkaApi, "/api/grechka")
    db.init_app(app)
    Migrate(app, db)
    app.app_context().push()
    db.create_all()
    return app
