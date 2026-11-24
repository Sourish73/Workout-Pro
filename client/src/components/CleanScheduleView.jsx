import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

const SCHEDULE_DAYS = [
  {
    day: 'MONDAY',
    title: 'Glutes & Hamstrings',
    subtitle: 'Posterior Chain Hypertrophy & Strength',
    duration: '55–65 mins',
    warmup: [
      { name: 'Push-Ups', target: '10–15 Reps' },
      { name: 'Pull-Ups', target: '10–15 Reps' },
      { name: 'Stretching', target: '5–7 mins long' },
    ],
    exercises: [
      { name: 'Hip Abduction', sets: '3 Sets', reps: '15–20 Reps', note: 'Lean slightly forward for deeper glute medius isolation.' },
      { name: 'Hip Thrust', sets: '3 Sets', reps: 'Heavy Weight, Close to Failure', note: 'Drive through heels to full hip lockout; chin tucked.' },
      { name: 'Sumo Squats', sets: '3 Sets', reps: '15–20 Reps', note: 'Wide stance with toes flared 35–45 degrees.' },
      { name: 'Romanian Deadlift (RDL)', sets: '3 Sets', reps: '12–15 Reps', note: 'Push hips back with soft knees; skim shins.' },
      { name: 'Lying Leg Curl', sets: '3 Sets', reps: '12–15 Reps', note: 'Keep hips pressed into pad. 3-second negative.' },
      { name: 'Calf Raises', sets: '3 Sets', reps: '12–15 Reps', note: 'Pause 2 seconds at bottom stretch.' },
    ],
  },
  {
    day: 'TUESDAY',
    title: 'Quads',
    subtitle: 'Anterior Chain Hypertrophy',
    duration: '50–60 mins',
    warmup: [
      { name: 'Push-Ups', target: '10–15 Reps' },
      { name: 'Pull-Ups', target: '10–15 Reps' },
    ],
    exercises: [
      { name: 'Leg Press', sets: '4 Sets', reps: '12–15 Reps', note: 'Low-to-mid foot placement for maximal quad bias.' },
      { name: 'Leg Extension', sets: '3 Sets', reps: '12–15 Reps (Last Set to Failure)', note: 'Extend knees fully, pause 1 second at top.' },
      { name: 'Seated Leg Curl', sets: '3 Sets', reps: '12–15 Reps (Last Set to Failure)', note: 'Lengthened hamstring position for muscle damage.' },
      { name: 'Lunges', sets: '3 Sets', reps: '12–15 Reps', note: 'Walking or reverse lunges with dumbbells.' },
      { name: 'Calf Raises', sets: '3 Sets', reps: '12–15 Reps', note: 'Slow 3-second descent into full calf stretch.' },
    ],
  },
  {
    day: 'WEDNESDAY',
    title: 'Back',
    subtitle: 'V-Taper Width & Upper Back Density',
    duration: '50–60 mins',
    warmup: [
      { name: 'Push-Ups', target: '10–15 Reps' },
      { name: 'Pull-Ups', target: '10–15 Reps' },
    ],
    exercises: [
      { name: 'Lat Pulldown', sets: '3 Sets', reps: '12–15 Reps', note: 'Pull elbows down and slightly back into side pockets.' },
      { name: 'Bent-Over Row / T-Bar Row', sets: '3 Sets', reps: '12–15 Reps', note: 'Maintain 45-degree hip hinge with flat spine.' },
      { name: 'Seated Cable Row', sets: '3 Sets', reps: '12–15 Reps', note: 'Close-grip V-handle. Avoid rocking.' },
      { name: 'Reverse Lat Pulldown', sets: '3 Sets', reps: '12–15 Reps', note: 'Underhand shoulder-width grip for lower lats.' },
      { name: 'Shrugs', sets: '3 Sets', reps: '8–12 Reps (Last Set to Failure)', note: 'Straight up and down. Pause 2s at top.' },
    ],
  },
  {
    day: 'THURSDAY',
    title: 'Arms',
    subtitle: 'Biceps, Forearms & Triceps Gun Show',
    duration: '55–65 mins',
    warmup: [
      { name: 'Push-Ups', target: '10–15 Reps' },
      { name: 'Pull-Ups', target: '10–15 Reps' },
    ],
    exercises: [
      { name: 'Dumbbell Curls', sets: '3 Sets', reps: '12–15 Reps', note: 'Supinate wrists as you curl upward.' },
      { name: 'Hammer Curls', sets: '3 Sets', reps: '12–15 Reps', note: 'Neutral palms-facing-in grip.' },
      { name: 'Preacher Curls', sets: '3 Sets', reps: '12–15 Reps', note: 'EZ-Bar or machine. Eliminate momentum.' },
      { name: 'Reverse Cable Curls', sets: '3 Sets', reps: '12–15 Reps', note: 'Pronated grip for forearms & brachialis.' },
      { name: 'Dumbbell Wrist Curls', sets: '3 Sets', reps: '12–15 Reps', note: 'Forearms resting on flat bench.' },
      { name: 'Cable Pushdowns', sets: '3 Sets', reps: '12–15 Reps', note: 'Rope or V-bar. Flare rope apart at bottom.' },
      { name: 'Weighted Bench Dips', sets: '3 Sets', reps: '12–15 Reps', note: 'Press through palms to lock out triceps.' },
      { name: 'Cable Overhead Triceps Extensions', sets: '3 Sets', reps: '12–15 Reps', note: 'High cable step-forward extension.' },
    ],
  },
  {
    day: 'FRIDAY',
    title: 'Rest Day & Active Recovery',
    subtitle: 'Active Tissue Repair & Metabolic Reset',
    duration: 'All Day Habit',
    warmup: [],
    exercises: [
      { name: '8,000–10,000 Steps Tracker', sets: 'Daily Target', reps: '10,000 Steps', note: 'Low-intensity outdoor walking.' },
      { name: '3.5L Daily Hydration Tracker', sets: 'Hydration Target', reps: '3.5 Liters Water', note: 'Mineralized water with electrolytes.' },
      { name: 'Foam Rolling & Mobility Routine', sets: 'Mobility Protocol', reps: '15–20 Mins', note: 'Quads, lats, glutes, thoracic spine.' },
      { name: 'Deep Rest & Sleep Quality Log', sets: 'Sleep Protocol', reps: '8+ Hours Sleep', note: 'Cold sleep room, no screens 60m before bed.' },
    ],
  },
  {
    day: 'SATURDAY',
    title: 'Legs & Shoulders',
    subtitle: 'Quad Hypertrophy & 3D Deltoids',
    duration: '60–70 mins',
    warmup: [
      { name: 'Push-Ups', target: '10–15 Reps' },
      { name: 'Pull-Ups', target: '10–15 Reps' },
    ],
    exercises: [
      { name: 'Leg Extensions', sets: '3 Sets', reps: '12–15 Reps', note: 'Prime the knee joint and flood quads.' },
      { name: 'Sumo Squats', sets: '3 Sets', reps: '15–20 Reps', note: 'Use lighter weight and focus on strict form.' },
      { name: 'Dumbbell Shoulder Press', sets: '3 Sets', reps: '12–15 Reps', note: 'Slight bench incline (75–80 degrees).' },
      { name: 'Dumbbell Lateral Raises', sets: '3 Sets', reps: '12–15 Reps', note: 'Lead with elbows. Lean slightly forward.' },
      { name: 'Dumbbell Front Raises', sets: '3 Sets', reps: '12–15 Reps', note: 'Neutral or overhand grip; no hip swing.' },
      { name: 'Upright Rows', sets: '3 Sets', reps: '12–15 Reps', note: 'Pull to lower chest with elbows high.' },
      { name: 'Shrugs', sets: '3 Sets', reps: '8–12 Reps', note: 'Heavy but strictly controlled; pause 2s.' },
    ],
  },
  {
    day: 'SUNDAY',
    title: 'Rest, Recovery & Weekly Review',
    subtitle: 'Weekly Review, Analytics & Meal Prep',
    duration: 'Prep & Review',
    warmup: [],
    exercises: [
      { name: 'Weekly Volume & PR Audit', sets: 'Audit', reps: 'Review 6-Day Log', note: 'Examine sets completed and progressive increments.' },
      { name: 'High-Protein Meal Prep', sets: 'Nutrition Target', reps: '3 Days Ahead', note: 'Batch-cook lean proteins and complex carbohydrates.' },
      { name: 'Readiness & Soreness Check-In', sets: 'Self-Score', reps: 'Score 1–10', note: 'Evaluate joint health before starting Monday.' },
    ],
  },
];

export const CleanScheduleView = () => {
  const [selectedDay, setSelectedDay] = useState('MONDAY');
  const [completedItems, setCompletedItems] = useState({});

  const toggleComplete = (key) => {
    setCompletedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const activeDayData = SCHEDULE_DAYS.find((d) => d.day === selectedDay) || SCHEDULE_DAYS[0];

  return (
    <div className="space-y-6 pt-4">
      {/* 7-Day Day Selector Bar */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
        {SCHEDULE_DAYS.map((d) => (
          <button
            key={d.day}
            onClick={() => setSelectedDay(d.day)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-mono transition-all flex-shrink-0 ${
              selectedDay === d.day
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {d.day.slice(0, 3)} • {d.title.split('&')[0].trim()}
          </button>
        ))}
      </div>

      {/* Active Day Card (Clean, Bold, Zero Complexity) */}
      <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-black text-white font-black">
                {activeDayData.day}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                {activeDayData.duration}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
              {activeDayData.title}
            </h3>
            <p className="text-xs text-gray-600">{activeDayData.subtitle}</p>
          </div>
        </div>

        {/* Warm-Up (if any) */}
        {activeDayData.warmup.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Warm-Up & Primer</span>
            </h4>
            <div className="grid gap-2 sm:grid-cols-3">
              {activeDayData.warmup.map((w, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white border border-gray-200 flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-gray-900">{w.name}</span>
                  <span className="font-mono text-gray-500 font-semibold">{w.target}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exercise List - Clean & Bold (No reps count inputs) */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 flex items-center space-x-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-gray-900" />
            <span>Daily Protocol ({activeDayData.exercises.length} Movements)</span>
          </h4>

          {activeDayData.exercises.map((ex, idx) => {
            const itemKey = `${selectedDay}-${idx}`;
            const isDone = Boolean(completedItems[itemKey]);

            return (
              <div
                key={idx}
                onClick={() => toggleComplete(itemKey)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h5
                      className={`text-sm font-bold ${
                        isDone ? 'line-through text-gray-500' : 'text-gray-950'
                      }`}
                    >
                      {ex.name}
                    </h5>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-xs font-mono font-bold text-gray-900">
                        {ex.sets} × {ex.reps}
                      </span>
                    </div>
                    {ex.note && (
                      <p className="text-xs text-gray-500 mt-1">{ex.note}</p>
                    )}
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
