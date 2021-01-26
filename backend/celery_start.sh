#!/bin/bash

celery -A backend.core.tasks beat -s ./celerybeat-schedule -l INFO &
celery -A backend.core.tasks worker -l INFO