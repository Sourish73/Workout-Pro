import React, { useState } from 'react';
import {
  HeartPulse,
  Utensils,
  CheckCircle2,
} from 'lucide-react';

export const SundayAnalytics = ({ checklist = [] }) => {
  const [sorenessScore, setSorenessScore] = useState(4);
  const [sleepScore, setSleepScore] = useState(8);
  const [energyScore, setEnergyScore] = useState(8);

  const DAYS_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const dayVolumes = {
    MONDAY: { volumeKg: 3450, totalSets: 18 },
    TUESDAY: { volumeKg: 4200, totalSets: 16 },
    WEDNESDAY: { volumeKg: 3900, totalSets: 15 },
    THURSDAY: { volumeKg: 2800, totalSets: 24 },
    FRIDAY: { volumeKg: 0, totalSets: 0 },
    SATURDAY: { volumeKg: 4600, totalSets: 20 },
  };

  const totalVolume = Object.values(dayVolumes).reduce((acc, d) => acc + (d.volumeKg || 0), 0);
  const maxDayVolume = Math.max(...DAYS_ORDER.map((d) => dayVolumes[d]?.volumeKg || 0), 1000);

  return (
    <div className="space-y-5">
      {/* Weekly Volume Summary Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-card border border-pink-border/50 shadow-glow-pink-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-pink-neon font-bold">
              Winter Arc Volume Recap
            </span>
            <h3 className="text-xl font-extrabold text-white">
              Monday–Saturday Tonnage Lifted
            </h3>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-3xl font-black font-mono text-white">
              {totalVolume.toLocaleString()}{' '}
              <span className="text-lg text-pink-neon font-bold">KG</span>
            </span>
            <span className="text-[11px] text-zinc-dim block font-mono">
              Total Cumulative Load Moved
            </span>
          </div>
        </div>

        {/* Custom Bar Chart */}
        <div className="pt-4 border-t border-obsidian-border/80">
          <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-44 pb-2">
            {DAYS_ORDER.map((d) => {
              const dayData = dayVolumes[d] || { volumeKg: 0, totalSets: 0 };
              const vol = dayData.volumeKg || 0;
              const heightPercent = Math.max(8, Math.round((vol / maxDayVolume) * 100));

              return (
                <div key={d} className="flex flex-col items-center h-full justify-end group">
                  <span className="text-[10px] font-mono font-bold text-zinc-dim group-hover:text-pink-neon mb-1 transition-colors">
                    {vol > 0 ? `${(vol / 1000).toFixed(1)}k` : '0'}
                  </span>

                  <div className="w-full max-w-[40px] bg-obsidian-elevated rounded-t-lg overflow-hidden border border-obsidian-border relative group-hover:border-pink-border transition-colors">
                    <div
                      className={`w-full transition-all duration-700 rounded-t-lg ${
                        vol > 0
                          ? 'bg-gradient-to-t from-pink-crimson to-pink-neon shadow-glow-pink-sm'
                          : 'bg-zinc-800/40'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-mono font-bold text-zinc-subtext mt-2 uppercase">
                    {d.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Soreness & Readiness Assessment Sliders */}
      <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-card border border-obsidian-border space-y-4">
        <div className="flex items-center space-x-2">
          <HeartPulse className="w-5 h-5 text-pink-neon" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Weekly Recovery & Readiness Check-In
          </h4>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="p-3.5 rounded-xl bg-obsidian-elevated border border-obsidian-border space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-dim font-mono">Muscle Soreness</span>
              <span className="font-mono font-bold text-pink-neon">{sorenessScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={sorenessScore}
              onChange={(e) => setSorenessScore(Number(e.target.value))}
              className="w-full accent-pink-neon"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-elevated border border-obsidian-border space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-dim font-mono">Sleep Quality</span>
              <span className="font-mono font-bold text-pink-neon">{sleepScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={sleepScore}
              onChange={(e) => setSleepScore(Number(e.target.value))}
              className="w-full accent-pink-neon"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-obsidian-elevated border border-obsidian-border space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-dim font-mono">CNS Drive</span>
              <span className="font-mono font-bold text-pink-neon">{energyScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energyScore}
              onChange={(e) => setEnergyScore(Number(e.target.value))}
              className="w-full accent-pink-neon"
            />
          </div>
        </div>
      </div>

      {/* High-Protein Meal Prep Protocols */}
      <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-card border border-obsidian-border space-y-3">
        <div className="flex items-center space-x-2">
          <Utensils className="w-5 h-5 text-pink-neon" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Sunday Nutrition & Meal Prep Strategy
          </h4>
        </div>

        <div className="space-y-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-obsidian-elevated border border-obsidian-border flex items-start space-x-3"
            >
              <CheckCircle2 className="w-4 h-4 text-pink-neon flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center space-x-2">
                  <h5 className="text-xs font-bold text-white">{item.title}</h5>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-obsidian-card text-zinc-subtext border border-obsidian-border">
                    {item.target}
                  </span>
                </div>
                <p className="text-xs text-zinc-subtext mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
