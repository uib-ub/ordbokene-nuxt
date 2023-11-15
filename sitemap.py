import requests
import math
import xml.etree.ElementTree as ET

BASEURL = "https://dev.ordbokene.no"

def compile_urls():
    bm = requests.get('https://ord.uib.no/bm/fil/lemma.json').json()
    nn = requests.get('https://ord.uib.no/nn/fil/lemma.json').json()

    bm_searches = {item[0] for item in bm}
    nn_searches = {item[0] for item in nn}
    searches = [f'/bm,nn/{word}' for word in bm_searches if word in nn_searches]

    bm_articles = {f'/bm/{item[1]}' for item in bm}
    nn_articles = {f'/nn/{item[1]}' for item in nn}

    return searches + list(bm_articles) + list(nn_articles)

seen = set()
def save_sitemap_chunk(num, pages, urls):
    offset = 10000*(num - 1)
    end = 10000*num
    root = ET.Element('urlset', attrib={'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'})   
    chunk = urls[offset:end]

    for route in chunk:
        assert route not in seen
        seen.add(route)
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

        if num > 0:
            save_sitemap_chunk(num, pages, urls)

    urlset = set(urls)

    tree = ET.ElementTree(root)
    ET.indent(tree)
    
    tree.write('sitemap_index.xml', encoding='utf-8', xml_declaration=True)
        
        
        

    
    
    