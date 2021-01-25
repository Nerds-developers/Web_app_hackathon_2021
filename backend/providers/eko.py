import re

from backend.providers.helpers import load_data, fetch, extract_price, calc_price_for_one_kg, clean_title
from backend.core.local_typing import ProductItem

query_url = "https://stores-api.zakaz.ua/stores/48280214/products/search/?q=крупа гречана"


def parse():
    response = load_data(query_url)
    links = get_prod_links(response)
    items = [get_prod_item(prod_link) for prod_link in links]
    return items


def get_prod_links(response):
    json_results = response.json()["results"]
    links = [re.sub("/en/", "/uk/", item_obj["web_url"]) for item_obj in json_results]
    return links


def get_prod_item(link):
    prod_page = fetch(link)
    title = get_title(prod_page)
    cost = get_cost(prod_page)
    producer = get_producer(prod_page)
    final_title = clean_title(title, producer)
    item = ProductItem(title=final_title, cost=cost, price=calc_price_for_one_kg(final_title, cost),
                       link=link, packages_number=1, producer=producer)
    return item


def get_title(page):
    title = page.find("h1", class_="big-product-card__title").text
    return title


def get_cost(page):
    price_text = page.find("div", class_="BigProductCard__topInfo").\
        find("span", class_="Price__value_title").text
    float_price = extract_price(price_text)
    return float_price


def get_producer(page):
    producer_tag = page.find("a", class_="BigProductCardTrademarkName")
    producer = producer_tag.text.lower() if producer_tag is not None else "self-developed"
    return producer


for item in parse():
    print(item)
