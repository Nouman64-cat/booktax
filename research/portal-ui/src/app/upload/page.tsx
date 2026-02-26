'use client';

import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import FileUploadZone from '@/components/features/FileUploadZone';
import UploadStatusCard from '@/components/features/UploadStatusCard';
import { useUpload } from '@/hooks/useUpload';
import { useToast } from '@/components/ui/Toast';

export default function UploadPage() {
    const { isUploading, results, error, uploadFiles } = useUpload();
    const { showToast } = useToast();

    const handleFilesSelected = async (files: File[]) => {
        showToast(`Processing ${files.length} file${files.length > 1 ? 's' : ''}...`, 'info');
        await uploadFiles(files);

        // Show result toasts
        const completed = results.filter((r) => r.status === 'completed').length;
        const failed = results.filter((r) => r.status === 'error').length;

        if (completed > 0) {
            showToast(`${completed} file${completed > 1 ? 's' : ''} processed successfully!`, 'success');
        }
        if (failed > 0) {
            showToast(`${failed} file${failed > 1 ? 's' : ''} failed to process.`, 'error');
        }
    };

    return (
        <PageContainer>
            <Header
                title="Upload Files"
                subtitle="Upload documents to generate embeddings and ingest into Qdrant"
            />

            <div className="upload-page-layout">
                <div className="upload-page-layout__main">
                    <Card>
                        <FileUploadZone
                            onFilesSelected={handleFilesSelected}
                            disabled={isUploading}
                        />
                    </Card>

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

                    {results.length > 0 && (
                        <Card title="Processing Results" subtitle={`${results.length} file${results.length > 1 ? 's' : ''}`}>
                            <div className="upload-results">
                                {results.map((record) => (
                                    <UploadStatusCard key={record.id} record={record} />
                                ))}
                            </div>
                        </Card>
                    )}
                </div>

                <div className="upload-page-layout__sidebar">
                    <Card title="Supported Formats">
                        <div className="format-list">
                            <div className="format-list__item">
                                <span className="format-list__icon format-list__icon--pdf">PDF</span>
                                <div className="format-list__info">
                                    <span className="format-list__name">PDF Documents</span>
                                    <span className="format-list__desc">Reports, forms, tax documents</span>
                                </div>
                            </div>
                            <div className="format-list__item">
                                <span className="format-list__icon format-list__icon--csv">CSV</span>
                                <div className="format-list__info">
                                    <span className="format-list__name">CSV Files</span>
                                    <span className="format-list__desc">Spreadsheet data, exports</span>
                                </div>
                            </div>
                            <div className="format-list__item">
                                <span className="format-list__icon format-list__icon--xlsx">XLSX</span>
                                <div className="format-list__info">
                                    <span className="format-list__name">Excel Files</span>
                                    <span className="format-list__desc">Financial sheets, data tables</span>
                                </div>
                            </div>
                            <div className="format-list__item">
                                <span className="format-list__icon format-list__icon--docx">DOCX</span>
                                <div className="format-list__info">
                                    <span className="format-list__name">Word Documents</span>
                                    <span className="format-list__desc">Text documents, guides</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="How It Works">
                        <div className="how-it-works">
                            <div className="how-it-works__step">
                                <span className="how-it-works__number">1</span>
                                <div className="how-it-works__content">
                                    <span className="how-it-works__title">Upload</span>
                                    <span className="how-it-works__desc">Drag & drop or browse for files</span>
                                </div>
                            </div>
                            <div className="how-it-works__step">
                                <span className="how-it-works__number">2</span>
                                <div className="how-it-works__content">
                                    <span className="how-it-works__title">Extract</span>
                                    <span className="how-it-works__desc">Text is extracted from your file</span>
                                </div>
                            </div>
                            <div className="how-it-works__step">
                                <span className="how-it-works__number">3</span>
                                <div className="how-it-works__content">
                                    <span className="how-it-works__title">Chunk & Embed</span>
                                    <span className="how-it-works__desc">Text is chunked and vectorized</span>
                                </div>
                            </div>
                            <div className="how-it-works__step">
                                <span className="how-it-works__number">4</span>
                                <div className="how-it-works__content">
                                    <span className="how-it-works__title">Store</span>
                                    <span className="how-it-works__desc">Vectors stored in Qdrant DB</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </PageContainer>
    );
}
