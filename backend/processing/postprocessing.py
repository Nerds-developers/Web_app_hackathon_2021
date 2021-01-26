from backend.nlp.nlp import get_lemmas


def postprocessing(prod_items):
    items_for_interfaces = {}
    for item in prod_items:
        lemma = frozenset(get_lemmas(item.title) + [item.producer])
        if lemma in items_for_interfaces.keys():
            items_for_interfaces[lemma] += [item]
        else:
            items_for_interfaces[lemma] = [item]
    interfaces = [build_product_interface(prod_items) for prod_items in items_for_interfaces.values()]
    return interfaces


def build_product_interface(products):
    title = products[0].title
    producer = products[0].producer
    image_link = products[0].image_link
    prices = list()
    links = list()
    for prod_item in products:
        prices.append("{}".format(prod_item.price))
        links.append(prod_item.product_link)
    return {"title": title,
            "producer": producer,
            "image_link": image_link,
            "prices": prices,
            "links": links}
