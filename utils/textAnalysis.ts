import { TextStats } from '../types';

export const calculateStats = (text: string): TextStats => {
  if (!text) {
    return {
      words: 0,
      charsNoSpaces: 0,
      charsWithSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: '0 sec',
    };
  }

  // Words: Split by whitespace and filter out empty strings
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Characters with spaces
  const charsWithSpaces = text.length;

  // Characters without spaces: Remove all whitespace regex
  const charsNoSpaces = text.replace(/\s/g, '').length;

  // Sentences: Approximate split by punctuation (. ! ?) followed by space or end of string
  const sentences = text.split(/[.!?]+(?=\s|$)/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length;

  // Paragraphs: Split by one or more newlines
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
  const paragraphCount = paragraphs.length;

  // Reading Time: Avg 200 words per minute
  const wpm = 200;
  const minutes = wordCount / wpm;
  let readingTime = '';
  if (minutes < 1) {
    const seconds = Math.ceil(minutes * 60);
    readingTime = `${seconds} sec`;
  } else {
    readingTime = `${Math.ceil(minutes)} min`;
  }

  return {
    words: wordCount,
    charsNoSpaces,
    charsWithSpaces,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
    readingTime,
  };
};

export const cleanText = (text: string): string => {
  if (!text) return '';
  
  // 1. Normalize line endings
  // 2. Trim every individual line
  const lines = text.split(/\r?\n/).map(line => line.trim());
  
  // 3. Filter out multiple consecutive empty lines, keeping max 1 empty line (for paragraph break)
  const cleanedLines: string[] = [];
  let emptyLineCount = 0;

  for (const line of lines) {
    if (line === '') {
      emptyLineCount++;
      // Only allow one empty line to signify a paragraph break
      if (emptyLineCount <= 1) {
        cleanedLines.push(line);
      }
    } else {
      emptyLineCount = 0;
      // Replace multiple internal spaces with a single space
      cleanedLines.push(line.replace(/[ \t]+/g, ' '));
    }
  }

  // 4. Join and trim result
  return cleanedLines.join('\n').trim();
};

export const removeExtraSpacesOnly = (text: string): string => {
    return text.replace(/[ \t]+/g, ' ').trim();
}

export const removeAllEmptyLines = (text: string): string => {
    // Replaces line breaks that are on empty lines, effectively merging lines
    return text
      .split('\n')
      .filter(line => line.trim().length > 0)
      .join('\n')
      .trim();
}