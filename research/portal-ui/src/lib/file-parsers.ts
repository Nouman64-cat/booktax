import * as XLSX from 'xlsx';
import { MIME_TYPE_MAP, SupportedFileType } from '@/types';

/**
 * Extract text from a PDF buffer.
 * Uses require to load pdf-parse — externalized via serverExternalPackages.
 */
export async function parsePDF(buffer: Buffer): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(buffer);
    return data.text;
}

/**
 * Extract text from a DOCX buffer.
 */
export async function parseDOCX(buffer: Buffer): Promise<string> {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
}

/**
 * Extract text from an XLSX buffer.
 * Converts all sheets to rows of text, joined by newlines.
 */
export function parseXLSX(buffer: Buffer): string {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const lines: string[] = [];

    for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        lines.push(`--- Sheet: ${sheetName} ---`);
        for (const row of rows) {
            if (row.length > 0) {
                lines.push(row.map(String).join(' | '));
            }
        }
    }

    return lines.join('\n');
}

/**
 * Extract text from a CSV buffer.
 * Uses XLSX in CSV mode.
 */
export function parseCSV(buffer: Buffer): string {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    return rows
        .filter((row) => row.length > 0)
        .map((row) => row.map(String).join(' | '))
        .join('\n');
}

/**
 * Dispatch to the correct parser based on MIME type.
 */
export async function parseFile(buffer: Buffer, mimeType: string): Promise<string> {
    const fileType: SupportedFileType | undefined = MIME_TYPE_MAP[mimeType];

    switch (fileType) {
        case 'pdf':
            return parsePDF(buffer);
        case 'docx':
            return parseDOCX(buffer);
        case 'xlsx':
            return parseXLSX(buffer);
        case 'csv':
            return parseCSV(buffer);
        default:
            throw new Error(`Unsupported file type: ${mimeType}`);
    }
}
