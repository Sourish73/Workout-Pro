import React, { useRef, useEffect } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { CheckCircle2, Flame } from 'lucide-react';

const DAYS_META = [
  { day: 'MONDAY', label: 'MON', tag: 'Glutes & Hams' },
  { day: 'TUESDAY', label: 'TUE', tag: 'Quads' },
  { day: 'WEDNESDAY', label: 'WED', tag: 'Back (V-Taper)' },
  { day: 'THURSDAY', label: 'THU', tag: 'Arms (Guns)' },
  { day: 'FRIDAY', label: 'FRI', tag: 'Active Rest' },
  { day: 'SATURDAY', label: 'SAT', tag: 'Legs & Delts' },
  { day: 'SUNDAY', label: 'SUN', tag: 'Weekly Review' },
];

export const DaySelector = () => {
  const { activeDay, selectDay, completedDays } = useWorkout();
  const scrollContainerRef = useRef(null);

  const isDayCompleted = (dayName) => {
    return completedDays?.includes(dayName);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(
        `[data-day="${activeDay}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeDay]);

  return (
    <div className="w-full bg-obsidian-bg/80 border-b border-obsidian-border py-3 px-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider text-pink-rose font-mono font-bold">
              12-Week Winter Arc Split
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-subtle border border-pink-border text-pink-neon font-mono font-semibold">
              7-Day Cadence
            </span>
          </div>
          <span className="text-[11px] text-zinc-dim hidden sm:inline">
            Click any day to access full protocol
          </span>
        </div>

        {/* Horizontal Swipeable Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-2.5 overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          {DAYS_META.map((item, idx) => {
            const isActive = activeDay === item.day;
            const completed = isDayCompleted(item.day);

            return (
              <button
                key={item.day}
                data-day={item.day}
                onClick={() => selectDay(item.day)}
                className={`relative flex-shrink-0 min-w-[95px] sm:min-w-[130px] px-3 py-2.5 rounded-2xl border transition-all duration-200 text-left min-h-[52px] select-none ${
                  isActive
                    ? 'bg-obsidian-elevated border-pink-neon text-white shadow-glow-pink-sm ring-1 ring-pink-neon/40'
                    : 'bg-obsidian-card border-obsidian-border text-zinc-subtext hover:border-pink-border/50 hover:text-white hover:bg-obsidian-cardHover'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`text-xs font-mono font-black tracking-tight ${
                        isActive ? 'text-pink-neon' : 'text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-[10px] text-zinc-dim font-mono">
                      #{idx + 1}
                    </span>
                  </div>

                  {completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-neon fill-pink-neon/20" />
                  ) : (
                    <span className="text-[9px] font-mono text-pink-rose/80 bg-pink-subtle px-1 rounded">
                      OPEN
                    </span>
                  )}
                </div>

                <div className="mt-1 truncate">
                  <p
                    className={`text-xs font-medium truncate ${
                      isActive ? 'text-white font-bold' : 'text-zinc-subtext'
                    }`}
                  >
                    {item.tag}
                  </p>
                </div>

                {isActive && (
                  <div className="absolute -bottom-1 left-3 right-3 h-[2px] bg-pink-neon rounded-full shadow-glow-pink-sm" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
