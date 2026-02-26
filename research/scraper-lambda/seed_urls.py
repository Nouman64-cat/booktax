import requests
import boto3
import xml.etree.ElementTree as ET
import yaml

with open("config.yml", "r") as f:
    config = yaml.safe_load(f)

TABLE_NAME = config['dynamodb']['table_name']
STATUS_PENDING = config['dynamodb']['status_pending']
IRS_SITEMAP = config['scrapers']['irs_sitemap_url']

session = boto3.Session(profile_name='zygotrix', region_name='us-east-1')
dynamodb = session.resource('dynamodb')
table = dynamodb.Table(TABLE_NAME)

def fetch_and_parse(url):
    print(f"Fetching: {url}")
    response = requests.get(url, timeout=15)
    response.raise_for_status()
    
    root = ET.fromstring(response.content)
    
    for elem in root.iter():
        if '}' in elem.tag:
            elem.tag = elem.tag.split('}', 1)[1]
            
    extracted_urls = []
    
    if root.tag == 'sitemapindex':
        for loc in root.findall('.//loc'):
            extracted_urls.extend(fetch_and_parse(loc.text))
    elif root.tag == 'urlset':
        for loc in root.findall('.//loc'):
            extracted_urls.append(loc.text)
            
    return extracted_urls

def seed_database():
    all_urls = fetch_and_parse(IRS_SITEMAP)
    target_urls = list(set([u for u in all_urls if '/taxtopics/' in u and '/es/' not in u]))
    print(f"Found {len(target_urls)} relevant URLs to queue.")

    with table.batch_writer() as batch:
        for url in target_urls:
            batch.put_item(
                Item={
                    'url': url,
                    'status': STATUS_PENDING
                }
            )
            
    print("Database seeding complete.")

if __name__ == "__main__":
    seed_database()