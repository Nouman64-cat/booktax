import os
import yaml
import uuid
import boto3
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from openai import OpenAI

from scrapers import IRSScraper, CRAScraper
from chunker import TextChunker

load_dotenv()
with open("config.yml", "r") as f:
    config = yaml.safe_load(f)

qdrant = QdrantClient(url=os.getenv("QDRANT_HOST"))
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
COLLECTION_NAME = config['qdrant']['collection_name']

# Initialize DynamoDB (AWS Lambda uses its assigned IAM role automatically)
dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table(config['dynamodb']['table_name'])

STATUS_PENDING = config['dynamodb']['status_pending']
STATUS_PROCESSED = config['dynamodb']['status_processed']
STATUS_ERROR = config['dynamodb']['status_error']

def init_qdrant():
    if not qdrant.collection_exists(collection_name=COLLECTION_NAME):
        qdrant.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=config['qdrant']['vector_size'], 
                distance=getattr(Distance, config['qdrant']['distance_metric'].upper())
            ),
        )

def update_status(url, status):
    table.update_item(
        Key={'url': url},
        UpdateExpression="set #s = :stat",
        ExpressionAttributeNames={'#s': 'status'},
        ExpressionAttributeValues={':stat': status}
    )

def lambda_handler(event, context):
    init_qdrant()
    chunker = TextChunker()
    
    # Query up to 5 PENDING URLs to stay safely within Lambda timeouts
    response = table.query(
        IndexName='StatusIndex',
        KeyConditionExpression='#s = :stat',
        ExpressionAttributeNames={'#s': 'status'},
        ExpressionAttributeValues={':stat': STATUS_PENDING},
        Limit=5
    )
    
    items = response.get('Items', [])
    if not items:
        print("No pending URLs found.")
        return {"statusCode": 200, "body": "No pending URLs found."}

    for item in items:
        url = item['url']
        print(f"Processing: {url}")
        
        try:
            # Route to the correct scraper based on domain
            if "irs.gov" in url:
                scraper = IRSScraper()
                source_name = "IRS"
                endpoint = url.replace(config['scrapers']['irs_base_url'], "")
            elif "canada.ca" in url:
                scraper = CRAScraper()
                source_name = "CRA"
                endpoint = url.replace(config['scrapers']['cra_base_url'], "")
            else:
                update_status(url, STATUS_ERROR)
                continue

            text = scraper.extract_content(endpoint)
            if not text:
                update_status(url, STATUS_ERROR)
                continue

            chunks = chunker.chunk(text)
            points = []
            
            for chunk in chunks:
                res = openai_client.embeddings.create(
                    input=chunk,
                    model=config['openai']['embedding_model']
                )
                points.append(PointStruct(
                    id=str(uuid.uuid4()),
                    vector=res.data[0].embedding,
                    payload={"text": chunk, "source": source_name, "url": url}
                ))

            if points:
                qdrant.upsert(collection_name=COLLECTION_NAME, points=points)
            
            update_status(url, STATUS_PROCESSED)
            
        except Exception as e:
            print(f"Error processing {url}: {e}")
            update_status(url, STATUS_ERROR)

    return {"statusCode": 200, "body": f"Processed {len(items)} URLs."}

if __name__ == "__main__":
    lambda_handler({}, {})