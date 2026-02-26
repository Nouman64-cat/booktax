'use client';

import { useState, useCallback } from 'react';
import { IngestionRecord, ApiResponse, UploadResult } from '@/types';

interface UseUploadReturn {
    isUploading: boolean;
    results: IngestionRecord[];
    error: string | null;
    uploadFiles: (files: File[]) => Promise<void>;
    clearResults: () => void;
}

export function useUpload(): UseUploadReturn {
    const [isUploading, setIsUploading] = useState(false);
    const [results, setResults] = useState<IngestionRecord[]>([]);
    const [error, setError] = useState<string | null>(null);

    const uploadFiles = useCallback(async (files: File[]) => {
        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            files.forEach((file) => formData.append('files', file));

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const json: ApiResponse<UploadResult> = await response.json();

            if (!json.success) {
                throw new Error(json.error || 'Upload failed');
            }

            if (json.data) {
                setResults((prev) => [...json.data!.records, ...prev]);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Upload failed';
            setError(message);
        } finally {
            setIsUploading(false);
        }
    }, []);

    const clearResults = useCallback(() => {
        setResults([]);
        setError(null);
    }, []);

    return { isUploading, results, error, uploadFiles, clearResults };
}
