import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { authorConfig } from '../config/authorConfig';
import {
  Flame,
  Calculator,
  Award,
  Sparkles,
  Dumbbell,
  Copy,
  Check,
  Share2,
} from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView }) => {
  const { openGymTools, streak, copyGuideLink, copyFeedback } = useWorkout();

  return (
    <header className="sticky top-0 z-40 w-full bg-obsidian-bg/90 backdrop-blur-md border-b border-obsidian-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Creator Brand Logo & Name (Matches Akshita sahu pill in screenshot) */}
        <div
          onClick={() => setCurrentView('workout')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-obsidian-card border border-pink-border flex items-center justify-center text-pink-neon group-hover:border-pink-neon group-hover:shadow-glow-pink-sm transition-all duration-300">
            <Dumbbell className="w-5 h-5 text-pink-neon transition-transform group-hover:scale-110" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                {authorConfig.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-pink-subtle border border-pink-border text-pink-rose font-bold">
                WORKOUT PLAN
              </span>
            </div>
            <p className="text-[10px] text-zinc-dim font-mono tracking-widest uppercase hidden sm:block">
              12 Weeks Workout Plan • 3 Levels
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => setCurrentView('workout')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              currentView === 'workout'
                ? 'text-pink-neon bg-pink-subtle border border-pink-border'
                : 'text-zinc-subtext hover:text-white hover:bg-obsidian-card'
            }`}
          >
            Workout Routine
          </button>

          <button
            onClick={() => openGymTools('1rm')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold text-zinc-subtext hover:text-white hover:bg-obsidian-card transition-all"
          >
            <Calculator className="w-4 h-4 text-zinc-dim" />
            <span>1RM & Tools</span>
          </button>

          <button
            onClick={() => setCurrentView('coach')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              currentView === 'coach'
                ? 'text-pink-neon bg-pink-subtle border border-pink-border'
                : 'text-zinc-subtext hover:text-white hover:bg-obsidian-card'
            }`}
          >
            <Award className="w-4 h-4 text-pink-rose" />
            <span>Meet Akshita</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2.5">
          {/* Streak Counter */}
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-obsidian-card border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
            <span>{streak || 0}D STREAK</span>
          </div>

          {/* Share / Copy Link Button */}
          <button
            onClick={copyGuideLink}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-obsidian-card hover:bg-obsidian-cardHover border border-pink-border text-xs font-semibold text-white transition-all shadow-glow-pink-sm active:scale-95"
            title="Copy Winter Arc Guide Link"
          >
            {copyFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-pink-neon" />
                <span className="hidden sm:inline">Share Guide</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
