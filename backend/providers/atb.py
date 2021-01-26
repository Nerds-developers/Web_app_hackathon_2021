import re

from backend.web.models import ProductItem
from backend.providers.helpers import fetch, calc_price_for_one_kg, clean_title
from backend.core.local_logging import get_logger, timing

logger = get_logger(__name__)

query_link = "https://zakaz.atbmarket.com/search/450?text=гречана"
host = "https://zakaz.atbmarket.com"


@timing(logger)
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
    cost = get_cost(product_page)
    final_title = clean_title(title, producer)
    image_link = get_image_link(product_page)
    item = ProductItem(title=final_title, price=calc_price_for_one_kg(title, cost),
                       producer=producer, prod_link=link, image_link=image_link)
    return item


def get_title(product_page):
    title = product_page.find("h2", class_="product-right__subtitle").text
    return title


def get_producer(page):
    producer = page.find("div", class_="collection-brand-filter").find("a").text.strip().lower()
    return producer


def get_cost(page):
    price_tags = page.find("div", class_="product-right").find("span", "price").contents
    before_point = price_tags[0]
    after_point = re.findall(r"\b(\d+)\b", price_tags[1].text)[0]
    price = float("{}.{}".format(before_point, after_point))
    return price


def get_image_link(page):
    image_link = page.find("div", class_="product-slick").find("img", class_="img-fluid")["src"]
    return image_link
