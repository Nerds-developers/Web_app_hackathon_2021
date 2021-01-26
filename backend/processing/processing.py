from backend.providers.metro import parse as metro_parse
from backend.providers.atb import parse as atb_parse
from backend.providers.eko import parse as eko_parse

parsers = [metro_parse, atb_parse, eko_parse]


def process():
    parsed_items = [prod_item for parser in parsers
                    for prod_item in parser()]
    return parsed_items
