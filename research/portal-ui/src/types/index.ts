/* ─── Shared TypeScript Interfaces ─── */

/** Supported file types for upload */
export type SupportedFileType = 'pdf' | 'csv' | 'xlsx' | 'docx';

/** MIME type mapping */
export const MIME_TYPE_MAP: Record<string, SupportedFileType> = {
  'application/pdf': 'pdf',
  'text/csv': 'csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-excel': 'xlsx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};

/** Status of an ingestion job */
export type IngestionStatus = 'pending' | 'processing' | 'completed' | 'error';

/** A single ingestion record */
export interface IngestionRecord {
  id: string;
  fileName: string;
  fileType: SupportedFileType;
  fileSize: number;
  status: IngestionStatus;
  chunkCount: number;
  vectorCount: number;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

/** Dashboard statistics */
export interface DashboardStats {
  totalDocuments: number;
  totalVectors: number;
  totalChunks: number;
  completedJobs: number;
  failedJobs: number;
  pendingJobs: number;
}

/** Qdrant collection info */
export interface CollectionInfo {
  name: string;
  vectorCount: number;
  vectorSize: number;
  distanceMetric: string;
  status: string;
}

/** API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/** Upload result from the API */
export interface UploadResult {
  records: IngestionRecord[];
}

/** Column definition for DataTable */
export interface ColumnDef<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}
