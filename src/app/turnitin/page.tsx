'use client';

import React, { useState, useRef, useEffect } from 'react';
import { analyzeContent, generateReportData } from '@/lib/detectionEngine';
import { generatePDF } from '@/lib/pdfGenerator';
import { validateFile, normalizeText, fileToBuffer, getFileExtension } from '@/lib/fileParser';
import { parseFileServer, type FileParseResult } from '@/app/actions/fileActions';
import TurnitinFeedbackForm from '@/components/TurnitinFeedbackForm';
import type { AnalysisResult } from '@/lib/detectionEngine';

// Add CSS for animations
const animationStyles = `
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes glow {
    0%, 100% {
      text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    }
    50% {
      text-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
    }
  }

  .animate-slide-in-down { animation: slideInDown 0.6s ease-out; }
  .animate-slide-in-up { animation: slideInUp 0.6s ease-out; }
  .animate-fade-in { animation: fadeIn 0.8s ease-out; }
  .animate-pulse-custom { animation: pulse 2s ease-in-out infinite; }
  .animate-shimmer { animation: shimmer 2s infinite; }
  .animate-spin-slow { animation: rotate 3s linear infinite; }
  .animate-glow { animation: glow 2s ease-in-out infinite; }
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .premium-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  }
  
  .premium-card {
    background: linear-gradient(135deg, rgba(30, 30, 46, 0.8) 0%, rgba(40, 40, 60, 0.8) 100%);
    border: 1px solid rgba(99, 102, 241, 0.2);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  
  .hover-lift {
    transition: all 0.3s ease;
  }
  .hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 80px rgba(99, 102, 241, 0.3) !important;
  }
  
  .progress-bar-animated {
    background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
`;

export default function TurnitinPage() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'upload' | 'results'>('input');
  const [uploadError, setUploadError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setUploadError('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file');
      return;
    }

    setUploadError('');
    setIsAnalyzing(true);

    try {
      console.log(`🔄 Processing ${file.name}...`);
      
      // Convert file to buffer
      const buffer = await fileToBuffer(file);
      const fileType = getFileExtension(file.name);

      // Call server action for file parsing
      const parseResult: FileParseResult = await parseFileServer(buffer, file.name, fileType);
      
      const normalizedText = normalizeText(parseResult.text);
      
      setInputText(normalizedText);
      setUploadedFileName(parseResult.fileName);
      setActiveTab('input');
      
      // Show file info
      console.log(`✓ File parsed successfully: ${parseResult.fileName}`);
      console.log(`  • Type: ${parseResult.fileType.toUpperCase()}`);
      console.log(`  • Words: ${parseResult.metadata?.wordCount || 'N/A'}`);
      if (parseResult.metadata?.pages) {
        console.log(`  • Pages: ${parseResult.metadata.pages}`);
      }
    } catch (error) {
      console.error('File parsing error:', error);
      setUploadError(
        error instanceof Error ? error.message : 'Failed to parse file. Please try another file format.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setUploadError('Please enter or upload text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setUploadError('');

    try {
      // Simulate realistic processing time - scanning content with multiple algorithms takes time
      await new Promise(resolve => setTimeout(resolve, 3500));
      const result = analyzeContent(inputText);
      setAnalysisResult(result);
      setActiveTab('results');
    } catch (error) {
      console.error('Analysis error:', error);
      setUploadError('An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!analysisResult) return;

    try {
      const reportData = generateReportData(analysisResult);
      generatePDF(analysisResult, reportData);
    } catch (error) {
      console.error('PDF generation error:', error);
      setUploadError('Failed to generate PDF. Please try again.');
    }
  };

  const handleClear = () => {
    setInputText('');
    setAnalysisResult(null);
    setUploadError('');
    setUploadedFileName('');
    setActiveTab('input');
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-h-screen bg-white pt-28 pb-20">
        {/* Subtle background - no spotlights */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-10 lg:px-20 max-w-7xl relative z-10">
          {/* Premium Header */}
          <div className="text-center mb-16 animate-slide-in-down">
            <div className="inline-block mb-4">
              <div className="px-4 py-2 glass-effect rounded-full border border-blue-400/20 bg-blue-50">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-sm font-semibold">
                  🚀 Advanced Detection System
                </span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
              Turnitin
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 mb-3 font-light">
              AI & Plagiarism Detection with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 font-bold">100% Genuine Analysis</span>
            </p>
            <p className="text-gray-600 text-base">
              Using 11 Advanced Detection Algorithms • Professional-Grade Accuracy
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Input Section - Premium Card with Solid Black */}
            <div className="lg:col-span-2 animate-slide-in-up">
              <div className="hover-lift rounded-2xl p-8 md:p-10 bg-black border border-gray-800 shadow-2xl">
                {/* Tab Navigation with Glass Effect */}
                <div className="flex space-x-4 mb-8 border-b border-purple-500/30 pb-4">
                  <button
                    onClick={() => setActiveTab('input')}
                    className={`pb-3 px-6 font-semibold transition-all duration-300 relative ${
                      activeTab === 'input'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    ✍️ Paste Content
                    {activeTab === 'input' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    )}
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`pb-3 px-6 font-semibold transition-all duration-300 relative cursor-pointer ${
                      activeTab === 'upload'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    📁 Upload Document
                    {activeTab === 'upload' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {uploadError && (
                  <div className="bg-red-500/10 border border-red-500/30 backdrop-blur text-red-200 px-6 py-4 rounded-xl mb-6 animate-slide-in-up">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">⚠️</span>
                      <span>{uploadError}</span>
                    </div>
                  </div>
                )}

                {uploadedFileName && (
                  <div className="bg-green-500/10 border border-green-500/30 backdrop-blur text-green-200 px-6 py-4 rounded-xl mb-6 animate-slide-in-up">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">✅</span>
                      <span><strong>{uploadedFileName}</strong> - Ready for analysis</span>
                    </div>
                  </div>
                )}

                {/* File Upload Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="Upload document"
                />

                {/* Text Input Area */}
                {activeTab === 'input' && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">Paste your content below</label>
                    <textarea
                      value={inputText}
                      onChange={handleTextChange}
                      placeholder="Paste your essay, article, or document content here... (Max 5MB recommended)"
                      className="w-full h-96 p-6 bg-slate-800/50 text-white rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none resize-none placeholder-gray-500 backdrop-blur transition-all duration-300 font-mono text-sm leading-relaxed"
                    />
                  </div>
                )}

                {/* File Upload Area - Drag and Drop Style */}
                {activeTab === 'upload' && (
                  <div
                    className="border-2 border-dashed border-purple-500/50 rounded-xl p-12 text-center mb-6 bg-purple-500/5 hover:bg-purple-500/10 transition-all duration-300 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="animate-bounce mb-4" style={{ animationDuration: '2s' }}>
                      <div className="text-5xl mb-3">📄</div>
                    </div>
                    <p className="text-gray-300 font-semibold mb-2">Click to upload or drag and drop</p>
                    <p className="text-gray-400 text-sm">PDF, Word, TXT, or MD files • Up to 5MB recommended (50MB max)</p>
                  </div>
                )}

                {/* Character Count */}
                <div className="flex justify-between items-center text-xs text-gray-400 mb-8 pb-4 border-b border-purple-500/20">
                  <span>📊 <strong>{inputText.length.toLocaleString()}</strong> characters • <strong>{inputText.split(/\s+/).filter(w => w).length.toLocaleString()}</strong> words</span>
                  <span className="text-purple-400">Max: 50MB</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !inputText.trim()}
                    className={`flex-1 relative group overflow-hidden rounded-xl font-bold py-4 px-6 text-white transition-all duration-300 ${
                      isAnalyzing || !inputText.trim()
                        ? 'bg-gray-600 cursor-not-allowed opacity-50'
                        : 'premium-gradient hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin-slow">🔄</div>
                          <span>Analyzing with 11 Algorithms...</span>
                        </>
                      ) : (
                        <>
                          <span>🔍</span>
                          <span>Start Analysis</span>
                        </>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-6 py-4 bg-gray-700/50 hover:bg-gray-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 border border-gray-600"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Features Sidebar */}
            <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
             <div className="hover-lift rounded-2xl p-8 h-full bg-black border border-gray-800 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-5 flex items-center gap-2">
                    <span className="text-2xl">⚡</span> Detection Methods
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Transition Analysis',
                      'Vocabulary Patterns',
                      'Writing Structure',
                      'Sentence Syntax',
                      'Punctuation Marks',
                      'Word Repetition',
                      'Phrase Database',
                      'Reference Matching',
                      'Citation Formats',
                      'Content Hashing',
                      'N-gram Analysis'
                    ].map((method, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300 hover:text-gray-100 transition-colors">
                        <span className="text-purple-400">✓</span>
                        <span>{method}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-purple-500/20 space-y-4">
                  <div className="glass-effect rounded-lg p-4 border border-red-500/20">
                    <h4 className="text-red-400 font-bold mb-2 text-sm">🔴 AI-Generated</h4>
                    <p className="text-xs text-gray-300">Detects formal patterns, transitions, and artificial writing styles</p>
                  </div>
                  <div className="glass-effect rounded-lg p-4 border border-blue-500/20">
                    <h4 className="text-blue-400 font-bold mb-2 text-sm">🔵 Plagiarism Risk</h4>
                    <p className="text-xs text-gray-300">Identifies copied content and common phrases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {analysisResult && (
            <div className="animate-fade-in">
              <div className="hover-lift rounded-2xl p-8 md:p-10 bg-black border border-gray-800 shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mb-10">
                  📊 Analysis Results
                </h2>

                {/* Confidence Score - Prominent Display */}
                <div className="premium-gradient rounded-2xl p-8 mb-10 text-white shadow-2xl">
                  <div className="flex items-center justify-between flex-wrap gap-6">
                    <div>
                      <p className="text-gray-200 font-semibold mb-2 text-sm">Detection Confidence</p>
                      <p className="text-6xl font-black">
                        {(analysisResult.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-100 mb-2">Based on <span className="font-bold">{analysisResult.methodsUsed.length}</span> algorithms</p>
                      <p className="text-xs text-gray-200">Verified with multiple verification paths</p>
                    </div>
                  </div>
                </div>

                {/* Animated Percentage Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl border border-red-500/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 font-bold text-lg">🔴 AI-Generated</span>
                      <span className="text-3xl font-black text-red-400">{analysisResult.aiPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden border border-red-500/30">
                      <div
                        className="progress-bar-animated h-full transition-all duration-500 rounded-full shadow-lg shadow-red-500/50"
                        style={{ width: `${analysisResult.aiPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 font-bold text-lg">🔵 Copy-Pasted</span>
                      <span className="text-3xl font-black text-blue-400">{analysisResult.plagiarismPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden border border-blue-500/30">
                      <div
                        className="progress-bar-animated h-full transition-all duration-500 rounded-full shadow-lg shadow-blue-500/50"
                        style={{
                          width: `${analysisResult.plagiarismPercentage}%`,
                          background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[
                    { label: 'AI Sentences', value: analysisResult.sentences.filter(s => s.type === 'ai-generated').length, color: 'from-red-500 to-red-600', border: 'border-red-500/30' },
                    { label: 'Plagiarized', value: analysisResult.sentences.filter(s => s.type === 'plagiarized').length, color: 'from-blue-500 to-blue-600', border: 'border-blue-500/30' },
                    { label: 'Total Sentences', value: analysisResult.sentences.length, color: 'from-green-500 to-green-600', border: 'border-green-500/30' }
                  ].map((stat, i) => (
                    <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-center border ${stat.border} hover:shadow-lg hover:shadow-current/50 transition-all duration-300 hover:scale-105`}>
                      <p className="text-gray-100 text-sm font-semibold mb-2">{stat.label}</p>
                      <p className="text-4xl font-black text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Detection Methods Grid */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
                    <span>🔧</span> Detection Methods Used
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {analysisResult.methodsUsed.map((method, idx) => (
                      <div
                        key={idx}
                        className="glass-effect rounded-lg px-4 py-3 text-sm text-gray-300 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:bg-purple-500/10 text-center font-semibold"
                      >
                        ✓ {method}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Section */}
                <div className="bg-slate-800/50 rounded-xl p-6 mb-10 border border-purple-500/20">
                  <h3 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
                    <span>📋</span> Detailed Summary
                  </h3>
                  <p className="text-gray-300 whitespace-pre-line text-sm leading-relaxed font-mono bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 max-h-48 overflow-y-auto">
                    {analysisResult.summary}
                  </p>
                </div>

                {/* Highlighted Content Preview */}
                <div className="bg-slate-800/50 rounded-xl p-6 mb-10 border border-purple-500/20">
                  <h3 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
                    <span>🎯</span> Content Analysis Preview
                  </h3>
                  <div className="bg-slate-900/50 rounded-lg p-6 text-gray-300 text-sm leading-relaxed max-h-96 overflow-y-auto border border-slate-700/50">
                    {analysisResult.sentences.map((sentence, idx) => (
                      <div key={idx} className="mb-4">
                        {sentence.type === 'ai-generated' ? (
                          <div>
                            <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-lg inline-block break-words shadow-lg shadow-red-600/30 font-semibold">
                              {sentence.text}
                            </span>
                            <div className="text-red-300/80 text-xs mt-2 ml-2 space-y-1">
                              {sentence.reasons.map((r, i) => <div key={i} className="flex items-start gap-2"><span>•</span><span>{r}</span></div>)}
                            </div>
                          </div>
                        ) : sentence.type === 'plagiarized' ? (
                          <div>
                            <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-lg inline-block break-words shadow-lg shadow-blue-600/30 font-semibold">
                              {sentence.text}
                            </span>
                            <div className="text-blue-300/80 text-xs mt-2 ml-2 space-y-1">
                              {sentence.reasons.map((r, i) => <div key={i} className="flex items-start gap-2"><span>•</span><span>{r}</span></div>)}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">{sentence.text}</span>
                        )}
                        {' '}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download Button - Premium Style */}
                <button
                  onClick={handleDownloadPDF}
                  className="w-full relative group overflow-hidden rounded-xl font-bold py-4 px-6 text-white bg-gradient-to-r from-green-500 to-green-600 hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 transform"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2 text-lg">
                    <span>📥</span>
                    <span>Download Premium PDF Report</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Turnitin Feedback Form Section */}
      <TurnitinFeedbackForm />
    </>
  );
}
