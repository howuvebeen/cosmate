import requests
import csv
from datetime import datetime
from bs4 import BeautifulSoup

FACIAL_CLEANSING_URL = "https://www.glowpick.com/beauty/ranking?id=32&level=2"
MAKEUP_CLEANSING_URL = "https://www.glowpick.com/beauty/ranking?id=33&level=2"
SKIN_URL = "https://www.glowpick.com/beauty/ranking?id=1&level=2"
LOTION_URL = "https://www.glowpick.com/beauty/ranking?id=2&level=2"
ESSENCE_URL = "https://www.glowpick.com/beauty/ranking?id=3&level=2"
CREAM_URL = "https://www.glowpick.com/beauty/ranking?id=4&level=2"
MIST_URL = "https://www.glowpick.com/beauty/ranking?id=5&level=2"
FACE_MASK_URL = "https://www.glowpick.com/beauty/ranking?id=38&level=2"
SUNSCREEN_URL = "https://www.glowpick.com/beauty/ranking?id=41&level=2"


FACIAL_CLEANSING_PAGE = requests.get(FACIAL_CLEANSING_URL)
MAKEUP_CLEANSING_PAGE = requests.get(MAKEUP_CLEANSING_URL)
SKIN_PAGE = requests.get(SKIN_URL)
LOTION_PAGE = requests.get(LOTION_URL)
ESSENCE_PAGE = requests.get(ESSENCE_URL)
CREAM_PAGE = requests.get(CREAM_URL)
MIST_PAGE = requests.get(MIST_URL)
FACE_MASK_PAGE = requests.get(FACE_MASK_URL)
SUNSCREEN_PAGE = requests.get(SUNSCREEN_URL)

FACIAL_CLEANSING_SOUP = BeautifulSoup(
    FACIAL_CLEANSING_PAGE.content, 'html.parser', from_encoding='utf-8')
MAKEUP_CLEANSING_SOUP = BeautifulSoup(
    MAKEUP_CLEANSING_PAGE.content, 'html.parser', from_encoding='utf-8')
SKIN_SOUP = BeautifulSoup(
    SKIN_PAGE.content, 'html.parser', from_encoding='utf-8')
LOTION_SOUP = BeautifulSoup(
    LOTION_PAGE.content, 'html.parser', from_encoding='utf-8')
ESSENCE_SOUP = BeautifulSoup(
    ESSENCE_PAGE.content, 'html.parser', from_encoding='utf-8')
CREAM_SOUP = BeautifulSoup(
    CREAM_PAGE.content, 'html.parser', from_encoding='utf-8')
MIST_SOUP = BeautifulSoup(
    MIST_PAGE.content, 'html.parser', from_encoding='utf-8')
FACE_MASK_SOUP = BeautifulSoup(
    FACE_MASK_PAGE.content, 'html.parser', from_encoding='utf-8')
SUNSCREEN_SOUP = BeautifulSoup(
    SUNSCREEN_PAGE.content, 'html.parser', from_encoding='utf-8')

FACIAL_C_product_brand_list = []
FACIAL_C_product_name_list = []
MAKEUP_C_product_brand_list = []
MAKEUP_C_product_name_list = []
SKIN_product_brand_list = []
SKIN_product_name_list = []
LOTION_product_brand_list = []
LOTION_product_name_list = []
ESSENCE_product_brand_list = []
ESSENCE_product_name_list = []
CREAM_product_brand_list = []
CREAM_product_name_list = []
MIST_product_brand_list = []
MIST_product_name_list = []
FACE_MASK_product_brand_list = []
FACE_MASK_product_name_list = []
SUNSCREEN_product_brand_list = []
SUNSCREEN_product_name_list = []

FACIAL_C_raw_brand_list = FACIAL_CLEANSING_SOUP.find_all(
    class_="details__labels__brand")[0:5]
FACIAL_C_raw_name_list = FACIAL_CLEANSING_SOUP.find_all(
    class_="details__labels__name")[0:5]
MAKEUP_C_raw_brand_list = MAKEUP_CLEANSING_SOUP.find_all(
    class_="details__labels__brand")[0:5]
MAKEUP_C_raw_name_list = MAKEUP_CLEANSING_SOUP.find_all(
    class_="details__labels__name")[0:5]
SKIN_raw_brand_list = SKIN_SOUP.find_all(
    class_="details__labels__brand")[0:5]
SKIN_raw_name_list = SKIN_SOUP.find_all(
    class_="details__labels__name")[0:5]
LOTION_raw_brand_list = LOTION_SOUP.find_all(
    class_="details__labels__brand")[0:5]
LOTION_raw_name_list = LOTION_SOUP.find_all(
    class_="details__labels__name")[0:5]
ESSENCE_raw_brand_list = ESSENCE_SOUP.find_all(
    class_="details__labels__brand")[0:5]
ESSENCE_raw_name_list = ESSENCE_SOUP.find_all(
    class_="details__labels__name")[0:5]
CREAM_raw_brand_list = CREAM_SOUP.find_all(
    class_="details__labels__brand")[0:5]
CREAM_raw_name_list = CREAM_SOUP.find_all(
    class_="details__labels__name")[0:5]
MIST_raw_brand_list = MIST_SOUP.find_all(
    class_="details__labels__brand")[0:5]
MIST_raw_name_list = MIST_SOUP.find_all(
    class_="details__labels__name")[0:5]
FACE_MASK_raw_brand_list = FACE_MASK_SOUP.find_all(
    class_="details__labels__brand")[0:5]
FACE_MASK_raw_name_list = FACE_MASK_SOUP.find_all(
    class_="details__labels__name")[0:5]
SUNSCREEN_raw_brand_list = SUNSCREEN_SOUP.find_all(
    class_="details__labels__brand")[0:5]
SUNSCREEN_raw_name_list = SUNSCREEN_SOUP.find_all(
    class_="details__labels__name")[0:5]

for i in range(len(SUNSCREEN_raw_name_list)):
    FACIAL_C_product_brand_list.append(
        str(FACIAL_C_raw_brand_list[i].get_text()))
    FACIAL_C_product_name_list.append(
        str(FACIAL_C_raw_name_list[i].get_text()))
    MAKEUP_C_product_brand_list.append(
        str(MAKEUP_C_raw_brand_list[i].get_text()))
    MAKEUP_C_product_name_list.append(
        str(MAKEUP_C_raw_name_list[i].get_text()))
    SKIN_product_brand_list.append(str(SKIN_raw_brand_list[i].get_text()))
    SKIN_product_name_list.append(str(SKIN_raw_name_list[i].get_text()))
    LOTION_product_brand_list.append(str(LOTION_raw_brand_list[i].get_text()))
    LOTION_product_name_list.append(str(LOTION_raw_name_list[i].get_text()))
    ESSENCE_product_brand_list.append(
        str(ESSENCE_raw_brand_list[i].get_text()))
    ESSENCE_product_name_list.append(str(ESSENCE_raw_name_list[i].get_text()))
    CREAM_product_brand_list.append(str(CREAM_raw_brand_list[i].get_text()))
    CREAM_product_name_list.append(str(CREAM_raw_name_list[i].get_text()))
    MIST_product_brand_list.append(str(MIST_raw_brand_list[i].get_text()))
    MIST_product_name_list.append(str(MIST_raw_name_list[i].get_text()))
    FACE_MASK_product_brand_list.append(
        str(FACE_MASK_raw_brand_list[i].get_text()))
    FACE_MASK_product_name_list.append(
        str(FACE_MASK_raw_name_list[i].get_text()))
    SUNSCREEN_product_brand_list.append(str(SKIN_raw_brand_list[i].get_text()))
    SUNSCREEN_product_name_list.append(str(SKIN_raw_name_list[i].get_text()))

    # open a csv file with append, so old data will not be erased
with open('6-8-20 Top 10 in Category.csv', 'a', encoding='utf-8', newline="") as csv_file:
    wr = csv.writer(csv_file)
    for j in range(len(SUNSCREEN_raw_name_list)):
        wr.writerow(
            [FACIAL_C_product_brand_list[j], FACIAL_C_product_name_list[j], MAKEUP_C_product_brand_list[j], MAKEUP_C_product_name_list[j], SKIN_product_brand_list[j], SKIN_product_name_list[j], LOTION_product_brand_list[j], LOTION_product_name_list[j], ESSENCE_product_brand_list[j], ESSENCE_product_name_list[j], CREAM_product_brand_list[j], CREAM_product_name_list[j], MIST_product_brand_list[j], MIST_product_name_list[j], FACE_MASK_product_brand_list[j], FACE_MASK_product_name_list[j], SUNSCREEN_product_brand_list[j], SUNSCREEN_product_name_list[j]])
