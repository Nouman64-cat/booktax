import yaml
import requests
from bs4 import BeautifulSoup
from abc import ABC, abstractmethod

with open("config.yml", "r") as f:
    config = yaml.safe_load(f)

class BaseScraper(ABC):
    def __init__(self, base_url):
        self.base_url = base_url
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

    def fetch_page(self, endpoint=""):
        url = f"{self.base_url}{endpoint}"
        response = requests.get(url, headers=self.headers, timeout=10)
        response.raise_for_status()
        return BeautifulSoup(response.text, 'html.parser')

    @abstractmethod
    def extract_content(self, endpoint):
        """Must be implemented by child classes for specific DOM structures."""
        pass

class IRSScraper(BaseScraper):
    def __init__(self):
        super().__init__(config['scrapers']['irs_base_url'])

    def extract_content(self, endpoint):
        soup = self.fetch_page(endpoint)
        
        # The IRS site often uses 'field--name-body' for main content
        content_div = soup.find('div', class_='field--name-body')
        if not content_div:
            return ""
            
        # Extract text from paragraphs
        paragraphs = [p.get_text(strip=True) for p in content_div.find_all('p')]
        return "\n".join(paragraphs)

class CRAScraper(BaseScraper):
    def __init__(self):
        super().__init__(config['scrapers']['cra_base_url'])

    def extract_content(self, endpoint):
        soup = self.fetch_page(endpoint)
        
        # CRA (Canada.ca) uses the <main> tag for primary page content
        content = soup.find('main')
        if not content:
            return ""
            
        # Extract text from paragraphs
        paragraphs = [p.get_text(strip=True) for p in content.find_all('p')]
        return "\n".join(paragraphs)