from bs4 import BeautifulSoup
from random import choice
from requests import get
import json
import re

user_agents_path = "/home/alex/PycharmProjects/Web_app_hackathon_2021/backend/providers/user_agents.json"
with open(user_agents_path) as af:
    user_agents = json.load(af)


def fetch(url):
    text = get(url, headers={"User-Agent": choice(user_agents)}).text
    return BeautifulSoup(text, "lxml")


def extract_price(price_text):
    price_with_comma = re.sub(r"(грн| )", "", price_text.text).strip()
    price_in_number = float(re.sub(r",", ".", price_with_comma))
    return price_in_number


def get_price_coefficient(title):
    weight_number, weight_measure = re.findall(r"\b(\d+,?\d*)\s*(г|кг)\b", title)[0]
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
    return title
