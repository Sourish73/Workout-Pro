import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { WinterArcHero } from '../components/WinterArcHero';
import { DaySelector } from '../components/DaySelector';
import { ExerciseItem } from '../components/ExerciseItem';
import { ActiveRecoveryChecklist } from '../components/ActiveRecoveryChecklist';
import { SundayAnalytics } from '../components/SundayAnalytics';
import { DesktopBentoSidebar } from '../components/DesktopBentoSidebar';
import {
  Flame,
  Clock,
  CheckCircle2,
  Dumbbell,
  Layers,
  Activity,
  Award,
} from 'lucide-react';

export const WorkoutPage = ({ setCurrentView }) => {
  const {
    activeDay,
    activeWorkout,
    isLoadingWorkout,
    markDayComplete,
    completedDays,
    trainingLevel,
  } = useWorkout();

  const isCompleted = completedDays?.includes(activeDay);

  return (
    <div className="min-h-screen bg-obsidian-bg">
      {/* 7-Day Horizontal Swipeable Selector */}
      <DaySelector />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Flagship Winter Arc Hero Card (Matches SuperProfile Screenshot with Pinkish Texture!) */}
        <WinterArcHero />

        {/* Dual Layout: 65% Routine Area + 35% Live Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Workout Area */}
          <section className="lg:col-span-8 space-y-6">
            {isLoadingWorkout ? (
              <div className="p-12 rounded-3xl bg-obsidian-card border border-obsidian-border text-center space-y-3">
                <div className="w-8 h-8 border-2 border-pink-neon border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-zinc-dim font-mono">
                  Loading {activeDay} Winter Arc routine...
                </p>
              </div>
            ) : !activeWorkout ? (
              <div className="p-10 rounded-3xl bg-obsidian-card border border-obsidian-border text-center">
                <p className="text-zinc-subtext">Workout data not found for {activeDay}.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Active Day Header Card */}
                <div className="p-6 rounded-3xl bg-obsidian-card border border-pink-border/50 shadow-glow-pink-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-pink-subtle text-pink-neon font-bold border border-pink-border">
                          {activeWorkout.day}
                        </span>
                        <span className="text-xs text-zinc-dim font-mono">
                          Day {activeWorkout.dayNumber} of 7 • Level: <strong className="text-white uppercase">{trainingLevel}</strong>
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                        {activeWorkout.title}
                      </h2>
                      <p className="text-sm text-zinc-subtext mt-0.5">
                        {activeWorkout.subtitle}
                      </p>
                    </div>

                    {/* Completion Action */}
                    <div className="flex items-center space-x-2">
                      {isCompleted ? (
                        <div className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>COMPLETED</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => markDayComplete(activeDay)}
                          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-pink-subtle hover:bg-pink-neon hover:text-black text-pink-neon border border-pink-border text-xs font-bold transition-all active:scale-95 shadow-glow-pink-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mark Day Complete</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Target Muscle Badges & Metrics */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-obsidian-border/80">
                    {activeWorkout.targetMuscles?.map((muscle) => (
                      <span
                        key={muscle}
                        className="px-2.5 py-1 rounded-lg bg-obsidian-elevated border border-obsidian-border text-xs text-zinc-subtext font-medium"
                      >
                        {muscle}
                      </span>
                    ))}
                    <div className="ml-auto flex items-center space-x-3 text-xs text-zinc-dim font-mono">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-pink-rose" />
                        <span>{activeWorkout.estimatedDuration || '50–60m'}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Activity className="w-3.5 h-3.5 text-pink-rose" />
                        <span>{activeWorkout.intensity || 'High'} Intensity</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Day 5: Friday Recovery Checklist Component */}
                {activeDay === 'FRIDAY' && (
                  <ActiveRecoveryChecklist checklist={activeWorkout.recoveryChecklist} />
                )}

                {/* Day 7: Sunday Weekly Review & Analytics Component */}
                {activeDay === 'SUNDAY' && (
                  <SundayAnalytics checklist={activeWorkout.recoveryChecklist} />
                )}

                {/* Warm-Up Protocol Section */}
                {activeWorkout.warmup && activeWorkout.warmup.length > 0 && (
                  <div className="p-5 rounded-2xl bg-obsidian-card border border-obsidian-border space-y-3">
                    <div className="flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-pink-hot" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                        Warm-Up & Primer Protocol
                      </h3>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {activeWorkout.warmup.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-obsidian-elevated border border-obsidian-border flex items-start space-x-2.5"
                        >
                          <div className="w-5 h-5 rounded-md bg-obsidian-card border border-pink-border/50 text-[10px] font-mono font-bold flex items-center justify-center text-pink-rose mt-0.5">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-xs font-bold text-white">{item.name}</h4>
                              <span className="text-[10px] font-mono text-pink-neon">
                                {item.setsReps}
                              </span>
                            </div>
                            {item.notes && (
                              <p className="text-[11px] text-zinc-dim mt-0.5 leading-relaxed">
                                {item.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exercises List */}
                {activeWorkout.exercises && activeWorkout.exercises.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Dumbbell className="w-4 h-4 text-pink-neon" />
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                          Main Exercise Protocol ({activeWorkout.exercises.length} Exercises)
                        </h3>
                      </div>
                      <span className="text-[11px] text-zinc-dim font-mono">
                        Tap checkmark to record set & auto-rest
                      </span>
                    </div>

                    {activeWorkout.exercises.map((exercise, index) => (
                      <ExerciseItem
                        key={exercise.id}
                        exercise={exercise}
                        index={index}
                        dayName={activeDay}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Desktop Right Bento Sticky Sidebar */}
          <section className="hidden lg:block lg:col-span-4">
            <DesktopBentoSidebar setCurrentView={setCurrentView} />
          </section>
        </div>
      </main>
    </div>
  );
};
