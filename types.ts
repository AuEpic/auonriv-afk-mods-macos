
export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export interface ScriptConfig {
  moveInterval: number;
  antiKickEnabled: boolean;
  randomizePatterns: boolean;
  stealthMode: boolean;
  gameProfile: 'Marvel Rivals' | 'Valorant' | 'Custom';
}

export interface InsightData {
  title: string;
  suggestion: string;
  efficiencyRating: number;
}
