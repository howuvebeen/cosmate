import requests
from bs4 import BeautifulSoup

page = requests.get(
    'https://shopee.vn/-COSMALL66-10-%C4%90H250k-S%E1%BB%AFa-r%E1%BB%ADa-m%E1%BA%B7t-l%C3%A0m-s%E1%BA%A1ch-innisfree-Green-Tea-Foam-Cleanser-150ml-i.155343961.2357216222')


soup = BeautifulSoup(page.text, 'html.parser')
name_div = soup.find('html')

print(name_div.prettify)
