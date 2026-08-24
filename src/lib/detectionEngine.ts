/**
 * Content Detection Engine - v3.0 (stylometric)
 *
 * HONEST SCOPE: this is a free, offline heuristic analyzer. It has no
 * trained ML classifier and no document/web corpus to match against, so
 * it cannot know for certain whether text is AI-generated or plagiarized
 * from a specific source. What it CAN do reliably is measure real,
 * well-established stylometric statistics that correlate with machine-
 * generated text (the same category of signal early, non-ML detectors
 * used): sentence-length uniformity, vocabulary richness, sentence-
 * starter diversity, and readability consistency.
 *
 * WHY THIS VERSION IS LESS "RANDOM" THAN v2.0:
 * The previous engine scored each sentence independently off isolated
 * keyword hits (e.g. one sentence containing "moreover" would swing that
 * sentence's score by +20). That makes the overall score noisy and
 * unstable - two texts with near-identical AI-ness could score very
 * differently just because of which sentence happened to contain a
 * trigger word.
 *
 * This version scores the DOCUMENT as a whole first, using aggregate
 * statistics that are inherently more stable (they average out sentence-
 * to-sentence noise), and only afterwards uses that document-level
 * picture to explain which individual sentences look most consistent
 * with the pattern. The score and the highlighted sentences now agree
 * with each other by construction, instead of being computed
 * independently.
 */

export interface AnalysisResult {
  text: string;
  aiPercentage: number;
  plagiarismPercentage: number;
  totalPercentage: number;
  sentences: AnalyzedSentence[];
  summary: string;
  methodsUsed: string[];
  confidence: number;
}

export interface AnalyzedSentence {
  text: string;
  type: 'original' | 'ai-generated' | 'plagiarized';
  confidence: number;
  startIndex: number;
  endIndex: number;
  reasons: string[];
}

export interface ContentFingerprint {
  hash: string;
  nGrams: Set<string>;
}

// ============================================================================
// REFERENCE WORD LISTS
// These are only used as INPUT to document-level density/entropy
// calculations below - never as a per-sentence "gotcha" match anymore.
// ============================================================================

const TRANSITION_WORDS = [
  'furthermore', 'moreover', 'additionally', 'consequently', 'therefore',
  'thus', 'hence', 'as a result', 'in conclusion', 'ultimately', 'in essence',
  'in summary', 'notably', 'significantly', 'evidently', 'arguably',
  'in light of', 'given that', 'it should be noted', 'it is worth noting',
  'it is important to note', 'on the other hand', 'conversely', 'by contrast',
  'in the same way', 'similarly', 'likewise', 'overall', 'in this context'
];

const FORMAL_VOCAB = [
  'endeavor', 'elucidate', 'facilitate', 'ameliorate', 'substantiate',
  'corroborate', 'paradigm', 'exemplify', 'delineate', 'illuminate',
  'precipitate', 'exacerbate', 'mitigate', 'cogent', 'obfuscate', 'construe',
  'salient', 'meticulous', 'sagacious', 'tacit', 'verisimilitude',
  'juxtapose', 'confluence', 'extrapolate', 'nuanced', 'multifaceted',
  'underscore', 'underscores', 'holistic', 'robust', 'leverage', 'leveraging'
];

const FUNCTION_WORDS = new Set([
  'the', 'a', 'an', 'of', 'in', 'on', 'to', 'and', 'but', 'for', 'with',
  'as', 'at', 'by', 'from', 'that', 'which', 'this', 'these', 'those',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'may', 'might',
  'must', 'can', 'could', 'not', 'no', 'so', 'if', 'or', 'it', 'its'
]);

const CITATION_PATTERNS = [
  /\[\d+\]/g,
  /\(https?:\/\/[^\)]+\)/g,
  /\(\s*\d{4}\s*\)/g, // (2023) style in-text citation
  /retrieve[d]? from/gi,
  /accessed? on/gi,
  /doi\s*:/gi,
];

// ============================================================================
// LOW-LEVEL TEXT UTILITIES
// ============================================================================

/**
 * Splits text into sentences, correctly handling common abbreviations and
 * decimal numbers so they don't get mistaken for sentence boundaries
 * (the old regex-only splitter broke on "Dr. Smith", "e.g.", "3.14", etc,
 * which corrupted every downstream word/sentence-length statistic).
 */
function splitSentences(text: string): string[] {
  const ABBREVIATIONS = [
    'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr', 'st', 'vs', 'etc', 'eg',
    'ie', 'e.g', 'i.e', 'inc', 'ltd', 'co', 'no', 'pp', 'fig', 'approx',
    'u.s', 'u.k', 'u.n', 'ph.d', 'm.d', 'b.a', 'm.a', 'vol', 'ed'
  ];

  // Temporarily mask periods that are part of abbreviations or decimals
  // so the sentence-boundary regex below doesn't split on them.
  let masked = text;

  // Decimals: 3.14 -> 3<DOT>14
  masked = masked.replace(/(\d)\.(\d)/g, '$1<DOT>$2');

  // Known abbreviations followed by a period
  for (const abbr of ABBREVIATIONS) {
    const re = new RegExp(`\\b${abbr.replace('.', '\\.')}\\.`, 'gi');
    masked = masked.replace(re, (m) => m.slice(0, -1) + '<DOT>');
  }

  // Single capital letter initials: "J. K. Rowling" -> keep together
  masked = masked.replace(/\b([A-Z])\.(?=\s?[A-Z])/g, '$1<DOT>');

  const rawSentences = masked.match(/[^.!?]*[.!?]+(?=\s|$)|[^.!?]+$/g) || [];

  return rawSentences
    .map(s => s.replace(/<DOT>/g, '.').trim())
    .filter(s => s.length > 0);
}

function tokenizeWords(text: string): string[] {
  return (text.toLowerCase().match(/[a-z']+/g) || []).filter(w => w.length > 0);
}

/** Heuristic syllable counter (vowel-group counting) for readability scoring. */
function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length === 0) return 0;
  if (w.length <= 3) return 1;
  const groups = w
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    .replace(/^y/, '')
    .match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups ? groups.length : 1);
}

/** Flesch Reading Ease for a single sentence (approximate, self-contained). */
function fleschReadingEase(sentenceWords: string[]): number {
  const wordCount = sentenceWords.length || 1;
  const syllableCount = sentenceWords.reduce((sum, w) => sum + countSyllables(w), 0);
  // Using 1 sentence: 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
  return 206.835 - 1.015 * wordCount - 84.6 * (syllableCount / wordCount);
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function stdev(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  const variance = values.reduce((sum, v) => sum + (v - m) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

/** Shannon entropy (bits) of a frequency distribution, normalized to 0-1. */
function normalizedEntropy(counts: number[]): number {
  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0 || counts.length <= 1) return 0;
  const probs = counts.filter(c => c > 0).map(c => c / total);
  const entropy = -probs.reduce((sum, p) => sum + p * Math.log2(p), 0);
  const maxEntropy = Math.log2(probs.length);
  return maxEntropy > 0 ? entropy / maxEntropy : 0;
}

/** Yule's K - vocabulary richness measure, independent of text length. Lower = richer/more varied vocabulary. */
function yulesK(words: string[]): number {
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  const freqOfFreq: Record<number, number> = {};
  Object.values(freq).forEach(f => { freqOfFreq[f] = (freqOfFreq[f] || 0) + 1; });

  const N = words.length;
  if (N === 0) return 0;

  let sumFiSquared = 0;
  for (const f in freqOfFreq) {
    const freqValue = Number(f);
    sumFiSquared += freqOfFreq[freqValue] * freqValue * freqValue;
  }

  return 10000 * (sumFiSquared - N) / (N * N);
}

// ============================================================================
// DOCUMENT-LEVEL FEATURE EXTRACTION
// ============================================================================

interface DocumentStats {
  wordCount: number;
  sentenceCount: number;
  sentenceLengths: number[];
  sentenceLengthCV: number;       // coefficient of variation - low = suspiciously uniform
  starterEntropy: number;         // 0-1, low = repetitive sentence openings
  vocabRichnessK: number;         // Yule's K, high = repetitive vocabulary
  readabilityStdev: number;       // low = suspiciously consistent tone/complexity
  punctuationEntropy: number;     // 0-1, low = monotonous punctuation
  transitionDensityPer1000: number;
  formalityDensityPer1000: number;
  repeatedNgramRatio: number;     // exact 5-gram self-repetition, useful for both signals
  citationHits: number;
  multiSpaceArtifacts: number;
  reliableSampleSize: boolean;    // false if text too short for stats to mean anything
}

function computeDocumentStats(text: string, sentences: string[]): DocumentStats {
  const words = tokenizeWords(text);
  const wordCount = words.length;

  const sentenceWordLists = sentences.map(s => tokenizeWords(s));
  const sentenceLengths = sentenceWordLists.map(w => w.length).filter(n => n > 0);

  const lenMean = mean(sentenceLengths);
  const lenStdev = stdev(sentenceLengths);
  const sentenceLengthCV = lenMean > 0 ? lenStdev / lenMean : 0;

  // Sentence-starter entropy: distribution of each sentence's first word
  const starters = sentenceWordLists.filter(w => w.length > 0).map(w => w[0]);
  const starterCounts: Record<string, number> = {};
  starters.forEach(s => { starterCounts[s] = (starterCounts[s] || 0) + 1; });
  const starterEntropy = normalizedEntropy(Object.values(starterCounts));

  const vocabRichnessK = yulesK(words);

  const readabilityScores = sentenceWordLists
    .filter(w => w.length >= 4)
    .map(w => fleschReadingEase(w));
  const readabilityStdev = stdev(readabilityScores);

  const punctuationMatches = text.match(/[.,!?;:—–\-"'()]/g) || [];
  const punctCounts: Record<string, number> = {};
  punctuationMatches.forEach(p => { punctCounts[p] = (punctCounts[p] || 0) + 1; });
  const punctuationEntropy = normalizedEntropy(Object.values(punctCounts));

  const lowerText = text.toLowerCase();
  const transitionHits = TRANSITION_WORDS.reduce(
    (sum, t) => sum + (lowerText.split(t).length - 1), 0
  );
  const formalityHits = FORMAL_VOCAB.reduce(
    (sum, f) => sum + (lowerText.split(f).length - 1), 0
  );
  const transitionDensityPer1000 = wordCount > 0 ? (transitionHits / wordCount) * 1000 : 0;
  const formalityDensityPer1000 = wordCount > 0 ? (formalityHits / wordCount) * 1000 : 0;

  // 5-gram self-repetition ratio - genuinely meaningful signal for both
  // "templated AI text" and "copy-pasted duplicate content" without
  // needing any external corpus.
  const ngramSize = 5;
  const ngrams: string[] = [];
  for (let i = 0; i <= words.length - ngramSize; i++) {
    ngrams.push(words.slice(i, i + ngramSize).join(' '));
  }
  const ngramCounts: Record<string, number> = {};
  ngrams.forEach(g => { ngramCounts[g] = (ngramCounts[g] || 0) + 1; });
  const repeatedNgrams = Object.values(ngramCounts).filter(c => c > 1).length;
  const repeatedNgramRatio = ngrams.length > 0 ? repeatedNgrams / ngrams.length : 0;

  let citationHits = 0;
  CITATION_PATTERNS.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) citationHits += matches.length;
  });

  const multiSpaceArtifacts = (text.match(/ {2,}/g) || []).length +
    (text.match(/[\n\r]{3,}/g) || []).length;

  return {
    wordCount,
    sentenceCount: sentences.length,
    sentenceLengths,
    sentenceLengthCV,
    starterEntropy,
    vocabRichnessK,
    readabilityStdev,
    punctuationEntropy,
    transitionDensityPer1000,
    formalityDensityPer1000,
    repeatedNgramRatio,
    citationHits,
    multiSpaceArtifacts,
    reliableSampleSize: wordCount >= 120 && sentences.length >= 6,
  };
}

// ============================================================================
// SCORING
// A contribution function maps a feature value to a 0-max point
// contribution. Each is monotonic and clamped, so the total score moves
// smoothly with the underlying statistics instead of jumping around.
// ============================================================================

function contribution(value: number, lowBound: number, highBound: number, maxPoints: number, invert = false): number {
  // Maps value linearly between lowBound and highBound to 0..maxPoints.
  // If invert=true, low values score high (used for "uniformity is suspicious" features).
  const clamped = Math.max(lowBound, Math.min(highBound, value));
  const ratio = (clamped - lowBound) / (highBound - lowBound || 1);
  return (invert ? 1 - ratio : ratio) * maxPoints;
}

interface DocumentScore {
  aiScore: number;
  aiReasons: string[];
  plagiarismScore: number;
  plagiarismReasons: string[];
}

function scoreDocument(stats: DocumentStats): DocumentScore {
  const aiReasons: string[] = [];
  let aiScore = 0;

  if (!stats.reliableSampleSize) {
    aiReasons.push(
      `Text is short (${stats.wordCount} words, ${stats.sentenceCount} sentences) - statistical signals below ~120 words / 6 sentences are unreliable, score is a low-confidence estimate only`
    );
  }

  // 1) Sentence-length uniformity (coefficient of variation). Human writing
  //    naturally varies sentence length a lot; CV below ~0.35 is unusually flat.
  const cvPoints = contribution(stats.sentenceLengthCV, 0.15, 0.55, 25, true);
  aiScore += cvPoints;
  if (cvPoints > 12) {
    aiReasons.push(
      `Sentence lengths are unusually uniform (variation coefficient ${stats.sentenceLengthCV.toFixed(2)}) - human writing typically varies sentence length more`
    );
  }

  // 2) Sentence-starter diversity. Low entropy = repeatedly starting
  //    sentences the same way (a common LLM tic).
  const starterPoints = contribution(stats.starterEntropy, 0.55, 0.9, 20, true);
  aiScore += starterPoints;
  if (starterPoints > 10) {
    aiReasons.push('Low diversity in how sentences begin (repetitive sentence openings)');
  }

  // 3) Readability consistency across sentences. Very low variance =
  //    suspiciously constant tone/complexity sentence to sentence.
  const readabilityPoints = stats.readabilityStdev > 0
    ? contribution(stats.readabilityStdev, 8, 28, 15, true)
    : 0;
  aiScore += readabilityPoints;
  if (readabilityPoints > 8) {
    aiReasons.push('Reading-complexity stays unusually constant across sentences');
  }

  // 4) Transition/hedging phrase density, normalized per 1000 words
  //    (not raw counts - a long human essay will naturally use several).
  const transitionPoints = contribution(stats.transitionDensityPer1000, 4, 18, 15);
  aiScore += transitionPoints;
  if (transitionPoints > 8) {
    aiReasons.push(
      `High density of formal transition phrases (${stats.transitionDensityPer1000.toFixed(1)} per 1000 words)`
    );
  }

  // 5) Formal/elevated vocabulary density.
  const formalityPoints = contribution(stats.formalityDensityPer1000, 2, 10, 10);
  aiScore += formalityPoints;
  if (formalityPoints > 5) {
    aiReasons.push('Elevated/formal vocabulary appears more densely than typical writing');
  }

  // 6) Vocabulary richness (Yule's K) - only meaningful on longer text.
  if (stats.reliableSampleSize) {
    const vocabPoints = contribution(stats.vocabRichnessK, 80, 220, 15);
    aiScore += vocabPoints;
    if (vocabPoints > 8) {
      aiReasons.push('Lower vocabulary diversity than typical for this length of text');
    }
  }

  aiScore = Math.min(100, Math.round(aiScore));

  if (aiReasons.length === 0) {
    aiReasons.push('No strong statistical indicators of AI-generated writing detected');
  }

  // --- Plagiarism/copy-paste signal ---
  // Deliberately narrow: without a real corpus/web index to match against,
  // the only honest signals available are (a) formatting artifacts typical
  // of pasted content, (b) citation-format density, and (c) exact
  // repeated phrase blocks within the document itself.
  const plagiarismReasons: string[] = [];
  let plagiarismScore = 0;

  const artifactPoints = Math.min(25, stats.multiSpaceArtifacts * 5);
  plagiarismScore += artifactPoints;
  if (artifactPoints > 0) {
    plagiarismReasons.push(`${stats.multiSpaceArtifacts} copy-paste formatting artifact(s) found (double spaces / irregular line breaks)`);
  }

  const citationPoints = Math.min(30, stats.citationHits * 10);
  plagiarismScore += citationPoints;
  if (citationPoints > 0) {
    plagiarismReasons.push(`${stats.citationHits} citation/reference-style pattern(s) detected`);
  }

  const repeatPoints = contribution(stats.repeatedNgramRatio, 0.03, 0.25, 45);
  plagiarismScore += repeatPoints;
  if (repeatPoints > 10) {
    plagiarismReasons.push('Repeated 5-word phrase blocks found within the document (possible duplicated/templated content)');
  }

  plagiarismScore = Math.min(100, Math.round(plagiarismScore));
  if (plagiarismReasons.length === 0) {
    plagiarismReasons.push('No copy-paste formatting artifacts or internal duplication detected');
  }

  return { aiScore, aiReasons, plagiarismScore, plagiarismReasons };
}

// ============================================================================
// SENTENCE-LEVEL HIGHLIGHTING
// Uses the document's own verdict to explain WHICH sentences best match
// the pattern that drove the score, instead of scoring each sentence off
// an unrelated set of keyword rules. Keeps the highlights consistent with
// the headline percentage.
// ============================================================================

function classifySentences(
  sentences: string[],
  stats: DocumentStats,
  docScore: DocumentScore
): AnalyzedSentence[] {
  const lowerTransitions = TRANSITION_WORDS;
  const lowerFormal = FORMAL_VOCAB;
  let currentIndex = 0;

  return sentences.map((sentence) => {
    const words = tokenizeWords(sentence);
    const wordCount = words.length || 1;
    const lower = sentence.toLowerCase();

    const startIndex = currentIndex;
    const endIndex = currentIndex + sentence.length;
    currentIndex = endIndex + 1;

    const reasons: string[] = [];
    let type: 'original' | 'ai-generated' | 'plagiarized' = 'original';
    let localConfidence = 0;

    // Only mark individual sentences when the DOCUMENT-level score is
    // already elevated - a single formal sentence in an otherwise normal
    // essay isn't evidence of anything on its own.
    if (docScore.aiScore > 35) {
      const hasTransition = lowerTransitions.some(t => lower.includes(t));
      const hasFormalWord = lowerFormal.some(f => lower.includes(f));
      const closeToMeanLength = stats.sentenceLengths.length > 0 &&
        Math.abs(wordCount - mean(stats.sentenceLengths)) < stdev(stats.sentenceLengths) * 0.5;

      const localHits = [hasTransition, hasFormalWord, closeToMeanLength].filter(Boolean).length;

      if (localHits >= 2) {
        type = 'ai-generated';
        localConfidence = Math.min(1, docScore.aiScore / 100 + 0.1 * localHits);
        if (hasTransition) reasons.push('Contains a formal transition phrase typical of the document-wide pattern');
        if (hasFormalWord) reasons.push('Contains elevated/formal vocabulary typical of the document-wide pattern');
        if (closeToMeanLength) reasons.push("Sentence length matches the document's unusually uniform pattern");
      }
    }

    if (type === 'original' && docScore.plagiarismScore > 35) {
      const hasCitation = CITATION_PATTERNS.some(p => p.test(sentence));
      const hasArtifact = / {2,}/.test(sentence);
      if (hasCitation || hasArtifact) {
        type = 'plagiarized';
        localConfidence = Math.min(1, docScore.plagiarismScore / 100);
        if (hasCitation) reasons.push('Contains a citation/reference-style pattern');
        if (hasArtifact) reasons.push('Contains copy-paste formatting artifacts');
      }
    }

    return {
      text: sentence,
      type,
      confidence: localConfidence,
      startIndex,
      endIndex,
      reasons,
    };
  });
}

// ============================================================================
// PUBLIC API
// ============================================================================

export function analyzeContent(text: string): AnalysisResult {
  if (!text || text.trim().length === 0) {
    return {
      text,
      aiPercentage: 0,
      plagiarismPercentage: 0,
      totalPercentage: 0,
      sentences: [],
      summary: 'No text provided for analysis.',
      methodsUsed: [],
      confidence: 0,
    };
  }

  const sentences = splitSentences(text);

  if (sentences.length === 0) {
    return {
      text,
      aiPercentage: 0,
      plagiarismPercentage: 0,
      totalPercentage: 0,
      sentences: [],
      summary: 'Unable to parse meaningful sentences from the provided text.',
      methodsUsed: [],
      confidence: 0,
    };
  }

  const stats = computeDocumentStats(text, sentences);
  const docScore = scoreDocument(stats);
  const analyzedSentences = classifySentences(sentences, stats, docScore);

  const aiPercentage = docScore.aiScore;
  const plagiarismPercentage = docScore.plagiarismScore;
  const totalPercentage = Math.min(100, aiPercentage + plagiarismPercentage);

  const methodsUsed = [
    'Sentence-length uniformity (coefficient of variation)',
    'Sentence-starter entropy',
    'Readability consistency across sentences',
    'Transition-phrase density',
    'Formal vocabulary density',
    stats.reliableSampleSize ? "Vocabulary richness (Yule's K)" : "Vocabulary richness (skipped - text too short)",
    'Citation/reference pattern detection',
    'Copy-paste formatting artifact detection',
    '5-gram internal repetition detection',
  ];

  // Confidence in the estimate itself (not confidence that text IS
  // AI/plagiarized) - reflects how reliable the statistics are given
  // sample size, separately from the score.
  const confidence = stats.reliableSampleSize ? 0.7 : 0.3;

  const summary = `
📊 ANALYSIS REPORT (Free stylometric heuristic - not a certified detector)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 AI-Pattern Score: ${aiPercentage}%
${docScore.aiReasons.map(r => `   → ${r}`).join('\n')}

🔵 Copy-Paste Signal: ${plagiarismPercentage}%
${docScore.plagiarismReasons.map(r => `   → ${r}`).join('\n')}

📈 Document Stats:
   • Words analyzed: ${stats.wordCount}
   • Sentences analyzed: ${stats.sentenceCount}
   • Sentence-length variation coefficient: ${stats.sentenceLengthCV.toFixed(2)}
   • Sentence-starter diversity: ${(stats.starterEntropy * 100).toFixed(0)}%
   • Sample size reliable for statistics: ${stats.reliableSampleSize ? 'Yes' : 'No - treat result as low-confidence'}

⚠️ IMPORTANT: This tool uses free statistical writing-pattern analysis, not a
trained AI-classifier model and not a web/document plagiarism database. It
can flag *statistical patterns consistent with* AI writing or copy-pasting,
but cannot confirm authorship or find an actual source. Always verify
manually before drawing conclusions.
  `.trim();

  return {
    text,
    aiPercentage,
    plagiarismPercentage,
    totalPercentage,
    sentences: analyzedSentences,
    summary,
    methodsUsed,
    confidence,
  };
}

/**
 * Generates detailed report data
 */
export function generateReportData(analysis: AnalysisResult) {
  return {
    timestamp: new Date().toISOString(),
    content: analysis,
    breakdown: {
      aiCount: analysis.sentences.filter(s => s.type === 'ai-generated').length,
      plagiarismCount: analysis.sentences.filter(s => s.type === 'plagiarized').length,
      originalCount: analysis.sentences.filter(s => s.type === 'original').length,
      totalSentences: analysis.sentences.length,
    },
  };
}