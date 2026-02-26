'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@/types';

interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    emptyMessage?: string;
    className?: string;
}

export default function DataTable<T extends object>({
    columns,
    data,
    emptyMessage = 'No data available',
    className = '',
}: DataTableProps<T>) {
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

    const handleSort = (key: keyof T) => {
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('desc');
        }
    };

    const sortedData = sortKey
        ? [...data].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (aVal == null || bVal == null) return 0;
            const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
            return sortDir === 'asc' ? cmp : -cmp;
        })
        : data;

    return (
        <div className={`table-wrapper ${className}`}>
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                style={col.width ? { width: col.width } : undefined}
                                className={col.sortable ? 'data-table__th--sortable' : ''}
                                onClick={() => col.sortable && handleSort(col.key)}
                            >
                                <span className="data-table__th-content">
                                    {col.header}
                                    {col.sortable && sortKey === col.key && (
                                        <span className="data-table__sort-icon">
                                            {sortDir === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="data-table__empty">
                                <div className="data-table__empty-content">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4">
                                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                                        <polyline points="13 2 13 9 20 9" />
                                    </svg>
                                    <p>{emptyMessage}</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((row, idx) => (
                            <tr key={idx}>
                                {columns.map((col) => (
                                    <td key={String(col.key)}>
                                        {col.render
                                            ? col.render(row[col.key], row)
                                            : String(row[col.key] ?? '')}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
