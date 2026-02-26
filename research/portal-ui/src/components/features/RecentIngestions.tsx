'use client';

import React from 'react';
import DataTable from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import { IngestionRecord, ColumnDef, IngestionStatus } from '@/types';

interface RecentIngestionsProps {
    records: IngestionRecord[];
}

function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

const columns: ColumnDef<IngestionRecord>[] = [
    {
        key: 'fileName' as keyof IngestionRecord,
        header: 'File Name',
        sortable: true,
        render: (value) => (
            <span className="table-filename">{String(value)}</span>
        ),
    },
    {
        key: 'fileType' as keyof IngestionRecord,
        header: 'Type',
        width: '80px',
        render: (value) => (
            <span className="table-filetype">{String(value).toUpperCase()}</span>
        ),
    },
    {
        key: 'fileSize' as keyof IngestionRecord,
        header: 'Size',
        width: '100px',
        sortable: true,
        render: (value) => formatSize(Number(value)),
    },
    {
        key: 'chunkCount' as keyof IngestionRecord,
        header: 'Chunks',
        width: '80px',
        sortable: true,
    },
    {
        key: 'vectorCount' as keyof IngestionRecord,
        header: 'Vectors',
        width: '80px',
        sortable: true,
    },
    {
        key: 'status' as keyof IngestionRecord,
        header: 'Status',
        width: '120px',
        render: (value) => <StatusBadge status={value as IngestionStatus} />,
    },
    {
        key: 'createdAt' as keyof IngestionRecord,
        header: 'Date',
        width: '140px',
        sortable: true,
        render: (value) => formatDate(String(value)),
    },
];

export default function RecentIngestions({ records }: RecentIngestionsProps) {
    return (
        <DataTable<IngestionRecord>
            columns={columns}
            data={records}
            emptyMessage="No ingestion records yet. Upload your first file to get started."
        />
    );
}
