from flask import Flask

from backend.web.route import index


def create_app():
    app = Flask(__name__)
    app.register_blueprint(index)
