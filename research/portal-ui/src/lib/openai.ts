import OpenAI from 'openai';

/* ─── Configuration ─── */
const EMBEDDING_MODEL = 'text-embedding-3-small';

/* ─── Singleton Client ─── */
let client: OpenAI | null = null;

function getClient(): OpenAI {
    if (!client) {
        client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return client;
}

/**
 * Generate embeddings for an array of text chunks.
 * Processes in batches to respect API limits.
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
    const openai = getClient();
    const embeddings: number[][] = [];

    // OpenAI allows up to ~2048 inputs per call, but we batch at 50 for safety
    const BATCH_SIZE = 50;

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
        const batch = texts.slice(i, i + BATCH_SIZE);
        const response = await openai.embeddings.create({
            input: batch,
            model: EMBEDDING_MODEL,
        });

        for (const item of response.data) {
            embeddings.push(item.embedding);
        }
    }

    return embeddings;
}

export { EMBEDDING_MODEL };
