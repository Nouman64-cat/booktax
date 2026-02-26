import { v4 as uuidv4 } from 'uuid';
import { parseFile } from './file-parsers';
import { chunkText } from './chunker';
import { generateEmbeddings } from './openai';
import { upsertPoints, COLLECTION_NAME } from './qdrant';
import { addRecord, updateRecord } from './store';
import { IngestionRecord, MIME_TYPE_MAP, SupportedFileType } from '@/types';

/**
 * End-to-end ingestion pipeline:
 * File → Parse text → Chunk → Generate embeddings → Upsert to Qdrant
 */
export async function processFile(
    buffer: Buffer,
    fileName: string,
    mimeType: string,
    fileSize: number
): Promise<IngestionRecord> {
    const fileType: SupportedFileType = MIME_TYPE_MAP[mimeType] || 'pdf';

    // Create initial record
    const record: IngestionRecord = {
        id: uuidv4(),
        fileName,
        fileType,
        fileSize,
        status: 'processing',
        chunkCount: 0,
        vectorCount: 0,
        createdAt: new Date().toISOString(),
    };

    addRecord(record);

    try {
        // Step 1: Extract text
        const text = await parseFile(buffer, mimeType);
        if (!text || text.trim().length === 0) {
            throw new Error('No text content could be extracted from the file.');
        }

        // Step 2: Chunk text
        const chunks = chunkText(text);
        record.chunkCount = chunks.length;
        updateRecord(record.id, { chunkCount: chunks.length });

        // Step 3: Generate embeddings
        const embeddings = await generateEmbeddings(chunks);

        // Step 4: Build points and upsert to Qdrant
        const points = chunks.map((chunk, i) => ({
            id: uuidv4(),
            vector: embeddings[i],
            payload: {
                text: chunk,
                source: 'manual_upload',
                fileName,
                fileType,
                collection: COLLECTION_NAME,
                uploadedAt: record.createdAt,
            },
        }));

        await upsertPoints(points);

        // Mark as completed
        const completedRecord: Partial<IngestionRecord> = {
            status: 'completed',
            vectorCount: points.length,
            chunkCount: chunks.length,
            completedAt: new Date().toISOString(),
        };
        updateRecord(record.id, completedRecord);

        return { ...record, ...completedRecord };
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : 'Unknown error occurred';
        updateRecord(record.id, { status: 'error', error: errorMessage });
        return { ...record, status: 'error', error: errorMessage };
    }
}
