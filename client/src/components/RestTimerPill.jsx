import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Volume2, Sparkles } from 'lucide-react';

export const RestTimerPill = ({ defaultSeconds = 90 }) => {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      try {
        // Subtle Web Audio chime
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } catch (e) {
        // Ignore audio errors
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (newSec = 90) => {
    setIsActive(false);
    setSeconds(newSec);
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 animate-fadeIn">
      <div className="glass-panel-elevated rounded-full p-2 pr-4 shadow-[0_10px_35px_rgba(0,0,0,0.6)] border border-[#CCFF00]/30 flex items-center space-x-3 text-white">
        {/* Pulsing Timer Icon */}
        <button
          onClick={toggleTimer}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isActive
              ? 'bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.5)]'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
          title={isActive ? 'Pause Rest Timer' : 'Start Rest Timer'}
        >
          {isActive ? (
            <Pause className="w-4 h-4 fill-black" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </button>

        {/* Time display */}
        <div className="leading-tight">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#CCFF00] font-black block">
            {isActive ? 'RESTING...' : 'REST TIMER'}
          </span>
          <span className="text-sm font-mono font-black tracking-tight text-white">
            {formatTime(seconds)}
          </span>
        </div>

        {/* Quick Presets */}
        <div className="hidden sm:flex items-center space-x-1 pl-1 border-l border-white/10">
          <button
            onClick={() => resetTimer(60)}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/5 hover:bg-white/10 text-zinc-300"
          >
            60s
          </button>
          <button
            onClick={() => resetTimer(90)}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/5 hover:bg-white/10 text-zinc-300"
          >
            90s
          </button>
          <button
            onClick={() => resetTimer(120)}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/5 hover:bg-white/10 text-zinc-300"
          >
            120s
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={() => resetTimer(defaultSeconds)}
          className="text-zinc-400 hover:text-white transition-colors pl-1"
          title="Reset timer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
