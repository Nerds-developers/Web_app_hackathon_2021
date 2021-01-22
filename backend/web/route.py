from flask import Blueprint

index = Blueprint("main_page", __name__)


@index.route("/")
def root():
    return "Hello world"
