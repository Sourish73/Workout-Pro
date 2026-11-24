import React from 'react';
import { Dumbbell, ShieldCheck, Mail, MapPin, Share2 } from 'lucide-react';
import { authorConfig } from '../config/authorConfig';
import { useWorkout } from '../context/WorkoutContext';

export const Footer = ({ setCurrentView }) => {
  const { copyGuideLink, copyFeedback } = useWorkout();

  return (
    <footer className="w-full bg-obsidian-card border-t border-obsidian-border text-zinc-subtext text-xs mt-16 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-pink-subtle border border-pink-border flex items-center justify-center text-pink-neon">
                <Dumbbell className="w-4 h-4 text-pink-neon" />
              </div>
              <span className="font-extrabold text-base text-white">{authorConfig.name}</span>
            </div>
            <p className="text-xs text-zinc-dim leading-relaxed">
              Complete Winter Arc Guide — 12-week progressive transformation system with 3 levels (Beginner, Intermediate, Advance).
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-pink-rose font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-neon" />
              <span>100% Free Public Guide</span>
            </div>
          </div>

          {/* Training Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Winter Arc Split
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('workout')}
                  className="hover:text-pink-neon transition-colors"
                >
                  Monday — Glutes & Hamstrings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('workout')}
                  className="hover:text-pink-neon transition-colors"
                >
                  Tuesday — Quads
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('workout')}
                  className="hover:text-pink-neon transition-colors"
                >
                  Wednesday — Back (V-Taper)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('workout')}
                  className="hover:text-pink-neon transition-colors"
                >
                  Thursday — Arms
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('workout')}
                  className="hover:text-pink-neon transition-colors"
                >
                  Saturday — Legs & Shoulders
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Information & Terms
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('terms')}
                  className="hover:text-pink-neon transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('privacy')}
                  className="hover:text-pink-neon transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={copyGuideLink}
                  className="hover:text-pink-neon transition-colors flex items-center space-x-1"
                >
                  <Share2 className="w-3 h-3 text-pink-neon" />
                  <span>{copyFeedback ? 'Link Copied!' : 'Share Winter Arc Guide'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (Exact from screenshot!) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Contact & Queries
            </h4>
            <div className="space-y-2 text-xs text-zinc-dim">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-pink-neon" />
                <a
                  href={`mailto:${authorConfig.socials.email}`}
                  className="text-white hover:text-pink-neon transition-colors"
                >
                  {authorConfig.socials.email}
                </a>
              </div>
              <p className="text-[10px] text-zinc-dim pt-1">
                Reach out for program inquiries, form feedback, or exercise guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-obsidian-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-dim">
          <p>© {new Date().getFullYear()} {authorConfig.name} • {authorConfig.programName}</p>
          <p className="max-w-xl text-center sm:text-right">
            Disclaimer: Consult a physician before beginning any strenuous resistance training routine.
          </p>
        </div>
      </div>
    </footer>
  );
};
