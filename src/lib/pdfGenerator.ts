import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { AnalysisResult } from './detectionEngine';

interface ReportData {
  timestamp: string;
  content: AnalysisResult;
  breakdown: {
    aiCount: number;
    plagiarismCount: number;
    originalCount: number;
    totalSentences: number;
  };
}

/**
 * Generates a highlighted HTML version of analyzed content
 */
function createHighlightedHTML(analysis: AnalysisResult): string {
  const timestamp = new Date().toLocaleString();
  
  const highlightedContent = analysis.sentences
    .map((sentence) => {
      if (sentence.type === 'ai-generated') {
        return `<span style="background-color: #dc2626; color: white; padding: 2px 4px; border-radius: 2px;">${escapeHtml(sentence.text)}</span>`;
      } else if (sentence.type === 'plagiarized') {
        return `<span style="background-color: #2563eb; color: white; padding: 2px 4px; border-radius: 2px;">${escapeHtml(sentence.text)}</span>`;
      } else {
        return escapeHtml(sentence.text);
      }
    })
    .join(' ');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          background-color: #f9fafb;
          color: #111827;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #1f2937;
          padding-bottom: 20px;
        }
        .header h1 {
          font-size: 32px;
          color: #000;
          margin: 0;
        }
        .header p {
          color: #6b7280;
          margin: 5px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 30px 0;
          padding: 20px;
          background-color: #f3f4f6;
          border-radius: 8px;
        }
        .stat-box {
          padding: 15px;
          background-color: white;
          border-radius: 6px;
          border-left: 4px solid #3b82f6;
        }
        .stat-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #1f2937;
        }
        .stat-ai {
          border-left-color: #dc2626;
        }
        .stat-ai .stat-value {
          color: #dc2626;
        }
        .stat-plagiarism {
          border-left-color: #2563eb;
        }
        .stat-plagiarism .stat-value {
          color: #2563eb;
        }
        .progress-section {
          margin: 30px 0;
        }
        .progress-label {
          font-weight: bold;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
        }
        .progress-bar {
          width: 100%;
          height: 20px;
          background-color: #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .progress-bar-fill {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 8px;
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
        .content-section {
          margin: 30px 0;
          padding: 20px;
          background-color: #f9fafb;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        .content-header {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #1f2937;
        }
        .content-text {
          line-height: 1.8;
          color: #374151;
          text-align: justify;
        }
        .legend {
          display: flex;
          gap: 20px;
          margin: 20px 0;
          padding: 15px;
          background-color: white;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .legend-color {
          width: 20px;
          height: 20px;
          border-radius: 3px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 11px;
        }
        .ai-red { background-color: #dc2626; }
        .copy-blue { background-color: #2563eb; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📊 Plagiarism & AI Detection Report</h1>
        <p>Generated on: ${timestamp}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-box stat-ai">
          <div class="stat-label">🔴 AI-Generated</div>
          <div class="stat-value">${analysis.aiPercentage}%</div>
        </div>
        <div class="stat-box stat-plagiarism">
          <div class="stat-label">🔵 Copy-Pasted</div>
          <div class="stat-value">${analysis.plagiarismPercentage}%</div>
        </div>
      </div>

      <div class="progress-section">
        <div class="progress-label">
          <span>AI-Generated Content</span>
          <span>${analysis.aiPercentage}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: ${analysis.aiPercentage}%; background-color: #dc2626;">
            ${analysis.aiPercentage > 10 ? analysis.aiPercentage + '%' : ''}
          </div>
        </div>

        <div class="progress-label">
          <span>Copy-Pasted Content</span>
          <span>${analysis.plagiarismPercentage}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: ${analysis.plagiarismPercentage}%; background-color: #2563eb;">
            ${analysis.plagiarismPercentage > 10 ? analysis.plagiarismPercentage + '%' : ''}
          </div>
        </div>
      </div>

      <div class="legend">
        <div class="legend-item">
          <div class="legend-color ai-red"></div>
          <span>AI-Generated Content</span>
        </div>
        <div class="legend-item">
          <div class="legend-color copy-blue"></div>
          <span>Copy-Pasted Content</span>
        </div>
      </div>

      <div class="content-section">
        <div class="content-header">🎯 Analyzed Content (with highlights)</div>
        <div class="content-text">
          ${highlightedContent}
        </div>
      </div>

      <div class="stat-box" style="border-left-color: #10b981; background-color: #ecfdf5;">
        <div class="stat-label">📈 Breakdown</div>
        <p style="margin: 0 0 5px 0;">Total Sentences: <strong>${analysis.sentences.length}</strong></p>
        <p style="margin: 0 0 5px 0;">AI-Generated Sentences: <strong style="color: #dc2626;">${analysis.sentences.filter(s => s.type === 'ai-generated').length}</strong></p>
        <p style="margin: 0;">Copy-Pasted Sentences: <strong style="color: #2563eb;">${analysis.sentences.filter(s => s.type === 'plagiarized').length}</strong></p>
      </div>

      <div class="footer">
        <p>This report was generated using advanced pattern recognition and content analysis algorithms.</p>
        <p>Results are indicative and should always be verified through manual review.</p>
        <p>© ${new Date().getFullYear()} BlackZero - Plagiarism & AI Detection Service</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Escapes HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Generates and downloads PDF report
 */
export async function generatePDF(analysis: AnalysisResult, reportData: ReportData): Promise<void> {
  try {
    // Create HTML container
    const container = document.createElement('div');
    container.innerHTML = createHighlightedHTML(analysis);
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '1200px';
    document.body.appendChild(container);

    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Remove temporary container
    document.body.removeChild(container);

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 10; // 5mm margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 5; // 5mm top margin

    const imgData = canvas.toDataURL('image/png');

    // Add pages
    while (heightLeft > 0) {
      const pageBreak = position + pageHeight - 10;
      if (heightLeft > pageHeight - 10) {
        pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 10;
        position = heightLeft > 0 ? -pageHeight + 15 : 0;
        if (heightLeft > 0) {
          pdf.addPage();
        }
      } else {
        pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
        heightLeft = 0;
      }
    }

    // Download PDF
    const fileName = `turnitin-report-${new Date().getTime()}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
}
