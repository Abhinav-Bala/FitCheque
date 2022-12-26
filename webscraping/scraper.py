import json
from unicodedata import category
import pandas as pd
from bs4 import BeautifulSoup 
import requests 
from fake_useragent import UserAgent
from time import sleep

def find_last_page(soup):
    try:
        last_page = soup.find('li', class_='pagination__last-page').text
        last_page = last_page.split("\n")
        print(last_page[1]) # delete this
        return int(last_page[1])
    except IndexError:
        return 1
    except AttributeError:
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
categories = ['jackets-coats']


# setup requests
ua = UserAgent()
session = requests.Session()
session.headers.update({'User-Agent': ua.random})
headers = {'User-Agent': "Mozilla/5.0 (Linux; Android 11; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Mobile Safari/537.36"}

for i in range(0, len(categories)):

    for g in gender:

        cat_list = []
        
        # parse html
        url = construct_url(categories[i], g)
        page = session.get(url,headers=headers)
        page_soup = BeautifulSoup(page.content, 'html.parser')

        page.close()
        print(page_soup)
        scrape_product(page_soup, cat_list, g)

        last_page = find_last_page(page_soup)
        print(last_page)
        last_page = last_page/2

        curr_page = 2

        while curr_page <= last_page: # change this to: while curr_page <= last_page:
            url = construct_url(categories[i], g, page=curr_page)
            sleep(2)
            page = session.get(url,headers=headers)
            
            page_soup = BeautifulSoup(page.content, 'html.parser')
            scrape_product(page_soup, cat_list, g)
            curr_page+=1
            
    
        # generates the dataframe    
        df = pd.DataFrame.from_dict(cat_list)
        df.to_csv(categories[i] + '-' + g + '.csv')
