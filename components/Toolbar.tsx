import React, { useState, useEffect } from 'react';
import { Trash2, Copy, Sparkles, Scissors, Check, X } from 'lucide-react';

interface ToolbarProps {
  onClear: () => void;
  onCopy: () => void;
  onCleanSmart: () => void;
  onRemoveEmptyLines: () => void;
  textLength: number;
}

export const Toolbar: React.FC<ToolbarProps> = ({ 
  onClear, 
  onCopy, 
  onCleanSmart, 
  onRemoveEmptyLines,
  textLength 
}) => {
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  // Auto-reset confirmation state after 3 seconds
  useEffect(() => {
    if (confirmClear) {
      const timer = setTimeout(() => setConfirmClear(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmClear]);

  const handleCopy = () => {
    onCopy();
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleClearClick = () => {
    if (confirmClear) {
      onClear();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  };

  const isDisabled = textLength === 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 p-2 px-4">
      
      {/* Scrollable Action Container for mobile */}
      <div className="flex items-center gap-2 w-full overflow-x-auto pb-1 sm:pb-0 no-scrollbar justify-between">
        
        <div className="flex items-center gap-2">
           <button
            onClick={onRemoveEmptyLines}
            disabled={isDisabled}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Remove all empty lines"
          >
            <Scissors size={14} className="text-orange-500" />
            <span className="whitespace-nowrap">Trim Lines</span>
          </button>

          <button
            onClick={onCleanSmart}
            disabled={isDisabled}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Fix spacing and preserve paragraphs"
          >
            <Sparkles size={14} className="text-primary-500" />
            <span className="whitespace-nowrap">Smart Clean</span>
          </button>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
          <button
            onClick={handleCopy}
            disabled={isDisabled}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-medium rounded-md transition-all ${
              copyFeedback 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' 
                : 'text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {copyFeedback ? <Check size={14} /> : <Copy size={14} />}
            <span className="whitespace-nowrap">{copyFeedback ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleClearClick}
            disabled={isDisabled}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-medium rounded-md transition-all ${
              confirmClear
                ? 'bg-red-600 text-white border border-red-700 hover:bg-red-700 animate-pulse'
                : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/40'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {confirmClear ? <X size={14} /> : <Trash2 size={14} />}
            <span className="whitespace-nowrap">{confirmClear ? 'Confirm?' : 'Clear'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};