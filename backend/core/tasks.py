from celery import Celery, group
import os

from backend.providers.metro import parse as metro_parser
from backend.providers.atb import parse as atb_parser
from backend.providers.eko import parse as eko_parser

celery = Celery(__name__,
                CELERY_BROKER_URL=os.getenv("CELERY_BROKER_URL"),
                CELERY_RESULT_BACKEND=os.getenv("CELERY_RESULT_BACKEND"))


@celery.task
def parse_metro():
    return metro_parser()


@celery.task
def parse_atb():
    return atb_parser()


@celery.task
def parse_eko():
    return eko_parser()
