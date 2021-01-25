from backend.providers.metro import parse as metro_parse
from backend.providers.atb import parse as atb_parse
from backend.providers.eko import parse as eko_parse
from backend.nlp.nlp import get_lemmas

parsers = [metro_parse, atb_parse, eko_parse]


def process():
    parsed_items = [prod_item for parser in parsers
                    for prod_item in parser()]
    return postprocessing(parsed_items)


def postprocessing(prod_items):
    results = {}
    for item in prod_items:
        lemma = frozenset(get_lemmas(item.title))
        if lemma in results.keys():
            results[lemma] += [item]
        else:
            results[lemma] = [item]
    return results


res = process()
print("here")

