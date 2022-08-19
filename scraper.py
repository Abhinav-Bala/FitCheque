import json
from unicodedata import category
import pandas as pd
from bs4 import BeautifulSoup 
import requests 
from fake_useragent import UserAgent
from time import sleep

def find_last_page(soup):
    try:
        last_page = page_soup.find('li', class_='pagination__last-page').text
        last_page = last_page.split("\n")
        return int(last_page[1])
    except IndexError:
        return 1

def scrape_product(soup, data, gen):
    #find all products in a page
    product_list = soup.find_all('script', type='application/ld+json')

    #scrape invidivual product info
    for product in product_list:
        processed_product_info = json.loads(product.text)
        product_dict = {
            "Name": processed_product_info['name'],
            "Brand": processed_product_info['brand']['name'],
            "Price": processed_product_info['offers']['price'],
            "Image": processed_product_info['image'],
            "ProductID": processed_product_info['productID'],
            "Gender": gen,
        }
        data.append(product_dict)
    return data

def construct_url(category, gender, page=''):
    url = main_page + gender + "/" + category + "?page=" + str(page)
    return url

# URLS
main_page = 'https://www.ssense.com/en-ca/'
gender = ['men', 'women']
categories = ['accessories', 'bags', 'shoes', 'jackets-coats', 'tops', 'sweaters', 'pants', 'jeans', 'shorts']


# setup requests
ua = UserAgent()
session = requests.Session()
session.headers.update({'User-Agent': ua.random})
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'}

for i in range(len(categories) - 1, len(categories)):
    
    cat_list = []

    for g in gender:

        # parse html
        url = construct_url(categories[i], g)
        page = session.get(url,headers=headers)
        page_soup = BeautifulSoup(page.content, 'html.parser')
        page.close()
        scrape_product(page_soup, cat_list, g)

        last_page = find_last_page(page_soup)
        
        curr_page = 2

        while curr_page <= 2: # change this to: while curr_page <= last_page:
            url = construct_url(categories[i], g, page=curr_page)
            page = session.get(url,headers=headers)
            page_soup = BeautifulSoup(page.content, 'html.parser')
            scrape_product(page_soup, cat_list, g)
            curr_page+=1
            break # delete this on lamda
    
        # generates the dataframe    
        df = pd.DataFrame.from_dict(cat_list)
        df.to_csv(categories[i] + '-' + g + '.csv')




