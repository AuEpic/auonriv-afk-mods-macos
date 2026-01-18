
import React, { useState, useEffect, useCallback } from 'react';
import DashboardHeader from './components/DashboardHeader';
import MainControls from './components/MainControls';
import ActivityLog from './components/ActivityLog';
import AiInsights from './components/AiInsights';
import TacticalView from './components/TacticalView';
import { LogEntry, ScriptConfig, InsightData } from './types';
import { getAiInsights, analyzeScreen } from './services/geminiService';

const App: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [config, setConfig] = useState<ScriptConfig>({
    moveInterval: 5,
    antiKickEnabled: true,
    randomizePatterns: true,
    stealthMode: false,
    gameProfile: 'Marvel Rivals'
  });
  const [insight, setInsight] = useState<InsightData | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      type,
      message
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  }, []);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    addLog(newState ? 'INITIATING TACTICAL SEQUENCE...' : 'CEASING ALL OPERATIONS.', newState ? 'success' : 'warning');
  };

  const handleAnalyzeScreen = async (base64: string) => {
    setIsAnalyzing(true);
    addLog("BATTLEFIELD SCAN IN PROGRESS...", "info");
    const result = await analyzeScreen(base64);
    addLog(`ANALYSIS: ${result}`, "success");
    setIsAnalyzing(false);
  };

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        addLog(`Executing movement routine (Interval: ${config.moveInterval}s)`, 'info');
      }, config.moveInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, config.moveInterval, addLog]);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const res = await getAiInsights(config);
      setInsight(res);
      setLoadingInsight(false);
    };

    fetchInsight();
  }, []); 

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader isActive={isActive} />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visuals & AI */}
        <div className="lg:col-span-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-sky-500 rounded-full" />
              <h2 className="text-xl font-orbitron font-bold uppercase tracking-widest text-slate-100">Tactical Feed</h2>
            </div>
            <TacticalView 
              onAnalyze={handleAnalyzeScreen} 
              isAnalyzing={isAnalyzing} 
              addLog={addLog} 
            />
          </section>

          <section>
            <AiInsights insight={insight} loading={loadingInsight} />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Uptime', value: isActive ? '00:14:22' : '00:00:00', color: 'text-emerald-400' },
              { label: 'Actions Taken', value: isActive ? '184' : '0', color: 'text-sky-400' },
              { label: 'Detection Risk', value: config.randomizePatterns ? 'LOW' : 'MODERATE', color: config.randomizePatterns ? 'text-emerald-400' : 'text-amber-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{stat.label}</span>
                <span className={`text-xl font-orbitron font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Controls & Telemetry */}
        <div className="lg:col-span-4 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-sky-500 rounded-full" />
              <h2 className="text-xl font-orbitron font-bold uppercase tracking-widest text-slate-100">Control Unit</h2>
            </div>
            <MainControls 
              config={config} 
              setConfig={setConfig} 
              isActive={isActive} 
              onToggle={handleToggle} 
            />
          </section>

          <section className="h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-sky-500 rounded-full" />
              <h2 className="text-xl font-orbitron font-bold uppercase tracking-widest text-slate-100">Telemetry Feed</h2>
            </div>
            <ActivityLog logs={logs} />
            
            <div className="mt-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 relative group overflow-hidden">
               <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <h3 className="text-sm font-bold text-slate-300 mb-4 font-orbitron uppercase tracking-widest">Manual Override</h3>
               <div className="grid grid-cols-2 gap-3">
                 <button onClick={() => addLog('FORCE JUMP TRIGGERED', 'info')} className="py-3 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold uppercase rounded-lg transition-colors border border-slate-700">Jump Pulse</button>
                 <button onClick={() => addLog('RE-CENTERING CURSOR...', 'info')} className="py-3 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold uppercase rounded-lg transition-colors border border-slate-700">Center Aim</button>
                 <button onClick={() => addLog('RELOADING PROFILES', 'info')} className="py-3 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold uppercase rounded-lg transition-colors border border-slate-700">Reload Config</button>
                 <button onClick={() => setLogs([])} className="py-3 px-2 bg-slate-800 hover:bg-slate-700 text-red-400 text-[10px] font-bold uppercase rounded-lg transition-colors border border-slate-700">Clear Logs</button>
               </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="p-6 border-t border-slate-800 bg-slate-900/30 text-center">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
          Designed for the <span className="text-sky-400">Rivals-AFK-Helper</span> Community // Made with ⚡
        </p>
      </footer>
    </div>
  );
};

export default App;
