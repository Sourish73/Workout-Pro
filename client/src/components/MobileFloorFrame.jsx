import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  Heart,
  Flame,
  Dumbbell,
  Crown,
  Download,
  Printer,
  Play,
  Check,
  Timer,
  ChevronRight,
} from 'lucide-react';
import { WORKOUT_SPLIT_DATA } from '../data/workoutData';

export const MobileFloorFrame = ({
  user,
  hasPaid,
  onOpenAuth,
  onLaunchPayment,
  onOpenWatchForm,
  onDownloadPdf,
}) => {
  const [selectedDayId, setSelectedDayId] = useState('MON');
  const [loggedSets, setLoggedSets] = useState({});
  const [exerciseWeights, setExerciseWeights] = useState({});

  const activeDay =
    WORKOUT_SPLIT_DATA.find((d) => d.id === selectedDayId) ||
    WORKOUT_SPLIT_DATA[0];

  const isDayLocked = activeDay.isPro && !hasPaid;

  const toggleSetComplete = (setKey) => {
    setLoggedSets((prev) => ({
      ...prev,
      [setKey]: !prev[setKey],
    }));
  };

  const handleWeightChange = (exId, val) => {
    setExerciseWeights((prev) => ({
      ...prev,
      [exId]: val,
    }));
  };

  return (
    <div className="w-[390px] max-w-full rounded-[44px] bg-[#0A0A0D] border-4 border-stone-800 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden text-white font-sans flex flex-col relative select-none">
      {/* Mobile Screen Top Speaker & Dynamic Island */}
      <div className="pt-3 pb-2 px-6 flex items-center justify-between bg-black/60 border-b border-white/5">
        <span className="text-[11px] font-mono font-bold text-zinc-400">9:41</span>
        <div className="w-20 h-4 rounded-full bg-stone-900 border border-white/10" />
        <div className="flex items-center space-x-1.5 text-zinc-400 text-[10px]">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      {/* Mobile Scrollable Container */}
      <div className="overflow-y-auto max-h-[780px] p-4 space-y-4 pb-28 no-scrollbar">
        {/* Compact Creator Header */}
        <div className="flex items-center justify-between glass-panel p-3 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-900 border border-[#CCFF00]/40 shrink-0">
              <img
                src="/cover.png"
                alt="Akshita Sahu"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-black text-white">
                  Akshita Sahu
                </span>
                <span className="w-3 h-3 rounded-full bg-[#CCFF00] text-black flex items-center justify-center text-[8px] font-black">
                  ✓
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#CCFF00]">
                @akshitaoffside_
              </span>
            </div>
          </div>

          <button
            onClick={onOpenAuth}
            className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-zinc-200"
          >
            {user ? 'Account' : 'Sign In'}
          </button>
        </div>

        {/* Hero Compact Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-950 border border-white/10 aspect-[16/10]">
          <img
            src="/cover.png"
            alt="My Weekly Gym Split"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          
          <div className="absolute bottom-3 left-3 right-3 space-y-1">
            <span className="px-2 py-0.5 rounded-full bg-[#CCFF00] text-black text-[9px] font-black font-mono uppercase">
              BUILD WITH ME
            </span>
            <h2 className="text-lg font-black text-white leading-tight">
              My Weekly Gym Split
            </h2>
            <p className="text-[11px] text-[#CCFF00] font-semibold">
              Personal Training Protocol
            </p>
          </div>
        </div>

        {/* Horizontal Swipeable 7-Day Pill Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 px-1 font-bold">
            <span>CHOOSE TRAINING DAY</span>
            <span className="text-[#CCFF00]">{activeDay.title}</span>
          </div>

          <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pb-1">
            {WORKOUT_SPLIT_DATA.map((day) => {
              const isSelected = selectedDayId === day.id;
              const isLocked = day.isPro && !hasPaid;

              return (
                <button
                  key={day.id}
                  onClick={() => setSelectedDayId(day.id)}
                  className={`px-3 py-2 rounded-xl flex-shrink-0 flex items-center space-x-1.5 text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? 'bg-[#CCFF00] text-black shadow-volt-glow-sm font-black'
                      : isLocked
                      ? 'bg-white/[0.03] text-zinc-400 border border-white/5'
                      : 'bg-white/[0.06] text-white border border-white/10'
                  }`}
                >
                  <span>{day.id}</span>
                  {isLocked && <Lock className="w-2.5 h-2.5 text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* WORKOUT LIST OR LOCKED STATE */}
        {isDayLocked ? (
          <div className="glass-panel-elevated rounded-2xl p-5 border border-amber-500/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-black">
                PRO SPLIT LOCKED
              </span>
              <h3 className="text-base font-black text-white mt-0.5">
                {activeDay.dayName} • {activeDay.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Unlock all 7 training days for ₹49 to access this workout.
              </p>
            </div>
            <button
              onClick={onLaunchPayment}
              className="w-full py-3 rounded-xl btn-volt text-xs font-black shadow-volt-glow"
            >
              Unlock Now — ₹49
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Day Title & Focus */}
            <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#CCFF00] font-black uppercase">
                  {activeDay.dayName} ROUTINE
                </span>
                <h4 className="text-sm font-extrabold text-white">
                  {activeDay.title}
                </h4>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {activeDay.duration}
              </span>
            </div>

            {/* Warm-Up (if any) */}
            {activeDay.warmup.length > 0 && (
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase flex items-center space-x-1">
                  <Flame className="w-3 h-3" />
                  <span>Warm-Up Primer:</span>
                </span>
                <div className="text-xs text-zinc-300 font-semibold space-y-1">
                  {activeDay.warmup.map((w, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>• {w.name}</span>
                      <span className="font-mono text-[#CCFF00]">{w.target}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stacked Exercise Cards with 48px Tap Targets */}
            <div className="space-y-2.5">
              {activeDay.exercises.map((ex, idx) => {
                const setKey = `mob-${activeDay.id}-${ex.id}`;
                const isCompleted = Boolean(loggedSets[setKey]);
                const weightVal = exerciseWeights[ex.id] ?? ex.defaultWeight;

                return (
                  <div
                    key={ex.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCompleted
                        ? 'bg-emerald-950/25 border-emerald-500/40'
                        : 'glass-panel border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                            isCompleted
                              ? 'bg-emerald-500 text-black'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <h5
                              className={`text-sm font-bold ${
                                isCompleted ? 'line-through text-zinc-400' : 'text-white'
                              }`}
                            >
                              {ex.name}
                            </h5>
                            <button
                              onClick={() => onOpenWatchForm(ex.name)}
                              className="text-[9px] font-mono text-[#CCFF00] underline"
                            >
                              Form
                            </button>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#CCFF00]">
                            {ex.sets} Sets × {ex.reps}
                          </span>
                        </div>
                      </div>

                      {/* 48px Sweat-Friendly Tap Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleSetComplete(setKey)}
                        className={`min-h-[48px] min-w-[48px] rounded-xl flex items-center justify-center border transition-all active:scale-95 ${
                          isCompleted
                            ? 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-volt-glow-sm'
                            : 'bg-white/5 border-white/20 text-zinc-500'
                        }`}
                        title="Complete set"
                      >
                        <Check
                          className={`w-6 h-6 stroke-[3] ${
                            isCompleted ? 'text-black' : 'text-zinc-500'
                          }`}
                        />
                      </button>
                    </div>

                    {ex.cue && (
                      <p className="text-[11px] text-zinc-400 mt-1.5 pt-1.5 border-t border-white/5">
                        {ex.cue}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Rest Timer Indicator (01:30) */}
      <div className="absolute bottom-20 left-4 right-4 z-20">
        <div className="glass-panel-elevated py-2 px-3 rounded-full border border-[#CCFF00]/40 flex items-center justify-between text-xs shadow-xl">
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4 text-[#CCFF00] animate-pulse" />
            <span className="font-mono font-black text-white">01:30</span>
            <span className="text-[10px] text-zinc-400 font-mono">REST</span>
          </div>
          <span className="text-[10px] font-bold text-[#CCFF00]">Active</span>
        </div>
      </div>

      {/* Sticky Frosted-Glass Bottom CTA Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/80 backdrop-blur-xl border-t border-white/10 z-30">
        <button
          onClick={onLaunchPayment}
          className="w-full py-3.5 rounded-2xl btn-volt text-xs font-black flex items-center justify-center space-x-2 shadow-volt-glow active:scale-98"
        >
          <span>{hasPaid ? 'Access Granted • Open Guide' : 'Sign In to Unlock Full Split — ₹49'}</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
