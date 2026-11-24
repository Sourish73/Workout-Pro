import React, { useState, useEffect } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Check, Plus, Trophy } from 'lucide-react';

export const SetLogger = ({ exercise, dayName }) => {
  const {
    dayLogs,
    exerciseBests,
    logExerciseSets,
    startRestTimer,
    trainingLevel,
  } = useWorkout();

  // Load existing logged sets for this exercise if present
  const existingLog = dayLogs[exercise.id];
  const totalDefaultSets = trainingLevel === 'advance' ? (exercise.sets || 3) + 1 : (exercise.sets || 3);

  const [setsData, setSetsData] = useState(() => {
    if (existingLog && Array.isArray(existingLog.sets) && existingLog.sets.length > 0) {
      return existingLog.sets;
    }
    return Array.from({ length: totalDefaultSets }, (_, i) => ({
      setNumber: i + 1,
      weightKg: '',
      reps: '',
      completed: false,
    }));
  });

  useEffect(() => {
    if (existingLog && Array.isArray(existingLog.sets) && existingLog.sets.length > 0) {
      setSetsData(existingLog.sets);
    }
  }, [existingLog]);

  const bestRecord = exerciseBests[exercise.id];

  const handleInputChange = (index, field, value) => {
    const updated = [...setsData];
    updated[index][field] = value;
    setSetsData(updated);
  };

  const toggleSetComplete = (index) => {
    const updated = [...setsData];
    const isNowCompleted = !updated[index].completed;
    updated[index].completed = isNowCompleted;

    setSetsData(updated);
    logExerciseSets(dayName, exercise.id, exercise.name, updated);

    if (isNowCompleted) {
      startRestTimer(90);
    }
  };

  const handleAddSet = () => {
    const updated = [
      ...setsData,
      {
        setNumber: setsData.length + 1,
        weightKg: setsData.length > 0 ? setsData[setsData.length - 1].weightKg : '',
        reps: setsData.length > 0 ? setsData[setsData.length - 1].reps : '',
        completed: false,
      },
    ];
    setSetsData(updated);
    logExerciseSets(dayName, exercise.id, exercise.name, updated);
  };

  return (
    <div className="mt-3 pt-3 border-t border-obsidian-border/80">
      {/* PR / Last Session Best */}
      <div className="flex items-center justify-between text-xs mb-2.5">
        <div className="flex items-center space-x-1.5 text-zinc-dim">
          <Trophy className="w-3.5 h-3.5 text-pink-rose" />
          <span className="font-mono uppercase text-[11px]">Last Session's Best:</span>
        </div>
        {bestRecord ? (
          <span className="font-mono font-bold text-pink-neon text-xs">
            {bestRecord.weightKg} kg × {bestRecord.reps} reps
          </span>
        ) : (
          <span className="text-[11px] text-zinc-dim font-mono">
            Log weight & check off sets below
          </span>
        )}
      </div>

      {/* Set Input Rows */}
      <div className="space-y-2">
        {setsData.map((item, index) => {
          const isDone = item.completed;

          return (
            <div
              key={item.setNumber || index}
              className={`flex items-center space-x-2 sm:space-x-3 p-1.5 rounded-xl border transition-all ${
                isDone
                  ? 'bg-pink-subtle border-pink-border'
                  : 'bg-obsidian-elevated/70 border-obsidian-border hover:border-pink-border/40'
              }`}
            >
              {/* Set Number Badge */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                  isDone
                    ? 'bg-pink-neon text-black shadow-glow-pink-sm'
                    : 'bg-obsidian-card text-zinc-dim border border-obsidian-border'
                }`}
              >
                #{index + 1}
              </div>

              {/* Weight Input */}
              <div className="flex-1 relative">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="KG"
                  value={item.weightKg}
                  onChange={(e) => handleInputChange(index, 'weightKg', e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg text-sm font-mono font-bold focus:outline-none transition-colors min-h-[44px] ${
                    isDone
                      ? 'bg-obsidian-card text-pink-neon border border-pink-border'
                      : 'bg-obsidian-card text-white border border-obsidian-border focus:border-pink-neon'
                  }`}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-dim font-mono pointer-events-none">
                  KG
                </span>
              </div>

              {/* Reps Input */}
              <div className="flex-1 relative">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Reps"
                  value={item.reps}
                  onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg text-sm font-mono font-bold focus:outline-none transition-colors min-h-[44px] ${
                    isDone
                      ? 'bg-obsidian-card text-pink-neon border border-pink-border'
                      : 'bg-obsidian-card text-white border border-obsidian-border focus:border-pink-neon'
                  }`}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-dim font-mono pointer-events-none">
                  REPS
                </span>
              </div>

              {/* Large Sweat-Friendly Completion Tap Target (min-h-[48px]) */}
              <button
                type="button"
                onClick={() => toggleSetComplete(index)}
                className={`min-h-[48px] w-12 sm:w-14 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
                  isDone
                    ? 'bg-pink-neon text-black shadow-glow-pink-sm font-black'
                    : 'bg-obsidian-card border border-obsidian-border text-zinc-dim hover:text-white hover:border-pink-border'
                }`}
                title={isDone ? 'Mark Incomplete' : 'Complete Set & Auto-Start Rest'}
              >
                <Check className={`w-5 h-5 ${isDone ? 'stroke-[3]' : 'stroke-[1.5]'}`} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Set Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleAddSet}
          className="flex items-center space-x-1 text-[11px] font-mono text-zinc-subtext hover:text-pink-neon py-1 px-2 rounded-lg hover:bg-obsidian-elevated transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Working Set</span>
        </button>

        <span className="text-[10px] text-zinc-dim font-mono">
          Auto-rest starts on completion
        </span>
      </div>
    </div>
  );
};
