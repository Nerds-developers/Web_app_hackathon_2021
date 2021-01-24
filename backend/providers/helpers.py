import json
import os
import re
from random import choice

from bs4 import BeautifulSoup
from requests import get

scrpt_path = os.path.realpath(__file__)
user_agents_path = os.path.dirname(scrpt_path) + "/user_agents.json"
with open(user_agents_path) as af:
    user_agents = json.load(af)


def fetch(url):
    text = load_data(url).text
    return BeautifulSoup(text, "lxml")


def load_data(url):
    text = get(url, headers={"User-Agent": choice(user_agents)})
    return text


def extract_price(price_text):
    price_with_comma = re.sub(r"(грн| )", "", price_text).strip()
    price_in_number = float(re.sub(r",", ".", price_with_comma))
    return price_in_number


def get_price_coefficient(title):
    found_weights_measures = re.findall(r"\b(\d+,?\d*)\s*(г|кг)\b", title)
    if len(found_weights_measures) == 0:
        return 1
    weight_number, weight_measure = found_weights_measures[0]
    weight_number = re.sub(" ", "", weight_number.strip())
    weight_number = float(re.sub(",", ".", weight_number))
    if weight_measure == "г":
        price_coef = 1 / (weight_number / 1000)
    else:
        price_coef = 1 / weight_number
    return price_coef


def clean_title(title, producer):
    title = re.sub(r"\b(\d+)(г|кг)\b", "", title.lower())
    title = re.sub(producer, "", title).strip()
    title = re.sub(r"\s+", " ", title)
    return title


def calc_price_for_one_kg(title, cost):
    price_coef = get_price_coefficient(title)
    return round(price_coef * cost, 2)
