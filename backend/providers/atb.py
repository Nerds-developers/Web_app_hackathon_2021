import re

from backend.core.typing import ProductItem
from backend.providers import fetch, get_price_coefficient, clean_title

query_link = "https://zakaz.atbmarket.com/search/450?text=гречана"
host = "https://zakaz.atbmarket.com"


def parse():
    parsed_result_page = fetch(query_link)
    prod_links = get_product_links(parsed_result_page)
    items = [get_product_item(link) for link in prod_links]
    return items


def get_product_links(parsed_page):
    products_details = parsed_page.find("div", class_="search-results-section").\
        find_all("div", class_="product-detail")
    links = ["{}{}".format(host, prod_det.find("a")["href"]) for prod_det in products_details]
    return links


def get_product_item(link):
    product_page = fetch(link)
    title = get_title(product_page)
    producer = get_producer(product_page)
    price = get_price(product_page)
    price_coef = get_price_coefficient(title)
    title = clean_title(title, producer)
    item = ProductItem(title=title, cost=price, price=price * price_coef,
                       link=link, packages_number=1, producer=producer)
    return item


def get_title(product_page):
    title = product_page.find("h2", class_="product-right__subtitle").text
    return title


def get_producer(page):
    producer = page.find("div", class_="collection-brand-filter").find("a").text.strip().lower()
    return producer


def get_price(page):
    price_tags = page.find("div", class_="product-right").find("span", "price").contents
    before_point = price_tags[0]
    after_point = re.findall(r"\b(\d+)\b", price_tags[1].text)[0]
    price = float("{}.{}".format(before_point, after_point))
    return price


for item in parse():
    print(item)
