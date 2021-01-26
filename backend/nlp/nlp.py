from tokenize_uk import tokenize_words
from uk_stemmer import UkStemmer

from backend.nlp.helpers import load_stop_words

stop_words = load_stop_words()
stemmer = UkStemmer()


def get_lemmas(text):
    words = [token for token in tokenize_words(text) if token.isalpha()]
    not_stop_words = [word for word in words if word not in stop_words]
    lemmas = [stemmer.stem_word(word) for word in not_stop_words]
    return lemmas
