import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { authorConfig } from '../config/authorConfig';
import {
  Sparkles,
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Flame,
  Calculator,
  ArrowRight,
  TrendingUp,
  Download,
  Share2,
  Check,
  Layers,
} from 'lucide-react';

export const DesktopBentoSidebar = ({ setCurrentView }) => {
  const {
    openGymTools,
    activeDay,
    selectDay,
    trainingLevel,
    changeTrainingLevel,
    completedDays,
    isTimerRunning,
    restSeconds,
    initialRestDuration,
    startRestTimer,
    pauseRestTimer,
    resumeRestTimer,
    resetRestTimer,
    copyGuideLink,
    copyFeedback,
  } = useWorkout();

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const PRESETS = [60, 90, 120, 180];
  const progressPercent = initialRestDuration > 0
    ? Math.max(0, Math.min(100, ((initialRestDuration - restSeconds) / initialRestDuration) * 100))
    : 0;

  const completedCount = completedDays ? completedDays.length : 0;

  return (
    <aside className="space-y-4 sticky top-20">
      {/* 1. Winter Arc Guide Status & Level Card */}
      <div className="p-5 rounded-3xl bg-obsidian-card border border-pink-border shadow-glow-pink-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-pink-subtle border border-pink-border flex items-center justify-center text-pink-neon">
              <Sparkles className="w-4 h-4 fill-pink-neon" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-pink-rose font-bold block">
                FREE ATHLETE ACCESS
              </span>
              <h4 className="text-sm font-extrabold text-white">
                {authorConfig.programName}
              </h4>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
            UNLOCKED
          </span>
        </div>

        <p className="text-xs text-zinc-subtext leading-relaxed">
          12 weeks workout plan including 3 progressive levels. All 7 daily routines & tracking tools are active.
        </p>

        {/* Level Switcher */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-dim mb-1.5">
            <span>Current Level:</span>
            <span className="text-pink-neon font-bold uppercase">{trainingLevel}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['beginner', 'intermediate', 'advance'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => changeTrainingLevel(lvl)}
                className={`py-1.5 rounded-xl text-[11px] font-mono font-bold capitalize transition-all ${
                  trainingLevel === lvl
                    ? 'bg-pink-neon text-black shadow-glow-pink-sm'
                    : 'bg-obsidian-elevated border border-obsidian-border text-zinc-dim hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={copyGuideLink}
          className="w-full py-2.5 rounded-xl bg-obsidian-elevated hover:bg-obsidian-cardHover border border-pink-border text-xs font-semibold text-white flex items-center justify-center space-x-2 transition-all active:scale-95"
        >
          {copyFeedback ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-pink-neon" />
              <span>Share Guide With Friends</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Sticky Live Rest Timer Bento Card */}
      <div className="p-5 rounded-3xl bg-obsidian-card border border-obsidian-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-obsidian-elevated border border-obsidian-border flex items-center justify-center text-pink-neon">
              <Timer className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Rest Timer
            </h4>
          </div>
          <span className="text-[10px] font-mono text-zinc-dim">Web Audio Chime</span>
        </div>

        {/* Digital Display */}
        <div className="text-center py-1">
          <div
            className={`text-4xl font-black font-mono tracking-tight transition-colors ${
              restSeconds === 0
                ? 'text-pink-neon animate-pulse'
                : isTimerRunning
                ? 'text-white'
                : 'text-zinc-subtext'
            }`}
          >
            {formatTime(restSeconds)}
          </div>
          <p className="text-[11px] text-zinc-dim mt-0.5">
            {restSeconds === 0
              ? '🔔 Time to hit your next working set!'
              : isTimerRunning
              ? '⚡ Restoring neuromuscular power...'
              : 'Auto-starts on completed set'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-obsidian-elevated h-1.5 rounded-full overflow-hidden border border-obsidian-border">
          <div
            className="bg-pink-neon h-full transition-all duration-500 rounded-full shadow-glow-pink-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Presets */}
        <div className="grid grid-cols-4 gap-1.5">
          {PRESETS.map((seconds) => (
            <button
              key={seconds}
              onClick={() => startRestTimer(seconds)}
              className={`py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                initialRestDuration === seconds && restSeconds > 0
                  ? 'bg-pink-neon text-black font-bold shadow-glow-pink-sm'
                  : 'bg-obsidian-elevated border border-obsidian-border text-zinc-subtext hover:border-pink-border hover:text-white'
              }`}
            >
              {seconds}s
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => resetRestTimer(initialRestDuration)}
            className="flex-1 py-2 rounded-xl bg-obsidian-elevated border border-obsidian-border hover:bg-obsidian-cardHover text-zinc-subtext hover:text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
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
              <span>Start Timer</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Weekly Consistency Bento Card */}
      <div className="p-5 rounded-3xl bg-obsidian-card border border-obsidian-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-pink-neon" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Winter Arc Cadence
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-pink-neon">
            {completedCount}/7 Days Done
          </span>
        </div>

        {/* 7-Day Mini Dots */}
        <div className="grid grid-cols-7 gap-1 pt-1">
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((dayKey) => {
            const isCompleted = completedDays?.includes(dayKey);
            const isCurrent = activeDay.startsWith(dayKey);

            return (
              <button
                key={dayKey}
                onClick={() => selectDay(dayKey)}
                className={`py-2 rounded-lg text-center border transition-all text-[10px] font-mono font-bold ${
                  isCurrent
                    ? 'border-pink-neon text-pink-neon bg-pink-subtle ring-1 ring-pink-neon/40 shadow-glow-pink-sm'
                    : isCompleted
                    ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                    : 'border-obsidian-border text-zinc-dim hover:text-white bg-obsidian-elevated'
                }`}
              >
                {dayKey}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => openGymTools('1rm')}
          className="w-full mt-2 py-2 rounded-xl bg-obsidian-elevated hover:bg-obsidian-cardHover border border-obsidian-border hover:border-pink-border text-xs font-semibold text-zinc-subtext hover:text-white flex items-center justify-center space-x-2 transition-all"
        >
          <Calculator className="w-3.5 h-3.5 text-pink-neon" />
          <span>Launch 1RM & Plate Math</span>
        </button>
      </div>

      {/* 4. Creator Callout Card */}
      <div
        onClick={() => setCurrentView('coach')}
        className="p-4 rounded-3xl bg-obsidian-card border border-pink-border/50 hover:border-pink-neon cursor-pointer transition-all group"
      >
        <div className="flex items-center space-x-3">
          <img
            src={authorConfig.profileImageUrl}
            alt={authorConfig.name}
            className="w-12 h-12 rounded-xl object-cover border border-pink-border group-hover:scale-105 transition-all"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono uppercase text-pink-rose font-bold">
              GUIDE CREATOR
            </span>
            <h5 className="text-xs font-bold text-white truncate">{authorConfig.name}</h5>
            <p className="text-[11px] text-zinc-dim truncate">
              "{authorConfig.quote.slice(0, 42)}..."
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-dim group-hover:text-pink-neon group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </aside>
  );
};
