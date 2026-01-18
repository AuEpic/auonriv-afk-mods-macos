
import React from 'react';
import { InsightData } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  insight: InsightData | null;
  loading: boolean;
}

const AiInsights: React.FC<Props> = ({ insight, loading }) => {
  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 animate-pulse">
        <div className="h-4 bg-slate-700 w-1/3 mb-4 rounded" />
        <div className="h-12 bg-slate-700 w-full rounded" />
      </div>
    );
  }

  if (!insight) return null;

  const chartData = [
    { value: insight.efficiencyRating },
    { value: 100 - insight.efficiencyRating }
  ];

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -z-0" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="max-w-[70%]">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 11-2 0 1 1 0 012 0zM8 16a1 1 0 100 2h4a1 1 0 100-2H8z" />
            </svg>
            <h3 className="text-indigo-400 font-orbitron text-xs font-bold uppercase tracking-widest">Gemini Tactical Insight</h3>
          </div>
          <h4 className="text-xl font-bold text-white mb-2">{insight.title}</h4>
          <p className="text-slate-400 text-sm italic leading-relaxed">
            "{insight.suggestion}"
          </p>
        </div>

        <div className="w-24 h-24 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={30}
                outerRadius={40}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                <Cell fill="#818cf8" />
                <Cell fill="#1e293b" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-indigo-300 font-bold">{insight.efficiencyRating}%</span>
            <span className="text-[8px] text-slate-500 uppercase">EFF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;
