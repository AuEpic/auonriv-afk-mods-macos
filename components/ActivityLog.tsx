
import React from 'react';
import { LogEntry } from '../types';

interface Props {
  logs: LogEntry[];
}

const ActivityLog: React.FC<Props> = ({ logs }) => {
  return (
    <div className="bg-black/40 rounded-xl border border-slate-800 h-64 flex flex-col overflow-hidden">
      <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
        <span className="text-[10px] font-orbitron font-bold text-slate-400 uppercase tracking-widest">Tactical Feed</span>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-amber-500/50" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
        </div>
      </div>
      <div className="p-4 flex-1 overflow-y-auto font-mono text-sm space-y-2">
        {logs.length === 0 && <p className="text-slate-600 italic">Awaiting telemetry data...</p>}
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 leading-relaxed group">
            <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
            <span className={`
              ${log.type === 'success' ? 'text-emerald-400' : ''}
              ${log.type === 'info' ? 'text-sky-400' : ''}
              ${log.type === 'warning' ? 'text-amber-400' : ''}
              ${log.type === 'error' ? 'text-red-400' : ''}
            `}>
              {log.message}
            </span>
          </div>
        ))}
        <div id="log-bottom" />
      </div>
    </div>
  );
};

export default ActivityLog;
