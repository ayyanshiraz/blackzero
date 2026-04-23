'use server';

/**
 * Server Actions for file processing
 * These run on the server and can use Node.js libraries safely
 */

export interface FileParseResult {
  text: string;
  fileType: string;
  fileName: string;
  metadata?: {
    pages?: number;
    wordCount?: number;
  };
}

export async function parseFileServer(
  buffer: Buffer,
  fileName: string,
  fileType: string
): Promise<FileParseResult> {
  const extension = fileType.toLowerCase();

  try {
    switch (extension) {
      case 'docx':
      case 'doc': {
        const { extractRawText } = await import('mammoth');
        const result = await extractRawText({ buffer });
        return {
          text: result.value.trim(),
          fileType: 'docx',
          fileName,
          metadata: {
            wordCount: result.value.split(/\s+/).length
          }
        };
      }

      case 'pdf': {
        // Attempt PDF parsing
        const PDFParser = require('pdf2json');
        const pdfParser = new PDFParser();

        return new Promise((resolve, reject) => {
          pdfParser.on('pdfParser_dataError', (err: any) => {
            reject(new Error(`PDF parsing failed: ${err.message}`));
          });

          pdfParser.on('pdfParser_dataReady', () => {
            const text = pdfParser.getRawTextContent();
            if (!text || text.trim().length < 10) {
              reject(new Error('Could not extract text from PDF. Try DOCX or TXT format.'));
            } else {
              resolve({
                text: text.trim(),
                fileType: 'pdf',
                fileName,
                metadata: {
                  pages: pdfParser.data?.Pages?.length || 0,
                  wordCount: text.split(/\s+/).length
                }
              });
            }
          });

          pdfParser.parseBuffer(buffer);
        });
      }

      case 'txt':
      case 'md':
      case 'text': {
        const text = buffer.toString('utf-8');
        return {
          text: text.trim(),
          fileType: extension,
          fileName,
          metadata: {
            wordCount: text.split(/\s+/).length
          }
        };
      }

      default:
        throw new Error(`Unsupported file type: .${extension}`);
    }
  } catch (error) {
    throw new Error(
      `Failed to parse file: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
