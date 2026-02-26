import { NextRequest, NextResponse } from 'next/server';
import { processFile } from '@/lib/ingestion';
import { MIME_TYPE_MAP } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Increase the body size limit for file uploads (default is 1MB)
export const maxDuration = 300; // 5 minutes for large files

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No files provided' },
                { status: 400 }
            );
        }

        // Validate file types
        for (const file of files) {
            if (!MIME_TYPE_MAP[file.type]) {
                return NextResponse.json(
                    {
                        success: false,
                        error: `Unsupported file type: ${file.type}. Supported types: PDF, CSV, XLSX, DOCX`,
                    },
                    { status: 400 }
                );
            }
        }

        // Process each file through the ingestion pipeline
        const results = [];
        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const result = await processFile(buffer, file.name, file.type, file.size);
            results.push(result);
        }

        return NextResponse.json({
            success: true,
            data: { records: results },
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            },
            { status: 500 }
        );
    }
}
