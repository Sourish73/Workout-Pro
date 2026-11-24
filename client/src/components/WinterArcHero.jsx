import React, { useState } from 'react';
import { authorConfig } from '../config/authorConfig';
import { useWorkout } from '../context/WorkoutContext';
import {
  FileText,
  Mail,
  Copy,
  Check,
  Flame,
  ArrowRight,
  Sparkles,
  Download,
  Share2,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

export const WinterArcHero = () => {
  const {
    trainingLevel,
    changeTrainingLevel,
    copyGuideLink,
    copyFeedback,
    triggerConfetti,
  } = useWorkout();

  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(false);

  const handleInstantGet = (e) => {
    e.preventDefault();
    setDownloadProgress(true);
    setTimeout(() => {
      setDownloadProgress(false);
      setSubmitted(true);
      triggerConfetti();
    }, 800);
  };

  const handleDownloadFile = () => {
    // Generate downloadable resource guide
    const fileContent = `# COMPLETE 12-WEEK WORKOUT PLAN by Akshita Sahu (@akshitaoffside_)
Email: Fitwithakshita@gmail.com
Instagram: https://www.instagram.com/akshitaoffside_?dmpr=MWtiMHAybHhwcGpkMw==
12 Weeks Workout Plan & Progressive Overload Tracking Guide

## 3 TRAINING LEVELS
1. Level 1: Beginner (Foundations, Hypertrophy priming)
2. Level 2: Intermediate (7-day high stimulus-to-fatigue split)
3. Level 3: Advance (High-intensity techniques & failure sets)

## 7-DAY SPLIT
- Monday: Glutes & Hamstrings
- Tuesday: Quads
- Wednesday: Back (V-Taper)
- Thursday: Arms (Biceps, Forearms, Triceps)
- Friday: Active Rest & 10k Steps / 3.5L Hydration
- Saturday: Legs & 3D Deltoids
- Sunday: Weekly Volume Audit & Nutrition Prep

"Winter is coming. Are you ready?"
`;
    const blob = new Blob([fileContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Complete-Winter-Arc-Guide-Akshita-Sahu.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-panel border border-pink-border shadow-glow-pink mb-8 pink-texture-bg">
      {/* Radiant ambient glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-pink-neon/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-crimson/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Creator Badge (Matches screenshot: Akshita sahu pill + SuperProfile) */}
      <div className="relative z-10 px-5 sm:px-8 py-3.5 border-b border-obsidian-border/80 flex items-center justify-between bg-obsidian-card/40 backdrop-blur-md">
        <div className="flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-obsidian-elevated/90 border border-pink-border/60 shadow-glow-pink-sm">
          <div className="w-6 h-6 rounded-full bg-pink-neon/20 border border-pink-neon/60 flex items-center justify-center text-pink-neon font-black text-xs">
            AS
          </div>
          <span className="font-bold text-xs text-white tracking-wide">
            {authorConfig.name}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-dim">
          <span className="hidden sm:inline">Built with ❤️ for Winter Arc Athletes</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            100% FREE ACCESS
          </span>
        </div>
      </div>

      {/* Main Dual Grid: Left Content + Right Action Box */}
      <div className="relative z-10 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Hero Picture + Details) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Snowy Mountain Summit Photo with Athlete Back Flex (Matches Screenshot!) */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-pink-border shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
              alt="Complete Winter Arc Guide - Athlete on Snowy Summit"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-bg via-transparent to-black/30" />

            {/* Alpine Winter Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-pink-rose font-bold drop-shadow-md">
                WINTER IS COMING
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight drop-shadow-lg mt-1 font-mono">
                ARE YOU READY?
              </h3>
            </div>

            {/* Bottom Badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] px-3 py-1.5 rounded-xl bg-obsidian-card/85 backdrop-blur-md border border-pink-border/50 text-white font-mono">
              <span className="text-pink-rose font-bold">12-Week Transformation Split</span>
              <span className="text-zinc-dim">3 Levels Included</span>
            </div>
          </div>

          {/* Title & Description (Exact Details from Screenshot!) */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {authorConfig.programName}
            </h1>
            <div className="mt-3 p-3.5 rounded-xl bg-obsidian-elevated/70 border border-obsidian-border text-xs sm:text-sm text-zinc-subtext leading-relaxed">
              <div className="font-mono text-pink-rose font-bold uppercase text-[11px] mb-1">
                ABOUT THE PAGE
              </div>
              <p className="font-semibold text-white">
                12 weeks workout plan. includes 3 levels:
              </p>
              <div className="flex flex-wrap gap-2 my-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-pink-neon/15 border border-pink-neon/40 text-pink-neon font-bold">
                  1. Beginner
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-pink-neon/15 border border-pink-neon/40 text-pink-neon font-bold">
                  2. Intermediate
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-pink-neon/15 border border-pink-neon/40 text-pink-neon font-bold">
                  3. Advance
                </span>
              </div>
              <p className="text-zinc-subtext">
                workout routine + tracking guide
              </p>
            </div>
          </div>

          {/* WHAT YOU'LL GET Spec Table (Exact Details from Screenshot!) */}
          <div className="p-4 rounded-xl bg-obsidian-elevated/50 border border-obsidian-border space-y-2.5">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-pink-rose">
              WHAT YOU'LL GET
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-obsidian-border/60">
                <span className="text-zinc-dim font-mono">Number of resources</span>
                <span className="font-mono font-bold text-white">1</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-obsidian-border/60">
                <span className="text-zinc-dim font-mono">Resource content</span>
                <span className="font-mono font-bold text-white">File (Official PDF Guide)</span>
              </div>
            </div>
          </div>

          {/* Level Switcher (Beginner / Intermediate / Advance) */}
          <div className="p-4 rounded-2xl bg-obsidian-card border border-pink-border/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-pink-neon" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Active Winter Arc Level
                </h4>
              </div>
              <span className="text-[10px] text-zinc-dim font-mono">
                Click to switch protocol
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'beginner', label: '1. Beginner', desc: 'Foundations & Primer' },
                { id: 'intermediate', label: '2. Intermediate', desc: 'Overload Split' },
                { id: 'advance', label: '3. Advance', desc: 'Failure & Dropsets' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => changeTrainingLevel(lvl.id)}
                  className={`py-2 px-2 rounded-xl text-center border transition-all ${
                    trainingLevel === lvl.id
                      ? 'bg-pink-neon text-black font-extrabold border-pink-neon shadow-glow-pink-sm'
                      : 'bg-obsidian-elevated border-obsidian-border text-zinc-subtext hover:border-pink-border hover:text-white'
                  }`}
                >
                  <span className="block text-xs font-bold leading-tight">{lvl.label}</span>
                  <span className={`text-[9px] block mt-0.5 ${trainingLevel === lvl.id ? 'text-black/80' : 'text-zinc-dim'}`}>
                    {lvl.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Me Box (Exact Details from Screenshot!) */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-elevated/40 border border-obsidian-border text-xs">
            <span className="text-zinc-dim font-mono">CONTACT ME FOR ANY ISSUES OR QUERIES:</span>
            <a
              href={`mailto:${authorConfig.socials.email}`}
              className="text-pink-neon hover:underline font-mono font-bold flex items-center space-x-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{authorConfig.socials.email}</span>
            </a>
          </div>
        </div>

        {/* Right Column (High-End Instant Access Card - Enhanced, Not Whitish!) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-obsidian-card/95 border border-pink-border p-6 shadow-glow-pink backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-pink-neon via-pink-hot to-pink-neon" />

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-pink-rose font-bold">
                  FREE DIGITAL ACCESS
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Get Complete Guide & Tracking
                </h3>
                <p className="text-xs text-zinc-dim mt-0.5">
                  Access to this protocol will be instantly unlocked on this device
                </p>
              </div>

              {submitted ? (
                /* Success State */
                <div className="p-5 rounded-2xl bg-pink-subtle border border-pink-border text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-2xl bg-pink-neon text-black flex items-center justify-center mx-auto font-black shadow-glow-pink">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Access Granted!</h4>
                    <p className="text-xs text-zinc-subtext mt-1">
                      The Complete Winter Arc Guide is 100% unlocked for you.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadFile}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs flex items-center justify-center space-x-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official PDF Guide</span>
                  </button>
                </div>
              ) : (
                /* Instant Access Form (Matches inputs from screenshot) */
                <form onSubmit={handleInstantGet} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-dim uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="athlete@winterarc.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border text-white text-xs sm:text-sm focus:border-pink-neon focus:outline-none placeholder-zinc-dim transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-dim uppercase mb-1">
                      +91 Phone number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border text-white text-xs sm:text-sm focus:border-pink-neon focus:outline-none placeholder-zinc-dim transition-colors"
                    />
                  </div>

                  {/* Pricing Display (Matches screenshot: Sub Total ₹299 ₹49 -> Free!) */}
                  <div className="p-3 rounded-xl bg-obsidian-elevated/70 border border-obsidian-border space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-dim">Sub Total</span>
                      <div className="space-x-1 font-mono">
                        <span className="text-zinc-dim line-through">₹299</span>
                        <span className="text-zinc-subtext">₹49</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-obsidian-border/60">
                      <span className="font-bold text-white">Total</span>
                      <div className="flex items-baseline space-x-1 font-mono">
                        <span className="text-lg font-black text-pink-neon">FREE</span>
                        <span className="text-[10px] text-emerald-400 font-semibold">(100% Off)</span>
                      </div>
                    </div>
                  </div>

                  {/* "Get it now ->" button (Matches screenshot!) */}
                  <button
                    type="submit"
                    disabled={downloadProgress}
                    className="w-full py-3.5 rounded-2xl bg-pink-neon hover:bg-pink-hot text-black font-extrabold text-sm tracking-wide flex items-center justify-center space-x-2 shadow-glow-pink transition-all active:scale-98 disabled:opacity-50"
                  >
                    {downloadProgress ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Unlocking Guide...</span>
                      </div>
                    ) : (
                      <>
                        <span>Get it now</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* INVITE YOUR NETWORK: Copy link button (Matches screenshot!) */}
              <div className="pt-2 border-t border-obsidian-border/80">
                <span className="block text-[10px] font-mono uppercase text-zinc-dim tracking-wider mb-2">
                  INVITE YOUR NETWORK
                </span>
                <button
                  type="button"
                  onClick={copyGuideLink}
                  className="w-full py-2.5 rounded-xl bg-obsidian-elevated hover:bg-obsidian-cardHover border border-obsidian-border hover:border-pink-border text-xs font-semibold text-white flex items-center justify-center space-x-2 transition-all active:scale-98"
                >
                  {copyFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Link Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-pink-rose" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
