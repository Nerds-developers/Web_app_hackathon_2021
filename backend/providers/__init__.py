from bs4 import BeautifulSoup
from random import choice
from requests import get
import json

user_agents_path = "/backend/providers/user_agents.json"
with open(user_agents_path) as af:
    user_agents = json.load(af)


def fetch(url):
    text = get(url, headers={"User-Agent": choice(user_agents)}).text
    return BeautifulSoup(text, "lxml")
