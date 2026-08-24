'use server';

/**
 * Server Actions for file processing
 * These run on the server and can use Node.js libraries safely.
 *
 * IMPORTANT: Next.js redacts thrown Error messages from Server Actions in
 * production builds (you only get a generic "Server Components render"
 * message + a digest). That means `throw new Error('...')` here is USELESS
 * for telling the user what went wrong once deployed. Instead we always
 * RETURN a plain result object - success or failure - which Next.js does
 * NOT redact, so the real reason reaches the UI.
 */

export interface FileParseResult {
  success: true;
  text: string;
  fileType: string;
  fileName: string;
  metadata?: {
    pages?: number;
    wordCount?: number;
  };
}

export interface FileParseError {
  success: false;
  error: string;
}

export type FileParseResponse = FileParseResult | FileParseError;

export async function parseFileServer(
  fileBytes: Uint8Array,
  fileName: string,
  fileType: string
): Promise<FileParseResponse> {
  const extension = fileType.toLowerCase();
  // Node's Buffer is only safe to construct here, on the server.
  const buffer = Buffer.from(fileBytes);

  try {
    switch (extension) {
      case 'docx': {
        const { extractRawText } = await import('mammoth');
        const result = await extractRawText({ buffer });
        const text = result.value.trim();

        if (!text) {
          return {
            success: false,
            error:
              'This .docx file has no extractable text (it may be empty, scanned, or image-only). Try pasting the text directly instead.',
          };
        }

        return {
          success: true,
          text,
          fileType: 'docx',
          fileName,
          metadata: { wordCount: text.split(/\s+/).filter(Boolean).length },
        };
      }

      case 'doc': {
        // mammoth (and every practical JS library) only reads the modern
        // .docx XML format. Legacy binary .doc is a completely different
        // format and cannot be parsed here - be honest instead of failing
        // silently with a generic error.
        return {
          success: false,
          error:
            "Old .doc files (pre-2007 Word format) aren't supported. Please open the file in Word/Google Docs and save it as .docx, then upload that.",
        };
      }

      case 'pdf': {
        // pdfjs-dist is far more reliable than pdf2json for real-world PDFs
        // (different encoders, embedded fonts, non-Latin text, etc.)
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
        const path = await import('path');

        const standardFontDataUrl = path.join(
          process.cwd(),
          'node_modules/pdfjs-dist/standard_fonts/'
        ) + '/';

        const loadingTask = pdfjsLib.getDocument({
          data: new Uint8Array(buffer),
          useWorkerFetch: false,
          isEvalSupported: false,
          standardFontDataUrl,
        });

        let pdf;
        try {
          pdf = await loadingTask.promise;
        } catch (e) {
          return {
            success: false,
            error:
              'This PDF could not be opened. It may be corrupted or password-protected. Try re-exporting it, or paste the text directly.',
          };
        }

        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          fullText += content.items.map((item: any) => item.str ?? '').join(' ') + '\n';
        }

        const text = fullText.trim();

        if (!text) {
          return {
            success: false,
            error:
              'No selectable text found in this PDF. It looks like a scanned/image-only document, which this tool cannot read (no OCR support yet). Try a text-based PDF, DOCX, or paste the text directly.',
          };
        }

        return {
          success: true,
          text,
          fileType: 'pdf',
          fileName,
          metadata: { pages: pdf.numPages, wordCount: text.split(/\s+/).filter(Boolean).length },
        };
      }

      case 'txt':
      case 'md':
      case 'text': {
        const text = buffer.toString('utf-8').trim();

        if (!text) {
          return { success: false, error: 'This file is empty.' };
        }

        return {
          success: true,
          text,
          fileType: extension,
          fileName,
          metadata: { wordCount: text.split(/\s+/).filter(Boolean).length },
        };
      }

      default:
        return { success: false, error: `Unsupported file type: .${extension}` };
    }
  } catch (error) {
    // Last-resort catch: still return a structured, readable message
    // instead of throwing (which production would redact).
    return {
      success: false,
      error: `Couldn't process this file: ${error instanceof Error ? error.message : 'unknown error'}. Try a different file, or paste the text directly.`,
    };
  }
}