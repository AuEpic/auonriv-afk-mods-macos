
import React from 'react';
import { ScriptConfig } from '../types';

interface Props {
  config: ScriptConfig;
  setConfig: (config: ScriptConfig) => void;
  isActive: boolean;
  onToggle: () => void;
}

const MainControls: React.FC<Props> = ({ config, setConfig, isActive, onToggle }) => {
  const handleChange = (key: keyof ScriptConfig, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Toggle Switch Component Inner */}
        {[
          { id: 'antiKickEnabled', label: 'Anti-Kick Logic', desc: 'Prevents inactivity detection' },
          { id: 'randomizePatterns', label: 'Pattern Randomizer', desc: 'Adds human-like variance' },
          { id: 'stealthMode', label: 'Stealth Execution', desc: 'Minimizes process footprint' },
        ].map((item) => (
          <div key={item.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-slate-200 font-semibold">{item.label}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <button
                onClick={() => handleChange(item.id as keyof ScriptConfig, !config[item.id as keyof ScriptConfig])}
                className={`w-12 h-6 rounded-full transition-colors relative ${config[item.id as keyof ScriptConfig] ? 'bg-sky-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${config[item.id as keyof ScriptConfig] ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </div>
        ))}

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <h3 className="text-slate-200 font-semibold mb-2">Movement Frequency</h3>
          <input
            type="range"
            min="1"
            max="60"
            value={config.moveInterval}
            onChange={(e) => handleChange('moveInterval', parseInt(e.target.value))}
            className="w-full accent-sky-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-xs text-slate-400 font-mono">
            <span>FAST (1s)</span>
            <span className="text-sky-400 font-bold">{config.moveInterval}s</span>
            <span>SLOW (60s)</span>
          </div>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={`w-full py-6 rounded-2xl font-orbitron font-bold text-xl tracking-widest transition-all transform active:scale-95 shadow-xl ${
          isActive 
            ? 'bg-red-500 hover:bg-red-400 text-white shadow-red-500/20' 
            : 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/20'
        }`}
      >
        {isActive ? 'ABORT COMMAND' : 'INITIATE ROUTINE'}
      </button>
    </div>
  );
};

export default MainControls;
