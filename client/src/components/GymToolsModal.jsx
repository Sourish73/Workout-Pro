import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import {
  X,
  Calculator,
  Disc,
  Utensils,
  Dumbbell,
} from 'lucide-react';

export const GymToolsModal = () => {
  const { isGymToolsOpen, closeGymTools, gymToolsActiveTab } = useWorkout();
  const [activeTab, setActiveTab] = useState(gymToolsActiveTab || '1rm');

  // 1RM State
  const [oneRmWeight, setOneRmWeight] = useState(80);
  const [oneRmReps, setOneRmReps] = useState(8);

  // Plate Calculator State
  const [targetBarbellWeight, setTargetBarbellWeight] = useState(100);
  const [barWeight, setBarWeight] = useState(20);

  // Protein / Macro Calculator State
  const [bodyWeightKg, setBodyWeightKg] = useState(75);
  const [dietGoal, setDietGoal] = useState('Hypertrophy');

  if (!isGymToolsOpen) return null;

  // 1RM Calculation via Epley Formula: 1RM = Weight * (1 + Reps / 30)
  const calculateOneRepMax = () => {
    const w = Number(oneRmWeight) || 0;
    const r = Number(oneRmReps) || 1;
    if (r <= 1) return w;
    return Math.round(w * (1 + r / 30));
  };

  const estimated1RM = calculateOneRepMax();

  const PERCENTAGES = [
    { pct: 95, reps: '2 Reps' },
    { pct: 90, reps: '3–4 Reps' },
    { pct: 85, reps: '5–6 Reps' },
    { pct: 80, reps: '7–8 Reps' },
    { pct: 75, reps: '9–10 Reps' },
    { pct: 70, reps: '11–12 Reps' },
  ];

  // Plate Calculator
  const calculatePlates = () => {
    const target = Number(targetBarbellWeight) || 20;
    const bar = Number(barWeight) || 20;
    const weightToDistribute = Math.max(0, target - bar);
    const perSide = weightToDistribute / 2;

    const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
    const platesUsed = [];
    let remainder = perSide;

    for (const plate of availablePlates) {
      const count = Math.floor(remainder / plate);
      if (count > 0) {
        platesUsed.push({ plate, count });
        remainder = Math.round((remainder - count * plate) * 100) / 100;
      }
    }

    return { perSide, platesUsed, remainder };
  };

  const { perSide, platesUsed } = calculatePlates();

  // Protein & Calorie Calculator
  const calculateMacros = () => {
    const bw = Number(bodyWeightKg) || 70;
    let proteinFactor = 2.0;
    let calorieMultiplier = 33;

    if (dietGoal === 'Hypertrophy') {
      proteinFactor = 2.2;
      calorieMultiplier = 35;
    } else if (dietGoal === 'Fat Loss') {
      proteinFactor = 2.4;
      calorieMultiplier = 28;
    } else {
      proteinFactor = 2.0;
      calorieMultiplier = 32;
    }

    const dailyProtein = Math.round(bw * proteinFactor);
    const dailyCalories = Math.round(bw * calorieMultiplier);
    const fatCalories = dailyCalories * 0.25;
    const dailyFat = Math.round(fatCalories / 9);
    const carbCalories = dailyCalories - dailyProtein * 4 - fatCalories;
    const dailyCarbs = Math.round(Math.max(0, carbCalories / 4));

    return { dailyProtein, dailyCalories, dailyFat, dailyCarbs };
  };

  const { dailyProtein, dailyCalories, dailyFat, dailyCarbs } = calculateMacros();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-obsidian-card border border-pink-border rounded-3xl shadow-glow-pink overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-obsidian-border bg-obsidian-elevated/40">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-pink-neon" />
            <h3 className="font-extrabold text-base text-white">Winter Arc Calculators</h3>
          </div>
          <button
            onClick={closeGymTools}
            className="w-9 h-9 rounded-xl bg-obsidian-card hover:bg-obsidian-border text-zinc-dim hover:text-white flex items-center justify-center transition-colors border border-obsidian-border"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="p-3 border-b border-obsidian-border bg-obsidian-bg">
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-obsidian-elevated border border-obsidian-border">
            <button
              onClick={() => setActiveTab('1rm')}
              className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === '1rm'
                  ? 'bg-pink-neon text-black shadow-glow-pink-sm'
                  : 'text-zinc-subtext hover:text-white'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>1RM Max</span>
            </button>

            <button
              onClick={() => setActiveTab('plates')}
              className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === 'plates'
                  ? 'bg-pink-neon text-black shadow-glow-pink-sm'
                  : 'text-zinc-subtext hover:text-white'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
              <span>Plate Math</span>
            </button>

            <button
              onClick={() => setActiveTab('macros')}
              className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === 'macros'
                  ? 'bg-pink-neon text-black shadow-glow-pink-sm'
                  : 'text-zinc-subtext hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Protein Target</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-5 space-y-5">
          {/* 1RM CALCULATOR */}
          {activeTab === '1rm' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-dim uppercase mb-1">
                    Lifted Weight (KG)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={oneRmWeight}
                    onChange={(e) => setOneRmWeight(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border text-white text-lg font-mono font-bold focus:border-pink-neon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-dim uppercase mb-1">
                    Completed Reps
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={oneRmReps}
                    onChange={(e) => setOneRmReps(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border text-white text-lg font-mono font-bold focus:border-pink-neon focus:outline-none"
                  />
                </div>
              </div>

              {/* Estimated 1RM Highlight */}
              <div className="p-4 rounded-2xl bg-pink-subtle border border-pink-border text-center shadow-glow-pink-sm">
                <span className="text-[11px] font-mono uppercase tracking-wider text-pink-neon font-bold">
                  Estimated One-Rep Max (Epley)
                </span>
                <div className="text-4xl font-black text-white font-mono mt-1">
                  {estimated1RM} <span className="text-xl text-pink-neon">KG</span>
                </div>
                <p className="text-[11px] text-zinc-subtext mt-1">
                  Theoretical 100% capacity based on {oneRmWeight}kg × {oneRmReps} reps
                </p>
              </div>

              {/* Percentage breakdown */}
              <div>
                <h5 className="text-xs font-mono font-bold uppercase text-zinc-dim mb-2">
                  Training Percentage Breakdown
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PERCENTAGES.map((p) => {
                    const load = Math.round(estimated1RM * (p.pct / 100));
                    return (
                      <div
                        key={p.pct}
                        className="p-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border text-center"
                      >
                        <div className="flex items-center justify-between text-[11px] text-zinc-dim font-mono">
                          <span>{p.pct}%</span>
                          <span>{p.reps}</span>
                        </div>
                        <div className="text-base font-extrabold text-white font-mono mt-0.5">
                          {load} kg
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* BARBELL PLATE CALCULATOR */}
          {activeTab === 'plates' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-dim uppercase mb-1">
                    Target Total Weight (KG)
                  </label>
                  <input
                    type="number"
                    step="2.5"
                    min="20"
                    max="450"
                    value={targetBarbellWeight}
                    onChange={(e) => setTargetBarbellWeight(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border text-white text-lg font-mono font-bold focus:border-pink-neon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-dim uppercase mb-1">
                    Olympic Barbell Weight
                  </label>
                  <select
                    value={barWeight}
                    onChange={(e) => setBarWeight(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border text-white text-sm font-semibold focus:border-pink-neon focus:outline-none"
                  >
                    <option value={20}>20 kg (Men's Olympic Bar)</option>
                    <option value={15}>15 kg (Women's Olympic Bar)</option>
                    <option value={10}>10 kg (Technique / EZ Bar)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-elevated border border-obsidian-border text-center">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-dim">
                  Load on Each Side
                </span>
                <div className="text-3xl font-black text-white font-mono mt-1">
                  {perSide} <span className="text-lg text-pink-neon">KG / SIDE</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-mono font-bold uppercase text-zinc-dim mb-2">
                  Plates to Slide onto Each Collar
                </h5>
                {platesUsed.length === 0 ? (
                  <p className="text-xs text-zinc-dim text-center py-3">
                    Bar only. No additional plates required.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {platesUsed.map((item) => (
                      <div
                        key={item.plate}
                        className="p-3 rounded-xl bg-obsidian-elevated border border-pink-border text-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-pink-subtle border border-pink-neon text-pink-neon font-mono font-bold text-xs flex items-center justify-center mx-auto mb-1">
                          {item.plate}
                        </div>
                        <div className="text-xs font-bold text-white">
                          {item.count} × {item.plate} kg
                        </div>
                        <span className="text-[10px] text-zinc-dim">Per side</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PROTEIN & MACROS */}
          {activeTab === 'macros' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-dim uppercase mb-1">
                    Body Weight (KG)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="200"
                    value={bodyWeightKg}
                    onChange={(e) => setBodyWeightKg(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border text-white text-lg font-mono font-bold focus:border-pink-neon focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-dim uppercase mb-1">
                    Primary Goal
                  </label>
                  <select
                    value={dietGoal}
                    onChange={(e) => setDietGoal(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border text-white text-sm font-semibold focus:border-pink-neon focus:outline-none"
                  >
                    <option value="Hypertrophy">Winter Arc Hypertrophy (+Surplus)</option>
                    <option value="Fat Loss">Body Recomposition & Leanness</option>
                    <option value="Strength">Strength Foundation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-pink-subtle border border-pink-border text-center shadow-glow-pink-sm">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-pink-neon font-bold">
                    Daily Protein Target
                  </span>
                  <div className="text-3xl font-black text-white font-mono mt-1">
                    {dailyProtein} <span className="text-lg text-pink-neon">G</span>
                  </div>
                  <span className="text-[10px] text-zinc-subtext">
                    ~{(dailyProtein / bodyWeightKg).toFixed(1)}g per kg bodyweight
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-obsidian-elevated border border-obsidian-border text-center">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-dim">
                    Estimated Daily Calories
                  </span>
                  <div className="text-3xl font-black text-white font-mono mt-1">
                    {dailyCalories} <span className="text-lg text-zinc-subtext">KCAL</span>
                  </div>
                  <span className="text-[10px] text-zinc-dim">Target Energy Intake</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
