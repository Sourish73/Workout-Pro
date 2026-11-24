import React from 'react';
import { X, Play, Dumbbell, ShieldCheck, Flame, Check } from 'lucide-react';

export const WatchFormModal = ({ isOpen, onClose, exerciseName }) => {
  if (!isOpen) return null;

  const exerciseTips = {
    'Hip Abduction': [
      'Hinge forward slightly at the hips (30-45 degrees) to isolate the glute medius and upper glute shelf.',
      'Pause at full abduction for 1 full second; avoid letting the weight plates slam at the bottom.',
      'Control the 3-second eccentric return for maximal muscle damage.'
    ],
    'Hip Thrust': [
      'Position bench directly below scapulae/shoulder blades.',
      'Keep chin tucked into your chest and ribs locked down to prevent lower back hyperextension.',
      'Drive forcefully through your heels to achieve complete horizontal hip lockout.'
    ],
    'Sumo Squats': [
      'Set stance 1.5x shoulder width with toes flared out 35 to 45 degrees.',
      'Push knees outward in line with your second toe throughout descent.',
      'Descend until thighs are parallel to floor; drive up through mid-foot.'
    ],
    'Romanian Deadlift (RDL)': [
      'Maintain soft knees; initiate movement by pushing hips straight back toward the rear wall.',
      'Keep dumbbells/barbell skimming against your shins with lats packed tight.',
      'Stop when hips can no longer travel backward (usually mid-shin level).'
    ],
    'Lying Leg Curl': [
      'Keep your hip bones pressed firmly into the bench pad to prevent pelvic tilting.',
      'Curl heel to glutes explosively, then perform a strict 3-second negative descent.',
      'Do not allow weights to touch bottom between reps to keep continuous hamstring tension.'
    ],
    'Calf Raises': [
      'Drop heels into the absolute deepest comfortable stretch and pause for 2 full seconds.',
      'Explode upward onto the balls of your big toes, squeezing calf peaks.',
      'Avoid bouncing or using Achilles tendon recoil to move the weight.'
    ],
    'Lat Pulldown': [
      'Grip slightly wider than shoulder width; depress scapulae down before pulling.',
      'Drive elbows down and back into your imaginary side pockets.',
      'Lean back no more than 10-15 degrees; avoid excessive rocking.'
    ],
  };

  const currentTips = exerciseTips[exerciseName] || [
    'Maintain a braced core throughout all repetitions.',
    'Focus on a controlled 3-second eccentric (lowering) phase.',
    'Achieve full range of motion without sacrificing spinal alignment.'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg glass-panel-elevated rounded-[28px] overflow-hidden border border-white/10 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#CCFF00]/15 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00]">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#CCFF00] font-black">
                FORM GUIDE & TUTORIAL
              </span>
              <h3 className="text-base sm:text-lg font-black text-white">
                {exerciseName || 'Exercise Movement'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video / Visual Simulation Box */}
        <div className="p-5 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-950 border border-white/10 flex items-center justify-center group shadow-inner">
            {/* Visual Grid & Gradient */}
            <div className="absolute inset-0 bg-radial from-[#CCFF00]/10 via-transparent to-black pointer-events-none" />
            
            <div className="text-center p-4 z-10 space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#CCFF00] text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(204,255,0,0.4)] group-hover:scale-105 transition-transform cursor-pointer">
                <Play className="w-6 h-6 fill-black ml-1" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wide">
                  Visual Demonstration & Cadence
                </p>
                <p className="text-[11px] font-mono text-zinc-400">
                  Target Tempo: 3-0-1-1 (Eccentric-Pause-Concentric-Squeeze)
                </p>
              </div>
            </div>
          </div>

          {/* Biomechanical Cues */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#CCFF00] flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>KEY COACHING CUES (BY AKSHITA SAHU):</span>
            </h4>
            <div className="space-y-2 text-xs text-zinc-300">
              {currentTips.map((tip, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="w-5 h-5 rounded-lg bg-[#CCFF00]/20 text-[#CCFF00] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-extrabold transition-all"
          >
            Got It • Back to Workout
          </button>
        </div>
      </div>
    </div>
  );
};
