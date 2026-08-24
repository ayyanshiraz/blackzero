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
 * Converts File to a Uint8Array for server processing.
 *
 * IMPORTANT: this file runs in the BROWSER (it's imported by a 'use client'
 * page). `Buffer` is a Node.js global with no polyfill configured in this
 * project, so `Buffer.from(...)` here would throw "Buffer is not defined"
 * in real browsers. Uint8Array is a standard Web API that works in both
 * the browser and Node, and passes cleanly across the Server Action
 * boundary, so we use that instead and convert to a Node Buffer only on
 * the server (see fileActions.ts).
 */
export async function fileToBuffer(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  return new Uint8Array(arrayBuffer);
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