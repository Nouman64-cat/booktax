'use client';

import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import RecentIngestions from '@/components/features/RecentIngestions';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import { IngestionRecord, DashboardStats } from '@/types';

export default function HistoryPage() {
    const [records, setRecords] = useState<IngestionRecord[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/history');
            const json = await res.json();
            if (json.success) {
                setRecords(json.data.records);
                setStats(json.data.stats);
            }
        } catch (err) {
            console.error('Failed to fetch history:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    if (loading) {
        return (
            <PageContainer>
                <div className="page-loader">
                    <Spinner size="lg" />
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Header
                title="Ingestion History"
                subtitle="Track all file processing activity"
                actions={
                    <Button
                        variant="secondary"
                        onClick={fetchHistory}
                        icon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 4 23 10 17 10" />
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                            </svg>
                        }
                    >
                        Refresh
                    </Button>
                }
            />

            {stats && (
                <div className="history-stats">
                    <div className="history-stats__item">
                        <span className="history-stats__value">{stats.totalDocuments}</span>
                        <span className="history-stats__label">Total</span>
                    </div>
                    <div className="history-stats__item history-stats__item--success">
                        <span className="history-stats__value">{stats.completedJobs}</span>
                        <span className="history-stats__label">Completed</span>
                    </div>
                    <div className="history-stats__item history-stats__item--error">
                        <span className="history-stats__value">{stats.failedJobs}</span>
                        <span className="history-stats__label">Failed</span>
                    </div>
                    <div className="history-stats__item history-stats__item--pending">
                        <span className="history-stats__value">{stats.pendingJobs}</span>
                        <span className="history-stats__label">Pending</span>
                    </div>
                </div>
            )}

            <Card>
                <RecentIngestions records={records} />
            </Card>
        </PageContainer>
    );
}
