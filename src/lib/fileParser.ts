/**
 * File Parser Utility - CLIENT SIDE
 * Validates files and prepares them for parsing
 * Actual parsing is done server-side via actions
 */

export type SupportedFileType = 'pdf' | 'docx' | 'doc' | 'txt' | 'md' | 'text';

export interface ParseResult {
  text: string;
  fileType: SupportedFileType;
  fileName: string;
  metadata?: {
    pages?: number;
    wordCount?: number;
  };
}

/**
 * Validates file size and type
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const ALLOWED_TYPES = ['pdf', 'docx', 'doc', 'txt', 'md', 'text'];

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds 50MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`
    };
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  if (!ALLOWED_TYPES.includes(extension)) {
    return {
      valid: false,
      error: `Unsupported file type (.${extension}). Supported: PDF, DOCX, DOC, TXT, MD`
    };
  }

  return { valid: true };
}

/**
 * Converts File to Buffer for server processing
 */
export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Normalizes text
 */
export function normalizeText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[\r\n\t]+/g, ' ') // Remove special whitespace
    .trim();
}

/**
 * Gets file extension
 */
export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}
