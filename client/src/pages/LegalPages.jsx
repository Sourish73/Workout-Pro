import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowLeft } from 'lucide-react';
import { authorConfig } from '../config/authorConfig';

export const LegalPages = ({ pageType = 'terms', setCurrentView }) => {
  const [activeTab, setActiveTab] = useState(pageType);

  return (
    <div className="min-h-screen bg-obsidian-bg py-8 px-4 sm:px-6 lg:px-8 pink-texture-bg">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <button
          onClick={() => setCurrentView('workout')}
          className="flex items-center space-x-1.5 text-xs font-mono text-pink-rose hover:text-pink-neon transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workout Routine</span>
        </button>

        {/* Tab Selectors */}
        <div className="flex flex-wrap gap-2 border-b border-obsidian-border pb-4">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
              activeTab === 'terms'
                ? 'bg-pink-neon text-black shadow-glow-pink-sm'
                : 'bg-obsidian-card text-zinc-subtext hover:text-white border border-obsidian-border'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
              activeTab === 'privacy'
                ? 'bg-pink-neon text-black shadow-glow-pink-sm'
                : 'bg-obsidian-card text-zinc-subtext hover:text-white border border-obsidian-border'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
              activeTab === 'contact'
                ? 'bg-pink-neon text-black shadow-glow-pink-sm'
                : 'bg-obsidian-card text-zinc-subtext hover:text-white border border-obsidian-border'
            }`}
          >
            Contact & Queries
          </button>
        </div>

        {/* TERMS & CONDITIONS */}
        {activeTab === 'terms' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-card border border-pink-border/50 shadow-glow-pink-sm space-y-6 text-xs sm:text-sm text-zinc-subtext leading-relaxed">
            <div>
              <span className="text-[10px] font-mono uppercase text-pink-rose font-bold">
                GUIDE TERMS & DISCLAIMER
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Terms of Service
              </h2>
              <p className="text-xs text-zinc-dim font-mono mt-1">
                {authorConfig.programName} by {authorConfig.name}
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-white">1. Introduction</h3>
              <p>
                The {authorConfig.programName} is designed and provided by {authorConfig.name} as an interactive 12-week resistance training guide across 3 levels (Beginner, Intermediate, Advance). Access is completely free for all athletes.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-white">2. Health & Exercise Safety Disclaimer</h3>
              <p>
                Resistance training involves inherent physical stress. Consult a physician before beginning any strenuous workout routine. Always practice proper form, control repetitions, and adjust weights to your physical readiness.
              </p>
            </section>
          </div>
        )}

        {/* PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-card border border-pink-border/50 shadow-glow-pink-sm space-y-6 text-xs sm:text-sm text-zinc-subtext leading-relaxed">
            <div>
              <span className="text-[10px] font-mono uppercase text-pink-rose font-bold">
                DATA PRIVACY
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Privacy Policy</h2>
            </div>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-white">1. Local Storage Data</h3>
              <p>
                Your workout logs, checked sets, reps, and streak records are securely saved on your device's browser local storage. No forced account registration or tracking cookies are required.
              </p>
            </section>
          </div>
        )}

        {/* CONTACT */}
        {activeTab === 'contact' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-card border border-pink-border/50 shadow-glow-pink-sm space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase text-pink-rose font-bold">
                CREATOR SUPPORT
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Contact Me</h2>
              <p className="text-xs text-zinc-dim font-mono mt-1">
                For any questions or feedback regarding the guide
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-obsidian-elevated border border-pink-border space-y-2">
              <div className="flex items-center space-x-2 text-pink-neon font-bold text-xs uppercase font-mono">
                <Mail className="w-4 h-4" />
                <span>Email Address</span>
              </div>
              <a
                href={`mailto:${authorConfig.socials.email}`}
                className="text-base font-bold text-white hover:text-pink-neon transition-colors block"
              >
                {authorConfig.socials.email}
              </a>
              <p className="text-xs text-zinc-dim">
                Direct contact for {authorConfig.name}'s Winter Arc athletes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
