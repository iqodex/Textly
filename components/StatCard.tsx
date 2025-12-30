import React from 'react';
import { StatCardProps } from '../types';

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, detail }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-2 md:p-3 flex flex-col items-center text-center justify-center transition-colors group hover:bg-slate-50 dark:hover:bg-slate-850 h-full">
      <div className="mb-1 text-slate-400 dark:text-slate-500 group-hover:text-primary-500 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 leading-none mb-1">
        {value}
      </h3>
      <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wide">
        {label}
        {detail && <span className="block text-[9px] opacity-75 font-normal normal-case">{detail}</span>}
      </p>
    </div>
  );
};