from bs4 import BeautifulSoup
from random import choice
from requests import get
import json
import re

user_agents_path = "/backend/providers/user_agents.json"
with open(user_agents_path) as af:
    user_agents = json.load(af)


def fetch(url):
    text = get(url, headers={"User-Agent": choice(user_agents)}).text
    return BeautifulSoup(text, "lxml")


def extract_price(price_text):
    price_with_comma = re.sub(r"(грн| )", "", price_text.text).strip()
    price_in_number = float(re.sub(r",", ".", price_with_comma))
    return price_in_number


def clean_title(title, producer):
    title = re.sub(r"\b(\d+)(г|кг)\b", "", title.lower())
    title = re.sub(producer, "", title).strip()
    return title
