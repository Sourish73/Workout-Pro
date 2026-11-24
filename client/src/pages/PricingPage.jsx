import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import {
  Crown,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Smartphone,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export const PricingPage = ({ setCurrentView }) => {
  const { isPro } = useAuth();
  const { openProModal } = useWorkout();

  const priceINR = import.meta.env.VITE_SUBSCRIPTION_PRICE_INR || 299;

  const FAQS = [
    {
      q: 'How does the 30-day billing cycle work?',
      a: 'When you purchase IRONPULSE PRO for ₹299, you get full 30-day access to all 7 workout splits (including Wednesday Back, Thursday Arms, and Saturday Legs & Delts), all YouTube technique tutorials, and progressive overload set logging. There are no surprise hidden recurring auto-debits; you can manually renew every 30 days.',
    },
    {
      q: 'Which payment methods are accepted through Razorpay?',
      a: 'We support all major Indian payment rails: UPI (Google Pay, PhonePe, Paytm, BHIM), Indian & International Debit/Credit Cards (Visa, Mastercard, RuPay, Amex), and 50+ Netbanking banks.',
    },
    {
      q: 'What is your Refund & Cancellation Policy?',
      a: 'We offer a transparent 48-hour satisfaction window. If you experience technical defects preventing access to your workout days or incorrect double charges, contact support@ironpulsepro.com with your Razorpay Payment ID for an immediate refund.',
    },
    {
      q: 'Can I access this on both my smartphone and desktop laptop?',
      a: 'Yes! IRONPULSE PRO is engineered with an adaptive dual-device UI. In the gym, use the thumb-reachable mobile interface with large tap targets. At home or at work, access the rich desktop Bento grid layout.',
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 fill-lime" />
            <span>TRANSPARENT INR PRICING</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Invest in Your Physique, Not Gimmicks
          </h1>
          <p className="text-sm sm:text-base text-zinc-subtext max-w-xl mx-auto">
            Get instant, unbreakable access to the battle-tested 7-day hypertrophy programming built by certified biomechanists.
          </p>
        </div>

        {/* Pricing Cards Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* FREE ATHLETE TIER */}
          <div className="rounded-3xl bg-obsidian-card border border-obsidian-border p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-zinc-dim tracking-wider">
                FREE ATHLETE
              </span>
              <div className="flex items-baseline space-x-1 mt-2">
                <span className="text-4xl font-black text-white">₹0</span>
                <span className="text-xs text-zinc-dim font-mono">/ Forever Free</span>
              </div>
              <p className="text-xs text-zinc-subtext mt-2 leading-relaxed">
                Ideal for beginners wanting to experience the training cadence on select lower body and recovery days.
              </p>

              <div className="pt-6 border-t border-obsidian-border/80 space-y-3">
                <div className="flex items-center space-x-2 text-xs text-zinc-text">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Monday — Glutes & Hamstrings Protocol</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-text">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Tuesday — Quads Hypertrophy Split</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-text">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Friday — Active Rest & Hydration Checklist</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-text">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Sunday — Rest, Recovery & Weekly Analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-dim line-through">
                  <X className="w-4 h-4 text-zinc-dim flex-shrink-0" />
                  <span>Wednesday — Back Day (Locked)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-dim line-through">
                  <X className="w-4 h-4 text-zinc-dim flex-shrink-0" />
                  <span>Thursday — Arms Day (Locked)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-dim line-through">
                  <X className="w-4 h-4 text-zinc-dim flex-shrink-0" />
                  <span>Saturday — Legs & Shoulders (Locked)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('workout')}
              className="w-full py-3 rounded-2xl bg-obsidian-elevated hover:bg-obsidian-cardHover border border-obsidian-border text-xs font-bold text-zinc-text hover:text-white transition-all"
            >
              Continue Free Training
            </button>
          </div>

          {/* PRO ATHLETE TIER */}
          <div className="relative rounded-3xl bg-obsidian-card border-2 border-lime shadow-glow-lime p-6 sm:p-8 flex flex-col justify-between space-y-6">
            {/* Top Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-lime text-black font-extrabold text-[10px] font-mono uppercase tracking-wider shadow-glow-lime-sm">
              MOST POPULAR FOR LIFTERS
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-lime fill-lime" />
                <span className="text-xs font-mono uppercase font-bold text-lime tracking-wider">
                  IRONPULSE PRO
                </span>
              </div>

              <div className="flex items-baseline space-x-1 mt-2">
                <span className="text-5xl font-black text-white">₹{priceINR}</span>
                <span className="text-xs text-zinc-dim font-mono">/ 30 Days</span>
              </div>
              <p className="text-xs text-zinc-subtext mt-2 leading-relaxed">
                Full unrestricted 7-day hypertrophy program with YouTube video form cues, set logging, and coach access.
              </p>

              <div className="pt-6 border-t border-obsidian-border/80 space-y-3">
                <div className="flex items-center space-x-2 text-xs text-zinc-text font-semibold">
                  <Check className="w-4 h-4 text-lime flex-shrink-0" />
                  <span>Full 7-Day Complete Split (All 7 Days Unlocked)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-text">
                  <Check className="w-4 h-4 text-lime flex-shrink-0" />
                  <span>Wednesday — V-Taper Back Density</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-text">
                  <Check className="w-4 h-4 text-lime flex-shrink-0" />
                  <span>Thursday — Complete Arms Gun Show</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-text">
                  <Check className="w-4 h-4 text-lime flex-shrink-0" />
                  <span>Saturday — Legs & 3D Deltoids</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-text">
                  <Check className="w-4 h-4 text-lime flex-shrink-0" />
                  <span>All YouTube Video Tutorials & Biomechanical Cues</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-text">
                  <Check className="w-4 h-4 text-lime flex-shrink-0" />
                  <span>Progressive Overload Set Logger & PR Storage</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-zinc-text">
                  <Check className="w-4 h-4 text-lime flex-shrink-0" />
                  <span>1RM, Plate Math & Macro Calculators</span>
                </div>
              </div>
            </div>

            {isPro ? (
              <div className="w-full py-3.5 rounded-2xl bg-lime/20 border border-lime text-lime font-bold text-xs text-center">
                ✓ Active Pro Membership
              </div>
            ) : (
              <button
                onClick={openProModal}
                className="w-full py-3.5 rounded-2xl bg-lime hover:bg-lime-hover text-black font-extrabold text-sm tracking-wide shadow-glow-lime flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>Unlock Full 7-Day Split (₹{priceINR})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Razorpay Trust Badges */}
        <div className="p-4 rounded-2xl bg-obsidian-card border border-obsidian-border flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-dim font-mono">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-lime" />
            <span>256-bit Razorpay Encrypted SSL</span>
          </div>
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-lime" />
            <span>Instant UPI / GPay / PhonePe / Cards</span>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-lime" />
            <span>Official Indian Merchant Receipts</span>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4 pt-4">
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase text-lime font-bold">
              COMMON INQUIRIES
            </span>
            <h3 className="text-2xl font-black text-white mt-1">Frequently Asked Questions</h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-obsidian-card border border-obsidian-border space-y-2"
              >
                <h4 className="text-sm font-bold text-white flex items-start space-x-2">
                  <HelpCircle className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-zinc-subtext leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
