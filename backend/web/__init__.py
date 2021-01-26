import os
from celery import Celery

celery = Celery(__name__,
                CELERY_BROKER_URL=os.getenv("CELERY_BROKER_URL"),
                CELERY_RESULT_BACKEND=os.getenv("CELERY_RESULT_BACKEND"))
