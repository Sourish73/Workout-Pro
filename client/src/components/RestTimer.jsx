import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const RestTimer = () => {
  const {
    isTimerRunning,
    restSeconds,
    initialRestDuration,
    startRestTimer,
    pauseRestTimer,
    resumeRestTimer,
    resetRestTimer,
    isTimerMinimized,
    setIsTimerMinimized,
  } = useWorkout();

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const PRESETS = [60, 90, 120, 180];
  const isTimeZero = restSeconds === 0;

  const progressPercent = initialRestDuration > 0
    ? Math.max(0, Math.min(100, ((initialRestDuration - restSeconds) / initialRestDuration) * 100))
    : 0;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-30 max-w-sm">
      {isTimerMinimized ? (
        <div
          onClick={() => setIsTimerMinimized(false)}
          className="flex items-center space-x-2.5 px-3.5 py-2 rounded-full bg-obsidian-card/95 border border-pink-border shadow-glow-pink cursor-pointer backdrop-blur-md hover:scale-105 transition-all"
        >
          <Timer className={`w-4 h-4 ${isTimerRunning ? 'text-pink-neon animate-spin' : 'text-zinc-subtext'}`} />
          <span className="font-mono font-bold text-sm text-pink-neon">
            {formatTime(restSeconds)}
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-zinc-dim" />
        </div>
      ) : (
        <div className="w-72 sm:w-80 rounded-2xl bg-obsidian-card/95 border border-pink-border/60 shadow-2xl backdrop-blur-xl p-4 transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-obsidian-border mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-pink-subtle border border-pink-border flex items-center justify-center">
                <Timer className="w-3.5 h-3.5 text-pink-neon" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Winter Arc Rest Timer
              </span>
            </div>

            <button
              onClick={() => setIsTimerMinimized(true)}
              className="p-1 rounded-lg hover:bg-obsidian-elevated text-zinc-dim hover:text-white transition-colors"
              title="Minimize timer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Time Countdown Display */}
          <div className="text-center my-2">
            <div
              className={`text-4xl font-extrabold font-mono tracking-tight transition-colors ${
                isTimeZero
                  ? 'text-pink-neon animate-pulse'
                  : isTimerRunning
                  ? 'text-white'
                  : 'text-zinc-subtext'
              }`}
            >
              {formatTime(restSeconds)}
            </div>
            <p className="text-[11px] text-zinc-dim mt-0.5">
              {isTimeZero
                ? '🔔 Rest complete! Set up for next round.'
                : isTimerRunning
                ? '⚡ Recovering muscle glycogen & ATP...'
                : 'Paused'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-obsidian-elevated h-1.5 rounded-full overflow-hidden my-3 border border-obsidian-border">
            <div
              className="bg-pink-neon h-full transition-all duration-500 rounded-full shadow-glow-pink-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Presets */}
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {PRESETS.map((seconds) => (
              <button
                key={seconds}
                onClick={() => startRestTimer(seconds)}
                className={`py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  initialRestDuration === seconds && !isTimeZero
                    ? 'bg-pink-neon text-black shadow-glow-pink-sm font-bold'
                    : 'bg-obsidian-elevated border border-obsidian-border text-zinc-subtext hover:border-pink-border hover:text-white'
                }`}
              >
                {seconds}s
              </button>
            ))}
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={() => resetRestTimer(initialRestDuration)}
              className="flex-1 py-2 rounded-xl bg-obsidian-elevated border border-obsidian-border hover:bg-obsidian-cardHover text-zinc-subtext hover:text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {isTimerRunning ? (
              <button
                onClick={pauseRestTimer}
                className="flex-[2] py-2 rounded-xl bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500/30 text-amber-400 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
              >
                <Pause className="w-3.5 h-3.5 fill-amber-400" />
                <span>Pause</span>
              </button>
            ) : (
              <button
                onClick={resumeRestTimer}
                className="flex-[2] py-2 rounded-xl bg-pink-neon hover:bg-pink-hot text-black font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-glow-pink transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Start Rest</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
