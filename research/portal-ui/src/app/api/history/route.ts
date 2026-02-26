import { NextResponse } from 'next/server';
import { getRecords, getStats } from '@/lib/store';

export async function GET() {
    try {
        const records = getRecords();
        const stats = getStats();

        return NextResponse.json({
            success: true,
            data: { records, stats },
        });
    } catch (error) {
        console.error('History error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch history',
            },
            { status: 500 }
        );
    }
}
