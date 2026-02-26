import tiktoken
import yaml

with open("config.yml", "r") as f:
    config = yaml.safe_load(f)

class TextChunker:
    def __init__(self):
        self.max_tokens = config['chunking']['max_tokens']
        self.overlap = config['chunking']['overlap']
        # Load the specific tokenizer used by OpenAI
        self.tokenizer = tiktoken.get_encoding(config['chunking']['encoding_model'])

    def chunk(self, text):
        tokens = self.tokenizer.encode(text)
        chunks = []
        
        # Slide a window over the tokens to create overlapping chunks
        for i in range(0, len(tokens), self.max_tokens - self.overlap):
            chunk_tokens = tokens[i : i + self.max_tokens]
            chunks.append(self.tokenizer.decode(chunk_tokens))
            
        return chunks