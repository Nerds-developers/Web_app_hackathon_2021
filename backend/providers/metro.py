import re
from datetime import datetime

from backend.providers import fetch
from backend.core.typing import ProductItem

query_uri = "https://shop.metro.ua/ua/search/?q=гречка"


def parse():
    search_result = fetch(query_uri)
    product_links = get_product_links(search_result)
    result_items = [parse_product_items(prod_link) for prod_link in product_links]
    return result_items


def get_product_links(search_result):
    products_group = search_result.find("div", class_="catalog_list")
    product_divs = products_group.find_all("div", class_="product")
    product_links = [prod_div.find("a", class_="product_name")["href"] for prod_div in product_divs]
    return product_links


def parse_product_items(prod_link):
    product_page_parsed = fetch(prod_link)
    prices, volumes = parse_price_data(product_page_parsed)
    title = product_page_parsed.find("h3", class_="productDetail_right_name").text
    price_coef = get_price_coefficient(title)
    producer = get_producer(product_page_parsed)
    final_title = clean_title(title, producer)
    items = [ProductItem(title=final_title, cost=price, price=price * price_coef,
                         link=prod_link, packages_number=volume, producer=producer)
             for price, volume in zip(prices, volumes)]
    return items


def parse_price_data(product_page_parsed):
    prices_table = product_page_parsed.find("table", class_="price")
    prices = get_float_prices(prices_table)
    volumes = get_int_volumes(prices_table)
    return prices, volumes


def get_float_prices(prices_table):
    text_prices = [re.sub(r"(грн| )", "", price_text.text).strip() for price_text in
                   prices_table.find_all("strong")]
    prices = [float(re.sub(r",", ".", price)) for price in text_prices]
    return prices


def get_int_volumes(prices_table):
    text_volumes = [volume.text for volume in prices_table.find_all("td")
                    if re.match(r"^.+шт.*$", volume.text) is not None]
    volumes = [re.findall(r"\d+", text_volume)[0] for text_volume in text_volumes]
    return volumes


def get_price_coefficient(title):
    weight_number, weight_measure = re.findall(r"\b(\d+)(г|кг)\b", title)[0]
    weight_number = float(weight_number)
    if weight_measure == "г":
        price_coef = 1 / (weight_number / 1000)
    else:
        price_coef = 1 / weight_number
    return price_coef


def get_producer(product_page_parsed):
    producer = product_page_parsed.find("div", class_="productDetail_tabs").find("table", class_="table").find("a").\
        text.lower()
    return producer


def clean_title(title, producer):
    title = re.sub(r"\b(\d+)(г|кг)\b", "", title.lower())
    title = re.sub(producer, "", title).strip()
    return title


parse()
