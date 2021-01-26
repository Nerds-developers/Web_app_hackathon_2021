from functools import lru_cache, wraps
import sys
import logging
from datetime import datetime


@lru_cache(maxsize=None)
def get_logger(name):
    logger = logging.getLogger(name)
    logger.setLevel("INFO")
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter(
        fmt="%(asctime)s %(name)s %(levelname)s %(message)s",
        datefmt="%H:%M:%S"))
    logger.addHandler(handler)
    return logger


def timing(logger):
    def decorator(function):
        @wraps(function)
        def arguments_handler(*args, **kwargs):
            start = datetime.now()
            try:
                result = function(*args, **kwargs)
            finally:
                finish = datetime.now()
                logger.info("Function {} took {}".format(function.__name__, finish - start))
            return result
        return arguments_handler
    return decorator
