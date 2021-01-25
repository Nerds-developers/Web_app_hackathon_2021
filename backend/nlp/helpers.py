import os


def load_stop_words():
    stop_words_file_name = "stop_words_ukrainian"
    scrpt_path = os.path.realpath(__file__)
    stop_words_file_path = "{}/{}".format(os.path.dirname(scrpt_path), stop_words_file_name)
    with open(stop_words_file_path, "rt") as fd:
        return [stop_word.strip() for stop_word in fd]
