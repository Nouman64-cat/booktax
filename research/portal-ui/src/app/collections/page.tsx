'use client';

import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import CollectionInfoCard from '@/components/features/CollectionInfo';
import Spinner from '@/components/ui/Spinner';
import Button from '@/components/ui/Button';
import { CollectionInfo } from '@/types';

export default function CollectionsPage() {
    const [collection, setCollection] = useState<CollectionInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCollection = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('/api/collections');
            const json = await res.json();
            if (json.success) {
                setCollection(json.data);
            } else {
                setError(json.error || 'Failed to fetch collection info');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Connection failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollection();
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
                title="Collections"
                subtitle="Qdrant vector database collections"
                actions={
                    <Button
                        variant="secondary"
                        onClick={fetchCollection}
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

            {error && (
                <div className="upload-error-banner">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            <div className="collections-grid">
                {collection && <CollectionInfoCard collection={collection} />}

                <Card title="Collection Configuration">
                    <div className="config-details">
                        <div className="config-details__item">
                            <span className="config-details__label">Collection Name</span>
                            <code className="config-details__value">tax_knowledge_base</code>
                        </div>
                        <div className="config-details__item">
                            <span className="config-details__label">Embedding Model</span>
                            <code className="config-details__value">text-embedding-3-small</code>
                        </div>
                        <div className="config-details__item">
                            <span className="config-details__label">Vector Dimensions</span>
                            <code className="config-details__value">1536</code>
                        </div>
                        <div className="config-details__item">
                            <span className="config-details__label">Distance Metric</span>
                            <code className="config-details__value">Cosine</code>
                        </div>
                        <div className="config-details__item">
                            <span className="config-details__label">Chunk Size</span>
                            <code className="config-details__value">500 tokens / 50 overlap</code>
                        </div>
                        <div className="config-details__item">
                            <span className="config-details__label">Tokenizer</span>
                            <code className="config-details__value">cl100k_base</code>
                        </div>
                    </div>
                </Card>

                <Card title="Data Sources">
                    <div className="data-sources">
                        <div className="data-sources__item">
                            <div className="data-sources__icon data-sources__icon--upload">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                            </div>
                            <div className="data-sources__content">
                                <span className="data-sources__name">Manual Upload</span>
                                <span className="data-sources__desc">PDF, CSV, XLSX, DOCX via portal</span>
                            </div>
                        </div>
                        <div className="data-sources__item">
                            <div className="data-sources__icon data-sources__icon--scraper">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                            </div>
                            <div className="data-sources__content">
                                <span className="data-sources__name">IRS Scraper</span>
                                <span className="data-sources__desc">Automated tax topics scraping</span>
                            </div>
                        </div>
                        <div className="data-sources__item">
                            <div className="data-sources__icon data-sources__icon--scraper">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                            </div>
                            <div className="data-sources__content">
                                <span className="data-sources__name">CRA Scraper</span>
                                <span className="data-sources__desc">Canada.ca tax information</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </PageContainer>
    );
}
