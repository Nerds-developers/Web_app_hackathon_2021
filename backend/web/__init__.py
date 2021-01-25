from flask import Flask
from flask_restful import Api

from backend.web.api import GrechkaApi


def create_app():
    """Application factory for Flask"""
    app = Flask(__name__)
    api = Api(app)
    api.add_resource(GrechkaApi, "/api/grechka")
    return app
