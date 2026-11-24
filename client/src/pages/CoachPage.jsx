import React from 'react';
import { authorConfig } from '../config/authorConfig';
import {
  Award,
  CheckCircle2,
  Instagram,
  Youtube,
  MessageCircle,
  Mail,
  Quote,
  TrendingUp,
  Dumbbell,
  ArrowRight,
  Layers,
  FileText,
} from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';

export const CoachPage = ({ setCurrentView }) => {
  const { copyGuideLink, copyFeedback } = useWorkout();

  return (
    <div className="min-h-screen bg-obsidian-bg py-8 px-4 sm:px-6 lg:px-8 pink-texture-bg">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Magazine-Style Hero Split Card */}
        <section className="relative rounded-3xl bg-obsidian-card border border-pink-border shadow-glow-pink overflow-hidden p-6 sm:p-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-neon/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Coach Photo & Accreditations Column */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-pink-neon shadow-glow-pink group">
                <img
                  src={authorConfig.profileImageUrl}
                  alt={authorConfig.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-xl bg-obsidian-card/90 backdrop-blur-md border border-pink-border text-pink-neon font-mono text-[11px] font-bold tracking-wider">
                  WINTER ARC PROGRAMMER
                </div>
              </div>

              {/* Social Channels Pills */}
              <div className="flex items-center space-x-2.5 mt-5">
                <a
                  href={`mailto:${authorConfig.socials.email}`}
                  className="px-3.5 py-2 rounded-xl bg-pink-subtle border border-pink-border text-pink-neon hover:bg-pink-neon hover:text-black font-mono font-bold text-xs flex items-center space-x-1.5 transition-all shadow-glow-pink-sm"
                  title={`Email ${authorConfig.name}`}
                >
                  <Mail className="w-4 h-4" />
                  <span>{authorConfig.socials.email}</span>
                </a>
              </div>
            </div>

            {/* Coach Bio & Headline Column */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-subtle border border-pink-border text-pink-rose text-xs font-mono font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>OFFICIAL GUIDE CREATOR</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {authorConfig.name}
                </h1>
                <p className="text-sm font-medium text-pink-rose mt-1 font-mono">
                  {authorConfig.tagline}
                </p>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-3 text-xs sm:text-sm text-zinc-subtext leading-relaxed">
                {authorConfig.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Program Overview */}
              <div className="p-3.5 rounded-2xl bg-obsidian-elevated/70 border border-obsidian-border space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-pink-neon">
                  <FileText className="w-4 h-4" />
                  <span>Program Specs & Structure</span>
                </div>
                <p className="text-xs text-zinc-subtext">
                  12 weeks workout plan. includes 3 levels: 1. beginner 2. intermediate 3. advance. Complete workout routine + tracking guide ({authorConfig.resourceSpecs.totalFileSize}).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-5 rounded-2xl bg-obsidian-card border border-obsidian-border text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-pink-neon font-mono">
              {authorConfig.stats.weeksProgram}
            </span>
            <p className="text-xs text-zinc-dim font-mono uppercase tracking-wider">
              Weeks Duration
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-obsidian-card border border-obsidian-border text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">
              {authorConfig.stats.trainingLevels}
            </span>
            <p className="text-xs text-zinc-dim font-mono uppercase tracking-wider">
              Levels (Beg/Int/Adv)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-obsidian-card border border-obsidian-border text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-pink-neon font-mono">
              {authorConfig.stats.activeAthletes}
            </span>
            <p className="text-xs text-zinc-dim font-mono uppercase tracking-wider">
              Athletes Following
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-obsidian-card border border-obsidian-border text-center space-y-1">
            <span className="text-xl sm:text-2xl font-black text-white font-mono">
              Official PDF
            </span>
            <p className="text-xs text-zinc-dim font-mono uppercase tracking-wider">
              Format Guide
            </p>
          </div>
        </section>

        {/* Philosophy Quote Block */}
        <section className="p-6 sm:p-8 rounded-3xl bg-obsidian-card border border-pink-border/60 relative overflow-hidden">
          <Quote className="w-16 h-16 text-pink-neon/10 absolute top-4 right-4" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-pink-rose font-bold">
              WINTER ARC PHILOSOPHY
            </span>
            <blockquote className="text-lg sm:text-xl font-bold text-white italic leading-relaxed">
              "{authorConfig.quote}"
            </blockquote>
            <p className="text-xs text-zinc-dim font-mono">
              — {authorConfig.quoteAuthor}, Creator of {authorConfig.programName}
            </p>
          </div>
        </section>

        {/* CTA to start training */}
        <section className="p-8 rounded-3xl bg-obsidian-card border border-pink-border text-center space-y-4 shadow-glow-pink">
          <h3 className="text-2xl font-black text-white">
            Start Your Winter Arc Transformation Today
          </h3>
          <p className="text-xs sm:text-sm text-zinc-subtext max-w-lg mx-auto">
            Access the full 12-week routine right now with zero paywall.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('workout')}
              className="px-6 py-3.5 rounded-2xl bg-pink-neon hover:bg-pink-hot text-black font-extrabold text-sm shadow-glow-pink flex items-center space-x-2 transition-all active:scale-95"
            >
              <span>Explore Workout Routine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={copyGuideLink}
              className="px-6 py-3.5 rounded-2xl bg-obsidian-elevated border border-pink-border hover:border-pink-neon text-white text-sm font-semibold transition-all"
            >
              Share Guide Link
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
