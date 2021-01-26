from backend.providers.metro import parse as metro_parse
from backend.providers.atb import parse as atb_parse
from backend.providers.eko import parse as eko_parse
from backend.nlp.nlp import get_lemmas
from backend.core.local_typing import ProductInterface

parsers = [metro_parse, atb_parse, eko_parse]


def process():
    parsed_items = [prod_item for parser in parsers
                    for prod_item in parser()]
    return parsed_items


def postprocessing(prod_items):
    items_for_interfaces = {}
    for item in prod_items:
        lemma = frozenset(get_lemmas(item.title))
        if lemma in items_for_interfaces.keys():
            items_for_interfaces[lemma] += [item]
        else:
            items_for_interfaces[lemma] = [item]
    interfaces = [build_product_interface(prod_items) for prod_items in items_for_interfaces.values()]
    return interfaces


def build_product_interface(products):
    title = products[0].title
    producers = list()
    prices = list()
    links = list()
    for prod_item in products:
        producers.append(prod_item.producer)
        prices.append(prod_item.price)
        links.append(prod_item.link)
    return ProductInterface(title=title, producers=producers, prices=prices, links=links)
