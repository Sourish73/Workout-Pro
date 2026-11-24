import React, { useEffect } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { X, Youtube, Compass, Zap, Wind } from 'lucide-react';

export const FormGuideModal = () => {
  const { selectedFormGuide, closeFormGuide } = useWorkout();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeFormGuide();
    };
    if (selectedFormGuide) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedFormGuide, closeFormGuide]);

  if (!selectedFormGuide) return null;

  const { name, category, reps, sets, youtubeVideoId, formCues } = selectedFormGuide;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-obsidian-card border border-pink-border rounded-2xl shadow-glow-pink overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-obsidian-border bg-obsidian-elevated/50">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-pink-subtle text-pink-neon border border-pink-border font-bold">
                {category}
              </span>
              <span className="text-xs text-zinc-dim font-mono">
                {sets} Sets × {reps}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{name}</h3>
          </div>

          <button
            onClick={closeFormGuide}
            className="w-9 h-9 rounded-xl bg-obsidian-card hover:bg-obsidian-border text-zinc-subtext hover:text-white flex items-center justify-center transition-colors border border-obsidian-border"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* Embedded YouTube Player */}
          {youtubeVideoId ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-obsidian-border bg-black shadow-lg">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
                title={`${name} Form Tutorial`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full aspect-video rounded-xl border border-dashed border-obsidian-border flex flex-col items-center justify-center bg-obsidian-elevated text-zinc-dim space-y-2">
              <Youtube className="w-10 h-10 text-pink-hot" />
              <p className="text-xs">Tutorial video is being finalized</p>
            </div>
          )}

          {/* Form Cues */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-pink-rose flex items-center space-x-1.5">
              <span>Biomechanics & Execution Technique</span>
            </h4>

            <div className="grid gap-2.5 sm:grid-cols-3">
              <div className="p-3 rounded-xl bg-obsidian-elevated border border-obsidian-border">
                <div className="flex items-center space-x-1.5 text-white text-xs font-semibold mb-1">
                  <Compass className="w-4 h-4 text-pink-neon" />
                  <span>1. Setup & Stance</span>
                </div>
                <p className="text-xs text-zinc-subtext leading-relaxed">
                  {formCues?.setup || 'Establish stable base of support with neutral spine and core engaged.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian-elevated border border-obsidian-border">
                <div className="flex items-center space-x-1.5 text-white text-xs font-semibold mb-1">
                  <Zap className="w-4 h-4 text-pink-neon" />
                  <span>2. Execution & ROM</span>
                </div>
                <p className="text-xs text-zinc-subtext leading-relaxed">
                  {formCues?.execution || 'Drive through target muscle fibers with a 2–3s controlled eccentric tempo.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian-elevated border border-obsidian-border">
                <div className="flex items-center space-x-1.5 text-white text-xs font-semibold mb-1">
                  <Wind className="w-4 h-4 text-pink-neon" />
                  <span>3. Breathing Rhythm</span>
                </div>
                <p className="text-xs text-zinc-subtext leading-relaxed">
                  {formCues?.breathing || 'Inhale to brace intra-abdominal pressure; exhale through sticking point.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-obsidian-border bg-obsidian-elevated/40 flex justify-end">
          <button
            onClick={closeFormGuide}
            className="px-4 py-2 rounded-xl bg-pink-neon hover:bg-pink-hot text-black font-bold text-xs shadow-glow-pink-sm transition-all"
          >
            Got It, Let's Lift
          </button>
        </div>
      </div>
    </div>
  );
};
