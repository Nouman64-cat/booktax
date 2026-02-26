import { DashboardStats, IngestionRecord, IngestionStatus } from '@/types';

/**
 * In-memory ingestion history store.
 * Simple and sufficient for MVP — resets on server restart.
 */
const records: IngestionRecord[] = [];

export function addRecord(record: IngestionRecord): void {
    records.unshift(record);
}

export function updateRecord(
    id: string,
    updates: Partial<IngestionRecord>
): void {
    const idx = records.findIndex((r) => r.id === id);
    if (idx !== -1) {
        records[idx] = { ...records[idx], ...updates };
    }
}

export function getRecords(): IngestionRecord[] {
    return [...records];
}

export function getRecordById(id: string): IngestionRecord | undefined {
    return records.find((r) => r.id === id);
}

export function getStats(): DashboardStats {
    const statusCount = (status: IngestionStatus) =>
        records.filter((r) => r.status === status).length;

    return {
        totalDocuments: records.length,
        totalVectors: records.reduce((sum, r) => sum + r.vectorCount, 0),
        totalChunks: records.reduce((sum, r) => sum + r.chunkCount, 0),
        completedJobs: statusCount('completed'),
        failedJobs: statusCount('error'),
        pendingJobs: statusCount('pending') + statusCount('processing'),
    };
}
