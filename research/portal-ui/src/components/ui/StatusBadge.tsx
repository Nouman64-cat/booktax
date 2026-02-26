import React from 'react';
import { IngestionStatus } from '@/types';

interface StatusBadgeProps {
    status: IngestionStatus;
    className?: string;
}

const STATUS_CONFIG: Record<IngestionStatus, { label: string; className: string }> = {
    pending: { label: 'Pending', className: 'badge--pending' },
    processing: { label: 'Processing', className: 'badge--processing' },
    completed: { label: 'Completed', className: 'badge--completed' },
    error: { label: 'Error', className: 'badge--error' },
};

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
    const config = STATUS_CONFIG[status];

    return (
        <span className={`badge ${config.className} ${className}`}>
            <span className="badge__dot" />
            {config.label}
        </span>
    );
}
