import { QdrantClient } from '@qdrant/js-client-rest';

/* ─── Configuration ─── */
const QDRANT_HOST = process.env.QDRANT_HOST || 'http://localhost:6333';
const COLLECTION_NAME = 'tax_knowledge_base';
const VECTOR_SIZE = 1536;

/* ─── Singleton Client ─── */
let client: QdrantClient | null = null;

function getClient(): QdrantClient {
    if (!client) {
        client = new QdrantClient({ url: QDRANT_HOST });
    }
    return client;
}

/* ─── Ensure Collection Exists (mirrors init_qdrant in handler.py) ─── */
export async function ensureCollection(): Promise<void> {
    const qdrant = getClient();
    const exists = await qdrant.collectionExists(COLLECTION_NAME);

    if (!exists.exists) {
        await qdrant.createCollection(COLLECTION_NAME, {
            vectors: {
                size: VECTOR_SIZE,
                distance: 'Cosine',
            },
        });
    }
}

/* ─── Upsert Points ─── */
export async function upsertPoints(
    points: { id: string; vector: number[]; payload: Record<string, unknown> }[]
): Promise<void> {
    const qdrant = getClient();
    await ensureCollection();

    // Batch upsert in chunks of 100 to avoid payload limits
    const BATCH_SIZE = 100;
    for (let i = 0; i < points.length; i += BATCH_SIZE) {
        const batch = points.slice(i, i + BATCH_SIZE);
        await qdrant.upsert(COLLECTION_NAME, {
            wait: true,
            points: batch,
        });
    }
}

/* ─── Get Collection Info ─── */
export async function getCollectionInfo() {
    const qdrant = getClient();
    try {
        const info = await qdrant.getCollection(COLLECTION_NAME);
        return {
            name: COLLECTION_NAME,
            vectorCount: info.points_count ?? 0,
            vectorSize: VECTOR_SIZE,
            distanceMetric: 'Cosine',
            status: info.status,
        };
    } catch {
        return {
            name: COLLECTION_NAME,
            vectorCount: 0,
            vectorSize: VECTOR_SIZE,
            distanceMetric: 'Cosine',
            status: 'not_found',
        };
    }
}

export { COLLECTION_NAME, VECTOR_SIZE };
