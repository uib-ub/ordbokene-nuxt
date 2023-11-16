import requests
import math
import xml.etree.ElementTree as ET
import sys

LOCALECONFIG = [
        {"lang": 'en', "locale": 'eng'},
        {"lang": 'nn', "locale": 'nno'},
        {"lang": 'nb', "locale": 'nob'},
        {"lang": 'uk', "locale": 'ukr'},
    ]

PAGES = ['', 'bm', 'nn', 'search', 'help', 'about', 'contact' ]

BASEURL = "https://test.ordbokene.no" if len(sys.argv) > 1 and sys.argv[1] == 'main' else "https://dev.ordbokene.no"

def compile_urls():
    bm = requests.get('https://ord.uib.no/bm/fil/lemma.json').json()
    nn = requests.get('https://ord.uib.no/nn/fil/lemma.json').json()

    bm_searches = {item[0] for item in bm}
    nn_searches = {item[0] for item in nn}
    searches = [f'/bm,nn/{word}' for word in bm_searches if word in nn_searches]

    bm_articles = {f'/bm/{item[1]}' for item in bm}
    nn_articles = {f'/nn/{item[1]}' for item in nn}

    return searches + list(bm_articles) + list(nn_articles)

def save_static_sitemap():
    root = ET.Element('urlset', attrib={'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9', ' xmlns:xhtml': 'http://www.w3.org/1999/xhtml'})   
    for page in PAGES:
        url = ET.SubElement(root, 'url')
        loc = ET.SubElement(url, 'url')
        loc.text = BASEURL + page
        for locale_info in LOCALECONFIG:
            link = ET.SubElement(root, 'xhtml:link', attrib={'rel': 'alternate', 'hreflang': locale_info["lang"], 'href': BASEURL + locale_info["locale"]+ page})


    tree = ET.ElementTree(root)
    ET.indent(tree)
    tree.write(f'sitemaps/0-sitemap.xml', encoding='utf-8', xml_declaration=True)


def save_sitemap_chunk(num, pages, urls):
    offset = 10000*(num - 1)
    end = 10000*num
    root = ET.Element('urlset', attrib={'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'})   
    chunk = urls[offset:end]

    for route in chunk:
        url = ET.SubElement(root, 'url')
        loc = ET.SubElement(url, 'loc')
        loc.text = BASEURL + route
    
    tree = ET.ElementTree(root)
    ET.indent(tree)
    tree.write(f'sitemaps/{num}-sitemap.xml', encoding='utf-8', xml_declaration=True)




if __name__ == "__main__":
    urls = compile_urls()
    pages = (math.ceil(len(urls) / 10000))
    root = ET.Element('sitemapindex', attrib={'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'})   

    for num in range(pages + 1):
        sitemap = ET.SubElement(root, 'sitemap')
        loc = ET.SubElement(sitemap, 'loc')
        loc.text = f"{BASEURL}/api/{num}-sitemap.xml"

        if num == 0:
            save_static_sitemap()
        else:
            save_sitemap_chunk(num, pages, urls)

    urlset = set(urls)

    tree = ET.ElementTree(root)
    ET.indent(tree)
    
    tree.write('sitemaps/sitemap_index.xml', encoding='utf-8', xml_declaration=True)
        
        
        

    
    
    