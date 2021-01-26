from flask_restful import Resource
from datetime import datetime, timedelta

from backend.web.models import ProductItem, db
from backend.processing.postprocessing import postprocessing
from backend.core.local_logging import get_logger

logger = get_logger(__name__)


class GrechkaApi(Resource):
    def get(self):
        """Handle get requests"""
        result_set = ProductItem.query.all()
        return postprocessing(result_set)
