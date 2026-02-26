'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import StatsCard from '@/components/features/StatsCard';
import RecentIngestions from '@/components/features/RecentIngestions';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { DashboardStats, IngestionRecord } from '@/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [records, setRecords] = useState<IngestionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/history');
        const json = await res.json();
        if (json.success) {
          setStats(json.data.stats);
          setRecords(json.data.records);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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
        title="Dashboard"
        subtitle="Knowledge base ingestion overview"
        actions={
          <Link href="/upload">
            <Button variant="primary" icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            }>
              Upload Files
            </Button>
          </Link>
        }
      />

      <div className="stats-grid">
        <StatsCard
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          }
          label="Total Documents"
          value={stats?.totalDocuments ?? 0}
          color="#6366f1"
        />
        <StatsCard
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          }
          label="Total Vectors"
          value={stats?.totalVectors ?? 0}
          color="#8b5cf6"
        />
        <StatsCard
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <path d="M7 7h10M7 12h10M7 17h6" />
            </svg>
          }
          label="Total Chunks"
          value={stats?.totalChunks ?? 0}
          color="#06b6d4"
        />
        <StatsCard
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
          label="Completed Jobs"
          value={stats?.completedJobs ?? 0}
          color="#22c55e"
        />
      </div>

      <div className="dashboard-grid">
        <Card title="Recent Ingestions" subtitle="Latest file processing activity" className="dashboard-grid__main">
          <RecentIngestions records={records.slice(0, 10)} />
        </Card>

        <div className="dashboard-grid__sidebar">
          <Card title="Quick Upload" glow>
            <div className="quick-upload">
              <div className="quick-upload__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="quick-upload__text">
                Upload PDF, CSV, XLSX, or DOCX files to generate embeddings and ingest into Qdrant.
              </p>
              <Link href="/upload" style={{ width: '100%' }}>
                <Button variant="primary" size="md" className="quick-upload__btn">
                  Go to Upload
                </Button>
              </Link>
            </div>
          </Card>

          <Card title="Pipeline Info">
            <div className="pipeline-info">
              <div className="pipeline-info__item">
                <span className="pipeline-info__label">Embedding Model</span>
                <span className="pipeline-info__value">text-embedding-3-small</span>
              </div>
              <div className="pipeline-info__item">
                <span className="pipeline-info__label">Vector Size</span>
                <span className="pipeline-info__value">1536</span>
              </div>
              <div className="pipeline-info__item">
                <span className="pipeline-info__label">Chunk Size</span>
                <span className="pipeline-info__value">500 tokens</span>
              </div>
              <div className="pipeline-info__item">
                <span className="pipeline-info__label">Overlap</span>
                <span className="pipeline-info__value">50 tokens</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
