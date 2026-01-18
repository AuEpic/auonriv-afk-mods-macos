
import React from 'react';

interface Props {
  isActive: boolean;
}

const DashboardHeader: React.FC<Props> = ({ isActive }) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-orbitron font-bold tracking-wider text-slate-100 uppercase">Rivals Tactical</h1>
          <p className="text-xs text-slate-400 font-medium">VERSION 2.0.4 // BY AUEPIC</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">System Status</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            <span className={`text-sm font-bold ${isActive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isActive ? 'ACTIVE COMMAND' : 'SYSTEM STANDBY'}
            </span>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
