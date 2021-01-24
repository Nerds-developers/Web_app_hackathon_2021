import re

from backend.providers.helpers import fetch, extract_price, clean_title, calc_price_for_one_kg
from backend.core.typing import ProductItem

query_uri = "https://shop.metro.ua/ua/search/?q=гречка"


def parse():
    search_result = fetch(query_uri)
    product_links = get_product_links(search_result)
    results = [prod_item for prod_link in product_links
               for prod_item in parse_product_items(prod_link)]
    return results


def get_product_links(search_result):
    products_group = search_result.find("div", class_="catalog_list")
    product_divs = products_group.find_all("div", class_="product")
    product_links = [prod_div.find("a", class_="product_name")["href"] for prod_div in product_divs]
    return product_links


def parse_product_items(prod_link):
    product_page_parsed = fetch(prod_link)
    costs, volumes = parse_price_data(product_page_parsed)
    title = get_title(product_page_parsed)
    producer = get_producer(product_page_parsed)
    final_title = clean_title(title, producer)
    items = [ProductItem(title=final_title, cost=cost, price=calc_price_for_one_kg(title, cost),
                         link=prod_link, packages_number=volume, producer=producer)
             for cost, volume in zip(costs, volumes)]
    return items


def parse_price_data(product_page_parsed):
    prices_table = product_page_parsed.find("table", class_="price")
    prices = get_float_prices(prices_table)
    volumes = get_int_volumes(prices_table)
    return prices, volumes


def get_float_prices(prices_table):
    prices = [extract_price(price_text.text) for price_text in
              prices_table.find_all("strong")]
    return prices


def get_int_volumes(prices_table):
    text_volumes = [volume.text for volume in prices_table.find_all("td", text=re.compile(r"^.+шт.*$"))]
    volumes = [re.findall(r"\d+", text_volume)[0] for text_volume in text_volumes]
    return volumes


def get_title(product_page_parsed):
    title = product_page_parsed.find("h3", class_="productDetail_right_name").\
        text.strip().lower()
    return title


def get_producer(product_page_parsed):
    producer = product_page_parsed.find("div", class_="productDetail_tabs").find("table", class_="table").find("a").\
        text.lower()
    return producer


for i in parse():
    print(i)
