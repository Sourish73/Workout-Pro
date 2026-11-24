import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Dumbbell, Calculator, Award, Share2, Check } from 'lucide-react';

export const BottomNav = ({ currentView, setCurrentView }) => {
  const { openGymTools, copyGuideLink, copyFeedback } = useWorkout();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-obsidian-card/95 backdrop-blur-xl border-t border-pink-border/40 pb-safe">
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto items-center px-1">
        {/* Tab 1: Routine */}
        <button
          onClick={() => setCurrentView('workout')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all rounded-xl ${
            currentView === 'workout' ? 'text-pink-neon font-bold' : 'text-zinc-dim hover:text-zinc-subtext'
          }`}
        >
          <div className="relative">
            <Dumbbell className={`w-5 h-5 ${currentView === 'workout' ? 'text-pink-neon stroke-[2.5]' : ''}`} />
            {currentView === 'workout' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-neon rounded-full shadow-glow-pink-sm" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Routine</span>
        </button>

        {/* Tab 2: Tools */}
        <button
          onClick={() => openGymTools('1rm')}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-zinc-dim hover:text-zinc-subtext transition-all rounded-xl"
        >
          <Calculator className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-1">1RM Tools</span>
        </button>

        {/* Tab 3: Coach Akshita */}
        <button
          onClick={() => setCurrentView('coach')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all rounded-xl ${
            currentView === 'coach' ? 'text-pink-neon font-bold' : 'text-zinc-dim hover:text-zinc-subtext'
          }`}
        >
          <div className="relative">
            <Award className={`w-5 h-5 ${currentView === 'coach' ? 'text-pink-neon stroke-[2.5]' : ''}`} />
            {currentView === 'coach' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-neon rounded-full shadow-glow-pink-sm" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Akshita</span>
        </button>

        {/* Tab 4: Share Link */}
        <button
          onClick={copyGuideLink}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 text-zinc-dim hover:text-pink-rose transition-all rounded-xl"
        >
          {copyFeedback ? (
            <Check className="w-5 h-5 text-emerald-400" />
          ) : (
            <Share2 className="w-5 h-5" />
          )}
          <span className="text-[10px] tracking-tight mt-1">
            {copyFeedback ? 'Copied!' : 'Share'}
          </span>
        </button>
      </div>
    </nav>
  );
};
