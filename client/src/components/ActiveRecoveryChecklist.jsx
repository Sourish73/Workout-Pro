import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import {
  Footprints,
  Droplets,
  CheckCircle2,
  Circle,
  Plus,
  Minus,
} from 'lucide-react';

export const ActiveRecoveryChecklist = ({ checklist = [] }) => {
  const { triggerConfetti } = useWorkout();

  const [completedItems, setCompletedItems] = useState({});
  const [waterLiters, setWaterLiters] = useState(2.0);
  const [stepCount, setStepCount] = useState(8500);

  const toggleItem = (id) => {
    setCompletedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const totalCompleted = Object.values(next).filter(Boolean).length;
      if (totalCompleted === 4) {
        triggerConfetti();
      }
      return next;
    });
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const totalTasks = checklist.length || 4;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="space-y-4">
      {/* Recovery Readiness Meter */}
      <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-card border border-pink-border/50 shadow-glow-pink-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-pink-rose font-bold">
              Winter Arc Recovery Score
            </span>
            <h3 className="text-xl font-extrabold text-white">Active Tissue Restoration</h3>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black font-mono text-pink-neon">{progressPercent}%</span>
            <span className="text-[10px] text-zinc-dim block font-mono">
              {completedCount}/{totalTasks} Completed
            </span>
          </div>
        </div>

        <div className="w-full bg-obsidian-elevated h-2 rounded-full overflow-hidden border border-obsidian-border">
          <div
            className="bg-pink-neon h-full transition-all duration-500 rounded-full shadow-glow-pink-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive Hydration Counter */}
      <div className="p-4 rounded-2xl bg-obsidian-card border border-obsidian-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pink-subtle border border-pink-border flex items-center justify-center text-pink-neon">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Daily Hydration Log</h4>
            <p className="text-xs text-zinc-subtext">Target: 3.5 Liters mineralized water</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setWaterLiters((prev) => Math.max(0, Math.round((prev - 0.25) * 100) / 100))}
            className="w-8 h-8 rounded-lg bg-obsidian-elevated hover:bg-obsidian-border text-zinc-subtext hover:text-white flex items-center justify-center transition-colors border border-obsidian-border"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-mono font-bold text-sm text-white px-2">
            {waterLiters.toFixed(2)}L
          </span>
          <button
            onClick={() => setWaterLiters((prev) => Math.round((prev + 0.25) * 100) / 100)}
            className="w-8 h-8 rounded-lg bg-obsidian-elevated hover:bg-obsidian-border text-zinc-subtext hover:text-white flex items-center justify-center transition-colors border border-obsidian-border"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Step Counter */}
      <div className="p-4 rounded-2xl bg-obsidian-card border border-obsidian-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pink-subtle border border-pink-border flex items-center justify-center text-pink-neon">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Step Cadence Log</h4>
            <p className="text-xs text-zinc-subtext">Target: 8,000–10,000 daily steps</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setStepCount((prev) => Math.max(0, prev - 500))}
            className="w-8 h-8 rounded-lg bg-obsidian-elevated hover:bg-obsidian-border text-zinc-subtext hover:text-white flex items-center justify-center transition-colors border border-obsidian-border"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-mono font-bold text-sm text-white px-2">
            {stepCount.toLocaleString()}
          </span>
          <button
            onClick={() => setStepCount((prev) => prev + 500)}
            className="w-8 h-8 rounded-lg bg-obsidian-elevated hover:bg-obsidian-border text-zinc-subtext hover:text-white flex items-center justify-center transition-colors border border-obsidian-border"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2.5">
        {checklist.map((item) => {
          const isDone = Boolean(completedItems[item.id]);

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 select-none ${
                isDone
                  ? 'bg-pink-subtle border-pink-border'
                  : 'bg-obsidian-card border-obsidian-border hover:border-pink-border/40'
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-pink-neon fill-pink-neon/20" />
                ) : (
                  <Circle className="w-5 h-5 text-zinc-dim" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-bold ${isDone ? 'text-pink-neon' : 'text-white'}`}>
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-elevated text-zinc-subtext border border-obsidian-border">
                    {item.target}
                  </span>
                </div>
                <p className="text-xs text-zinc-subtext mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
