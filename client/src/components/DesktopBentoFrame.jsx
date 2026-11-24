import React, { useState } from 'react';
import {
  Lock,
  Unlock,
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
  FileText,
  Download,
  Printer,
  ChevronRight,
  ExternalLink,
  Play,
  Check,
  Eye,
} from 'lucide-react';
import { WORKOUT_SPLIT_DATA } from '../data/workoutData';
import {
  GPayLogo,
  PhonePeLogo,
  PaytmLogo,
  BhimLogo,
  VisaLogo,
  MastercardLogo,
  RuPayLogo,
  HdfcLogo,
  IciciLogo,
  SbiLogo,
  AxisLogo,
} from './PaymentLogos';

export const DesktopBentoFrame = ({
  user,
  hasPaid,
  onOpenAuth,
  onLaunchPayment,
  onOpenWatchForm,
  onDownloadPdf,
  onPrintPdf,
  onLockToggle,
}) => {
  const [selectedDayId, setSelectedDayId] = useState('MON');
  const [loggedSets, setLoggedSets] = useState({});
  const [exerciseWeights, setExerciseWeights] = useState({});

  const activeDay =
    WORKOUT_SPLIT_DATA.find((d) => d.id === selectedDayId) ||
    WORKOUT_SPLIT_DATA[0];

  const isDayLockedForUser = activeDay.isPro && !hasPaid;

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
    <div className="w-full max-w-[1440px] mx-auto text-white font-sans space-y-6">
      {/* ======================================================== */}
      {/* 1. TOP STICKY GLASS NAVBAR                               */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-30 w-full glass-panel-elevated rounded-2xl px-6 py-4 flex items-center justify-between border border-white/10 shadow-2xl">
        {/* Left: Creator Branding Pill */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 shadow-sm">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-900 border border-[#CCFF00]/40 shrink-0">
              <img
                src="/cover.png"
                alt="Akshita Sahu"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-extrabold text-white tracking-tight">
                  Akshita Sahu
                </span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#CCFF00] text-black flex items-center justify-center text-[9px] font-black">
                  ✓
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#CCFF00]/90">
                @akshitaoffside_
              </span>
            </div>
          </div>

          <a
            href="https://www.instagram.com/akshitaoffside_?dmpr=MWtiMHAybHhwcGpkMw=="
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 border border-white/5 transition-colors"
          >
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-bold font-mono tracking-wider uppercase text-zinc-400">
          <button
            onClick={() => {
              const el = document.getElementById('desktop-split-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#CCFF00] transition-colors"
          >
            7-Day Split
          </button>
          <button
            onClick={() => onOpenWatchForm('Hip Thrust')}
            className="hover:text-[#CCFF00] transition-colors"
          >
            Tools (1RM & Form)
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('desktop-coach-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#CCFF00] transition-colors"
          >
            About Coach
          </button>
        </nav>

        {/* Right: Auth & Pro Status */}
        <div className="flex items-center space-x-3">
          {hasPaid && (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-black font-mono">
              <Crown className="w-3.5 h-3.5 fill-[#CCFF00]" />
              <span>PRO UNLOCKED</span>
            </div>
          )}

          {user ? (
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-zinc-300 font-semibold hidden sm:inline">
                {user.name}
              </span>
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
              >
                Account
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-xl btn-volt text-xs font-black shadow-volt-glow-sm"
            >
              Sign In / Create Account
            </button>
          )}
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. 12-COLUMN BENTO GRID MAIN CONTENT                     */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ====================================================== */}
        {/* LEFT 7 COLUMNS: HERO, SPLIT EXPLORER & WORKOUT CARDS   */}
        {/* ====================================================== */}
        <div id="desktop-split-section" className="lg:col-span-7 space-y-6">
          {/* Hero Banner Card */}
          <div className="relative rounded-[32px] overflow-hidden glass-panel-elevated border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl group">
            {/* Visual Background with Athletic Overlay */}
            <div className="relative w-full aspect-[16/9] max-h-[380px] rounded-2xl overflow-hidden bg-stone-950 border border-white/10">
              <img
                src="/cover.png"
                alt="Build With Me - Akshita Sahu"
                className="w-full h-full object-cover object-[center_20%] group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-[#0A0A0D]/40 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 space-y-2 pointer-events-none">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#CCFF00] text-[#0A0A0D] text-[10px] font-black uppercase font-mono tracking-wider shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                  OFFICIAL WORKOUT SPLIT
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                  My Weekly Gym Split
                </h1>
                <p className="text-sm font-bold text-[#CCFF00]">
                  Build With Me • Personal Training Protocol
                </p>
              </div>
            </div>

            {/* Creator Philosophy Quote Block */}
            <div id="desktop-coach-section" className="relative p-5 rounded-2xl bg-white/[0.02] border-l-4 border-[#CCFF00] border-y border-r border-white/5 space-y-2">
              <p className="text-sm italic font-medium text-zinc-200 leading-relaxed">
                "You don't have to be the strongest girl in the gym. You just have to keep showing up."
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#CCFF00] font-mono">
                  — Akshita Sahu
                </span>
                <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  Let's build together.
                </span>
              </div>
            </div>
          </div>

          {/* Interactive 7-Day Split Selector Strip */}
          <div className="glass-panel rounded-2xl p-3 border border-white/10 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-mono uppercase font-bold text-zinc-400 tracking-wider">
                WEEKLY SPLIT SCHEDULE (MON–SUN)
              </span>
              <span className="text-[10px] font-mono text-[#CCFF00] bg-[#CCFF00]/10 px-2.5 py-0.5 rounded-full font-bold">
                {hasPaid ? 'All 7 Days Unlocked ✓' : '3 Days Pro Locked 🔒'}
              </span>
            </div>

            {/* Horizontal Pill Bar */}
            <div className="grid grid-cols-7 gap-2 overflow-x-auto no-scrollbar">
              {WORKOUT_SPLIT_DATA.map((day) => {
                const isSelected = selectedDayId === day.id;
                const isLocked = day.isPro && !hasPaid;

                return (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    className={`p-2.5 rounded-xl flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#CCFF00] text-black shadow-volt-glow-sm font-black'
                        : isLocked
                        ? 'bg-white/[0.02] hover:bg-white/[0.05] text-zinc-400 border border-white/5'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10'
                    }`}
                  >
                    <span className="text-xs font-mono font-extrabold">
                      {day.id}
                    </span>
                    <span className="text-[10px] mt-0.5 truncate max-w-full font-medium">
                      {day.title.split('&')[0].trim()}
                    </span>

                    {/* Pro Lock or Free Badge */}
                    <div className="mt-1">
                      {isLocked ? (
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                          <Lock className="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <span className={`text-[8px] font-mono uppercase font-extrabold px-1 rounded ${
                          isSelected ? 'bg-black/20 text-black' : 'text-emerald-400'
                        }`}>
                          FREE
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE DAY WORKOUT CONTAINER */}
          {isDayLockedForUser ? (
            /* PRO LOCKED PREVIEW STATE CARD */
            <div className="glass-panel-elevated rounded-3xl p-8 border border-amber-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden animate-fadeIn">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-md">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1.5 max-w-md mx-auto">
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold">
                  PRO LOCKED WORKOUT DAY
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {activeDay.dayName} • {activeDay.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  This muscle hypertrophy session contains {activeDay.exercises.length} specialized exercises with progressive overload targets, failure sets, and intensity cues.
                </p>
              </div>

              {/* Blurred Exercise Preview */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5 text-left opacity-60 filter blur-[1px]">
                {activeDay.exercises.slice(0, 3).map((ex, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-white/[0.02]">
                    <span className="font-bold">{ex.name}</span>
                    <span className="font-mono text-zinc-400">{ex.sets} Sets × {ex.reps}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={onLaunchPayment}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl btn-volt text-sm font-black flex items-center justify-center space-x-2 mx-auto shadow-volt-glow active:scale-95"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
                  <span>Unlock Full 7-Day Split — ₹49</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
                <p className="text-[11px] text-zinc-500 font-mono">
                  One-time payment • Real-money Razorpay verification • Instant delivery
                </p>
              </div>
            </div>
          ) : (
            /* UNLOCKED ACTIVE WORKOUT CARD LIST */
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#CCFF00] text-black font-black">
                      {activeDay.dayName}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {activeDay.duration}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {activeDay.title}
                  </h3>
                  <p className="text-xs text-zinc-400">{activeDay.subtitle}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono text-zinc-400">
                    Focus: <strong className="text-[#CCFF00]">{activeDay.focus}</strong>
                  </span>
                </div>
              </div>

              {/* Warm-Up & Primer (if available) */}
              {activeDay.warmup.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center space-x-1.5">
                    <Flame className="w-4 h-4 text-rose-500" />
                    <span>WARM-UP & PRIMER</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeDay.warmup.map((w, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
                      >
                        <span className="font-bold text-zinc-200">{w.name}</span>
                        <span className="font-mono text-[#CCFF00] font-semibold">{w.target}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exercise Cards with Interactive Overload Logger */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center space-x-1.5">
                  <Dumbbell className="w-4 h-4 text-[#CCFF00]" />
                  <span>MOVEMENTS ({activeDay.exercises.length} EXERCISES)</span>
                </h4>

                {activeDay.exercises.map((ex, idx) => {
                  const setKey = `${activeDay.id}-${ex.id}`;
                  const isCompleted = Boolean(loggedSets[setKey]);
                  const weightVal = exerciseWeights[ex.id] ?? ex.defaultWeight;

                  return (
                    <div
                      key={ex.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isCompleted
                          ? 'bg-emerald-950/20 border-emerald-500/40 shadow-inner'
                          : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/10'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Exercise Name & Cues */}
                        <div className="flex items-start space-x-3.5">
                          <div
                            className={`w-8 h-8 rounded-xl font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                              isCompleted
                                ? 'bg-emerald-500 text-black font-black'
                                : 'bg-white/10 text-white'
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h5
                                className={`text-base font-extrabold ${
                                  isCompleted ? 'line-through text-zinc-400' : 'text-white'
                                }`}
                              >
                                {ex.name}
                              </h5>
                              <button
                                onClick={() => onOpenWatchForm(ex.name)}
                                className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 text-[#CCFF00] hover:text-white text-[10px] font-mono font-bold flex items-center space-x-1 transition-colors"
                                title="Watch Form Tutorial"
                              >
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span>Watch Form</span>
                              </button>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs font-mono font-bold text-[#CCFF00]">
                                {ex.sets} Sets × {ex.reps}
                              </span>
                            </div>
                            {ex.cue && (
                              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                                {ex.cue}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Weight Logger & Checkbox */}
                        <div className="flex items-center space-x-3 self-end sm:self-center">
                          {ex.defaultWeight > 0 && (
                            <div className="flex items-center space-x-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
                              <span className="text-[10px] font-mono text-zinc-400">KG</span>
                              <input
                                type="number"
                                value={weightVal}
                                onChange={(e) =>
                                  handleWeightChange(ex.id, e.target.value)
                                }
                                className="w-12 bg-transparent text-right font-mono font-black text-xs text-white focus:outline-none"
                              />
                            </div>
                          )}

                          {/* 48px Tap Target Checkmark Button */}
                          <button
                            type="button"
                            onClick={() => toggleSetComplete(setKey)}
                            className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center border transition-all active:scale-95 ${
                              isCompleted
                                ? 'bg-[#CCFF00] border-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.5)]'
                                : 'bg-white/5 hover:bg-white/10 border-white/20 text-zinc-400'
                            }`}
                            title={isCompleted ? 'Mark as incomplete' : 'Mark set complete'}
                          >
                            <Check
                              className={`w-5 h-5 stroke-[3] ${
                                isCompleted ? 'text-black' : 'text-zinc-500'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ====================================================== */}
        {/* RIGHT 5 COLUMNS: STICKY GLASS CHECKOUT & ACCESS CARD   */}
        {/* ====================================================== */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* PRIMARY CARD: LOGGED-OUT GATE / CHECKOUT STATE */}
          <div className="glass-panel-elevated rounded-[32px] p-6 sm:p-7 border border-white/10 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] font-black tracking-wider border border-[#CCFF00]/30">
                LIFETIME FULL ACCESS
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                Save 84%
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight">
                Unlock Full Weekly Access
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Unlock all 7 training days, heavy glute specializations, arm hypertrophy protocol, and the colorful PDF guide.
              </p>
            </div>

            {/* Pricing Box */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-baseline justify-between font-mono">
              <span className="text-xs text-zinc-400">One-Time Fee:</span>
              <div className="space-x-2 text-right">
                <span className="line-through text-zinc-500 text-sm">₹299</span>
                <span className="text-3xl font-black text-[#CCFF00] tracking-tight">
                  ₹49
                </span>
              </div>
            </div>

            {/* "What's Inside" 7-Point Checklist */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                WHAT'S INCLUDED IN UNLOCK:
              </span>
              <div className="space-y-2 text-xs font-semibold text-zinc-200">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>6 structured training days (Mon–Sat)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>Glute & hamstring focused training</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>Quad-focused workouts</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>Back, arms & forearms training</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>Legs & shoulders deltoid sculpt</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>Rest & recovery days</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                  <span>Exercises, sets, reps & intensity guidance</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button (Volt Lime) */}
            <button
              type="button"
              onClick={onLaunchPayment}
              className="w-full py-4 rounded-2xl btn-volt text-sm font-black flex items-center justify-center space-x-2 transition-all shadow-volt-glow active:scale-98"
            >
              <span>{hasPaid ? 'Access Granted • Download Guide' : 'Sign In to Unlock & Pay →'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            {/* Accepted Indian Payment Methods Bar */}
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block text-center font-bold">
                ACCEPTED PAYMENT METHODS (INSTANT UNLOCK)
              </span>
              <div className="grid grid-cols-4 gap-1.5 p-2 rounded-2xl bg-black/40 border border-white/5">
                <div className="flex items-center justify-center py-1.5 rounded-xl bg-white/5" title="Google Pay">
                  <GPayLogo className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center py-1.5 rounded-xl bg-[#5F259F]" title="PhonePe">
                  <PhonePeLogo className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center py-1.5 rounded-xl bg-white/5" title="Paytm">
                  <PaytmLogo className="w-7 h-3.5" />
                </div>
                <div className="flex items-center justify-center py-1.5 rounded-xl bg-white/5" title="BHIM UPI">
                  <BhimLogo className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center justify-between text-zinc-400 text-xs px-1">
                <div className="flex items-center space-x-1.5">
                  <VisaLogo className="w-7 h-3.5" />
                  <MastercardLogo className="w-6 h-3.5" />
                  <RuPayLogo className="w-8 h-3.5" />
                </div>
                <div className="flex items-center space-x-1.5">
                  <HdfcLogo className="w-3.5 h-3.5" />
                  <IciciLogo className="w-3.5 h-3.5" />
                  <SbiLogo className="w-3.5 h-3.5" />
                  <AxisLogo className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex items-center justify-center space-x-1.5 text-[11px] text-zinc-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>Razorpay 256-Bit SSL Encrypted • Instant Access</span>
              </div>
            </div>
          </div>

          {/* SECONDARY VARIANT PREVIEW CARD: UNLOCKED PRO MEMBER STATE */}
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-[#CCFF00]" />
                <span className="text-xs font-mono font-black text-white uppercase tracking-wider">
                  PRO MEMBER STATE
                </span>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                hasPaid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-zinc-400'
              }`}>
                {hasPaid ? 'ACTIVE ✓' : 'PREVIEW'}
              </span>
            </div>

            <p className="text-xs text-zinc-400">
              Receipt #RZP-2026-AS • 30 Days Remaining • Includes official downloadable PDF guide.
            </p>

            <div className="flex items-center space-x-2 pt-1">
              <button
                type="button"
                onClick={onDownloadPdf}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF (.pdf)</span>
              </button>
              <button
                type="button"
                onClick={onPrintPdf}
                className="px-3 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-300 text-xs font-bold transition-all"
                title="Print or Save via Browser"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Test toggle button */}
            <div className="pt-2 border-t border-white/5 text-right">
              <button
                onClick={onLockToggle}
                className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {hasPaid ? '⚡ Switch to Unpaid Preview' : '⚡ Simulate Paid Member'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
