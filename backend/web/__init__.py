from flask import Flask

from backend.web.route import index


def create_app():
    """Application factory for Flask"""
    app = Flask(__name__)
    app.register_blueprint(index)
    return app
