import React from 'react';

export interface TextStats {
  words: number;
  charsNoSpaces: number;
  charsWithSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  detail?: string;
}