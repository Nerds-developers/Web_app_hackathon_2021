from flask_restful import Resource
from flask import jsonify


class GrechkaApi(Resource):

    def get(self):
        """Handle get requests"""
        return jsonify("Still do not work")
