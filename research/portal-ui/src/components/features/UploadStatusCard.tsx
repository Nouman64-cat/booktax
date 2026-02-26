import React from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import { IngestionRecord } from '@/types';

interface UploadStatusCardProps {
    record: IngestionRecord;
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function UploadStatusCard({ record }: UploadStatusCardProps) {
    return (
        <div className={`upload-status-card upload-status-card--${record.status}`}>
            <div className="upload-status-card__header">
                <div className="upload-status-card__file">
                    <span className="upload-status-card__name">{record.fileName}</span>
                    <span className="upload-status-card__meta">
                        {record.fileType.toUpperCase()} • {formatSize(record.fileSize)}
                    </span>
                </div>
                <StatusBadge status={record.status} />
            </div>

            {record.status === 'processing' && (
                <div className="upload-status-card__progress">
                    <div className="upload-status-card__progress-bar">
                        <div className="upload-status-card__progress-fill" />
                    </div>
                    <span className="upload-status-card__progress-text">Processing...</span>
                </div>
            )}

            {record.status === 'completed' && (
                <div className="upload-status-card__stats">
                    <div className="upload-status-card__stat">
                        <span className="upload-status-card__stat-value">{record.chunkCount}</span>
                        <span className="upload-status-card__stat-label">Chunks</span>
                    </div>
                    <div className="upload-status-card__stat">
                        <span className="upload-status-card__stat-value">{record.vectorCount}</span>
                        <span className="upload-status-card__stat-label">Vectors</span>
                    </div>
                </div>
            )}

            {record.status === 'error' && record.error && (
                <div className="upload-status-card__error">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {record.error}
                </div>
            )}
        </div>
    );
}
