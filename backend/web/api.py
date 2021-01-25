from flask_restful import Resource
from flask import jsonify

from backend.processing.processing import process


class GrechkaApi(Resource):

    def get(self):
        """Handle get requests"""
        product_interfaces = process()
        return jsonify(eqlts=[interface.json() for interface in product_interfaces])
