import { get_encoding } from 'tiktoken';

/* ─── Configuration (mirrors chunker.py) ─── */
const MAX_TOKENS = 500;
const OVERLAP = 50;
const ENCODING_MODEL = 'cl100k_base';

/**
 * Token-based text chunker — direct port of the Python TextChunker.
 * Uses tiktoken with cl100k_base encoding and a sliding window approach.
 */
export function chunkText(text: string): string[] {
    const encoder = get_encoding(ENCODING_MODEL);
    const tokens = encoder.encode(text);
    const chunks: string[] = [];
    const step = MAX_TOKENS - OVERLAP;

    for (let i = 0; i < tokens.length; i += step) {
        const chunkTokens = tokens.slice(i, i + MAX_TOKENS);
        const decoded = new TextDecoder().decode(encoder.decode(chunkTokens));
        chunks.push(decoded);
    }

    encoder.free();
    return chunks;
}

export { MAX_TOKENS, OVERLAP };
