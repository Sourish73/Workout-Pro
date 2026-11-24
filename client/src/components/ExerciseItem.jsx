import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { SetLogger } from './SetLogger';
import { PlayCircle, Info } from 'lucide-react';

export const ExerciseItem = ({ exercise, index, dayName }) => {
  const { openFormGuide } = useWorkout();

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-card border border-obsidian-border hover:border-pink-border/50 transition-all">
      {/* Exercise Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-xl bg-obsidian-elevated border border-pink-border/60 flex items-center justify-center font-mono font-bold text-xs text-pink-neon flex-shrink-0 mt-0.5">
            {index + 1}
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {exercise.name}
              </h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-pink-subtle text-pink-rose border border-pink-border/40 font-medium">
                {exercise.category}
              </span>
            </div>

            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-mono font-semibold text-pink-neon">
                {exercise.sets} Sets × {exercise.reps}
              </span>
            </div>
          </div>
        </div>

        {/* Watch Form Guide CTA */}
        <button
          onClick={() => openFormGuide(exercise)}
          className="self-start sm:self-center flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-obsidian-elevated hover:bg-obsidian-cardHover border border-obsidian-border hover:border-pink-border text-xs font-semibold text-zinc-subtext hover:text-white transition-all group"
        >
          <PlayCircle className="w-4 h-4 text-pink-hot group-hover:scale-110 transition-transform" />
          <span>Watch Form</span>
        </button>
      </div>

      {/* Coach Execution Cue */}
      {exercise.notes && (
        <div className="mt-2.5 p-2.5 rounded-xl bg-obsidian-elevated/40 border border-obsidian-border/60 flex items-start space-x-2 text-xs text-zinc-subtext">
          <Info className="w-3.5 h-3.5 text-pink-rose/70 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">{exercise.notes}</p>
        </div>
      )}

      {/* Set Logger Component */}
      <SetLogger exercise={exercise} dayName={dayName} />
    </div>
  );
};
