import { NextResponse } from 'next/server';
import { getCollectionInfo } from '@/lib/qdrant';

export async function GET() {
    try {
        const info = await getCollectionInfo();

        return NextResponse.json({
            success: true,
            data: info,
        });
    } catch (error) {
        console.error('Collections error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch collection info',
            },
            { status: 500 }
        );
    }
}
