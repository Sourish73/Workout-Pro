import React from 'react';
import {
  X,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import {
  GPayLogo,
  PhonePeLogo,
  PaytmLogo,
  BhimLogo,
  VisaLogo,
  MastercardLogo,
  RuPayLogo,
} from './PaymentLogos';

export const LockedResourceModal = ({
  isOpen,
  onClose,
  onUnlockClick,
  onSignInClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white text-stone-900 rounded-[32px] shadow-2xl p-6 sm:p-8 border border-[#EADBCC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-black">
              EXCLUSIVE LOCKED RESOURCE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-950 mt-1">
              My Weekly Gym Split
            </h3>
            <p className="text-xs text-stone-500 font-semibold mt-0.5">
              Build With Me • 6 Structured Days • Official PDF Guide
            </p>
          </div>
        </div>

        {/* What this resource includes */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#EADBCC] space-y-2.5 mb-5 text-xs text-stone-700">
          <span className="font-mono uppercase font-black text-stone-900 block text-[11px] tracking-wider">
            LOCKED CONTENT INCLUDES:
          </span>
          <div className="space-y-1.5 font-bold">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              <span>6 structured training days</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              <span>Glute & hamstring focused training</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              <span>Quad-focused workouts</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              <span>Back, arms & forearms training</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              <span>Legs & shoulders</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              <span>Rest & recovery days</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
              <span>Exercises, sets, reps & intensity guidance</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-100 font-mono text-xs">
            <span className="text-stone-600 font-bold">One-Time Instant Unlock:</span>
            <div className="space-x-2">
              <span className="line-through text-stone-400">₹299</span>
              <span className="text-lg font-black text-stone-950">₹49</span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onUnlockClick();
            }}
            className="w-full py-3.5 rounded-2xl bg-[#1C1917] hover:bg-stone-800 text-white font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-white text-white" />
            <span>Pay ₹49 & Unlock Instantly</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Payment Methods Trust Bar */}
          <div className="pt-2 border-t border-stone-200">
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block text-center mb-2 font-bold">
              ACCEPTED VIA RAZORPAY SECURE
            </span>
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              <div className="px-2 py-1 rounded-lg bg-stone-100 flex items-center">
                <GPayLogo className="w-4 h-4" />
              </div>
              <div className="px-2 py-1 rounded-lg bg-[#5F259F] flex items-center">
                <PhonePeLogo className="w-4 h-4" />
              </div>
              <div className="px-2 py-1 rounded-lg bg-white border border-stone-200 flex items-center">
                <PaytmLogo className="w-6 h-3" />
              </div>
              <div className="px-2 py-1 rounded-lg bg-stone-100 flex items-center">
                <BhimLogo className="w-4 h-4" />
              </div>
              <div className="px-2 py-1 rounded-lg bg-white border border-stone-200 flex items-center">
                <VisaLogo className="w-6 h-3" />
              </div>
              <div className="px-2 py-1 rounded-lg bg-white border border-stone-200 flex items-center">
                <MastercardLogo className="w-5 h-3" />
              </div>
              <div className="px-2 py-1 rounded-lg bg-white border border-stone-200 flex items-center">
                <RuPayLogo className="w-7 h-3" />
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-stone-500 pt-1">
            Already made a payment on this page?{' '}
            <button
              onClick={() => {
                onClose();
                onSignInClick();
              }}
              className="text-blue-600 hover:underline font-bold"
            >
              Sign In to unlock
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
