'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ACCEPTED_TYPES: Record<string, string[]> = {
    'application/pdf': ['.pdf'],
    'text/csv': ['.csv'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

interface FileUploadZoneProps {
    onFilesSelected: (files: File[]) => void;
    disabled?: boolean;
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getFileIcon(type: string): React.ReactNode {
    if (type.includes('pdf'))
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        );
    if (type.includes('sheet') || type.includes('csv') || type.includes('excel'))
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="16" y2="17" />
                <line x1="12" y1="9" x2="12" y2="21" />
            </svg>
        );
    if (type.includes('word') || type.includes('docx'))
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        );
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
        </svg>
    );
}

export default function FileUploadZone({ onFilesSelected, disabled = false }: FileUploadZoneProps) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
        },
        []
    );

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            onFilesSelected(selectedFiles);
            setSelectedFiles([]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ACCEPTED_TYPES,
        disabled,
        multiple: true,
    });

    return (
        <div className="upload-zone-wrapper">
            <div
                {...getRootProps()}
                className={`upload-zone ${isDragActive ? 'upload-zone--active' : ''} ${disabled ? 'upload-zone--disabled' : ''}`}
            >
                <input {...getInputProps()} />
                <div className="upload-zone__content">
                    <div className="upload-zone__icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>
                    <p className="upload-zone__title">
                        {isDragActive ? 'Drop your files here' : 'Drag & drop files here'}
                    </p>
                    <p className="upload-zone__subtitle">
                        or <span className="upload-zone__browse">browse files</span>
                    </p>
                    <div className="upload-zone__formats">
                        <span className="upload-zone__format-tag">PDF</span>
                        <span className="upload-zone__format-tag">CSV</span>
                        <span className="upload-zone__format-tag">XLSX</span>
                        <span className="upload-zone__format-tag">DOCX</span>
                    </div>
                </div>
            </div>

            {selectedFiles.length > 0 && (
                <div className="upload-zone__file-list">
                    <div className="upload-zone__file-list-header">
                        <h4>{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected</h4>
                        <button
                            className="btn btn--primary btn--sm"
                            onClick={handleUpload}
                            disabled={disabled}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            Upload & Process
                        </button>
                    </div>
                    {selectedFiles.map((file, idx) => (
                        <div key={idx} className="upload-zone__file-item">
                            <span className="upload-zone__file-icon">{getFileIcon(file.type)}</span>
                            <div className="upload-zone__file-info">
                                <span className="upload-zone__file-name">{file.name}</span>
                                <span className="upload-zone__file-size">{formatSize(file.size)}</span>
                            </div>
                            <button
                                className="upload-zone__file-remove"
                                onClick={() => removeFile(idx)}
                                aria-label="Remove file"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
