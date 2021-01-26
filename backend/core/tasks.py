from celery.schedules import crontab

from backend.processing.processing import process
from backend.web.models import db
from backend.web import celery
from backend.web.celery_utils import init_celery
from backend.web.wsgi_wrapper import application

init_celery(application, celery)


@celery.task
def parse_all():
    results = process()
    for item in results:
        db.session.add(item)
    db.session.commit()


celery.conf.beat_schedule = {
    "fetch-products-to-db": {
        "task": "backend.core.tasks.parse_all",
        "schedule": crontab(minute="*/5")
    }
}
