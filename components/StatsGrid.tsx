import React from 'react';
import { TextStats } from '../types';
import { StatCard } from './StatCard';
import { Type, AlignLeft, Hash, FileText, Clock, CaseSensitive } from 'lucide-react';

interface StatsGridProps {
  stats: TextStats;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-slate-200 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
      <StatCard 
        label="Words" 
        value={stats.words.toLocaleString()} 
        icon={<Type size={16} />} 
      />
      <StatCard 
        label="Characters" 
        value={stats.charsWithSpaces.toLocaleString()} 
        detail="(spaces)"
        icon={<AlignLeft size={16} />} 
      />
      <StatCard 
        label="Characters" 
        value={stats.charsNoSpaces.toLocaleString()} 
        detail="(no spaces)"
        icon={<Hash size={16} />} 
      />
      <StatCard 
        label="Sentences" 
        value={stats.sentences.toLocaleString()} 
        icon={<CaseSensitive size={16} />} 
      />
      <StatCard 
        label="Paragraphs" 
        value={stats.paragraphs.toLocaleString()} 
        icon={<FileText size={16} />} 
      />
      <StatCard 
        label="Read Time" 
        value={stats.readingTime} 
        icon={<Clock size={16} />} 
      />
    </div>
  );
};