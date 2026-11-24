import React from 'react';
import {
  X,
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
  Printer,
  Check,
} from 'lucide-react';
import {
  downloadWeeklyGymSplitPdf,
  printWeeklyGymSplit,
} from '../utils/generatePdf';

export const UnlockedResourceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white text-stone-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#EADBCC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-stone-200 bg-gradient-to-r from-[#FAF8F5] to-white">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-700 shadow-xs">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black">
                  UNLOCKED OFFICIAL GUIDE
                </span>
                <span className="text-xs text-stone-500 font-semibold">• Colorful PDF Edition</span>
              </div>
              <h3 className="text-lg font-black text-stone-950 mt-0.5">
                My Weekly Gym Split (Build With Me Protocol)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-sm text-stone-700">
          {/* Creator Attribution */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EADBCC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#1C1917] text-white font-black text-xs flex items-center justify-center shadow-xs">
                AS
              </div>
              <div>
                <p className="text-[11px] text-stone-500 font-mono">Program Creator</p>
                <h4 className="text-sm font-extrabold text-stone-950">Akshita Sahu</h4>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="https://www.instagram.com/akshitaoffside_?dmpr=MWtiMHAybHhwcGpkMw=="
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-rose-600 hover:underline flex items-center space-x-1"
              >
                <span>@akshitaoffside_</span>
              </a>
              <span className="text-stone-300">•</span>
              <a
                href="mailto:Fitwithakshita@gmail.com"
                className="text-xs font-mono font-semibold text-stone-700 hover:underline"
              >
                Fitwithakshita@gmail.com
              </a>
            </div>
          </div>

          {/* Resource Contents Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-black uppercase tracking-wider text-stone-950 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>OFFICIAL RESOURCE CONTENTS (UNLOCKED)</span>
              </h4>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                ✓ Full Access Active
              </span>
            </div>

            <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200/90 space-y-3">
              <p className="text-xs font-medium text-stone-700">
                The complete weekly workout split is compiled into a high-contrast, colorful PDF with bullet points, structured sets, reps, and form guidance:
              </p>
              <div className="grid gap-2.5 text-xs font-bold text-stone-800">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>6 structured training days</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>Glute & hamstring focused training</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>Quad-focused workouts</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>Back, arms & forearms training</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>Legs & shoulders</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>Rest & recovery days</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>Exercises, sets, reps & intensity guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Colorful PDF Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-stone-500 font-mono">
            Format: Official PDF Document (.pdf)
          </span>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={downloadWeeklyGymSplitPdf}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-[#1C1917] hover:bg-stone-800 text-white font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download Colorful PDF (.pdf)</span>
            </button>

            <button
              onClick={printWeeklyGymSplit}
              className="px-4 py-2.5 rounded-2xl border border-stone-300 hover:bg-white text-stone-800 font-bold text-xs flex items-center space-x-1.5 transition-all active:scale-95 shadow-xs"
              title="Print or Save with Browser PDF Engine"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-2xl border border-stone-200 hover:bg-stone-100 text-stone-600 font-semibold text-xs transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
