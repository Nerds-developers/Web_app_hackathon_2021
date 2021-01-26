from flask_restful import Resource
from flask import jsonify
from datetime import datetime, timedelta

from backend.web.models import ProductItem
from backend.processing.postprocessing import postprocessing


class GrechkaApi(Resource):
    def get(self):
        """Handle get requests"""
        result_set = ProductItem.query.all()
        return postprocessing(result_set)
