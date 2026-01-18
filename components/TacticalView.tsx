
import React, { useRef, useState } from 'react';

interface Props {
  onAnalyze: (base64: string) => void;
  isAnalyzing: boolean;
  addLog: (msg: string, type: 'info' | 'warning' | 'error' | 'success') => void;
}

const TacticalView: React.FC<Props> = ({ onAnalyze, isAnalyzing, addLog }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCapture = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" } as any,
        audio: false
      });
      setStream(displayStream);
      if (videoRef.current) {
        videoRef.current.srcObject = displayStream;
      }
      addLog("Tactical link established with display source.", "success");
    } catch (err) {
      console.error("Error capturing screen:", err);
      addLog("Failed to establish tactical link.", "error");
    }
  };

  const stopCapture = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      addLog("Tactical link severed.", "warning");
    }
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      onAnalyze(base64);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {!stream ? (
          <button 
            onClick={startCapture}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-[10px] font-bold uppercase rounded-lg shadow-lg shadow-sky-500/20 flex items-center gap-2 transition-all"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Link Screen
          </button>
        ) : (
          <div className="flex gap-2">
             <button 
              onClick={captureFrame}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] font-bold uppercase rounded-lg shadow-lg shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-50 transition-all"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              AI Scan
            </button>
            <button 
              onClick={stopCapture}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold uppercase rounded-lg border border-slate-700"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      <div className="relative aspect-video bg-black flex items-center justify-center">
        {!stream && (
          <div className="text-center p-8">
            <div className="w-16 h-16 border-2 border-dashed border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-500 text-xs font-orbitron uppercase tracking-widest">Awaiting Video Input</p>
          </div>
        )}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className={`w-full h-full object-cover transition-opacity duration-500 ${stream ? 'opacity-100' : 'opacity-0 h-0'}`} 
        />
        {isAnalyzing && (
          <div className="absolute inset-0 bg-sky-500/10 flex items-center justify-center backdrop-blur-[2px]">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-sky-500/20 rounded-full border-t-sky-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-[8px] font-orbitron font-bold text-sky-400">SCANNING...</div>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-sky-500/50 animate-[scan_2s_infinite]" style={{ boxShadow: '0 0 15px #0ea5e9' }} />
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default TacticalView;
