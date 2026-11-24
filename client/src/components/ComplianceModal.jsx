import React from 'react';
import { X, ShieldCheck, FileText, Mail, HelpCircle } from 'lucide-react';

export const ComplianceModal = ({ isOpen, onClose, topic = 'terms' }) => {
  if (!isOpen) return null;

  const contentMap = {
    terms: {
      title: 'Terms of Service & Refund Policy',
      content: (
        <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
          <p>
            Welcome to <strong>Build With Me • My Weekly Gym Split</strong> by Akshita Sahu. By accessing or purchasing this training split, you agree to the following terms:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-zinc-400">
            <li><strong>Digital Product Delivery:</strong> Access to the 7-day workout split and PDF guide is granted immediately upon successful payment verification.</li>
            <li><strong>Personal Use License:</strong> All workout routines, sets, reps, and guidance are licensed exclusively to the purchaser and may not be redistributed or resold.</li>
            <li><strong>Refund Policy:</strong> Because this is an instantly unlocked digital coaching guide and downloadable PDF asset, all transactions through Razorpay are final once access is granted. For payment disputes or double charges, contact Fitwithakshita@gmail.com within 48 hours for immediate resolution.</li>
            <li><strong>Medical Disclaimer:</strong> Consult your physician before initiating any strenuous exercise routine. Participation is at your own risk.</li>
          </ul>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      content: (
        <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
          <p>
            Your privacy is strictly guarded. We adhere to industry-standard data protection guidelines:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-zinc-400">
            <li><strong>Data Collection:</strong> We collect only necessary identifiers (Email address and phone number) to deliver access, transaction receipts, and guide updates.</li>
            <li><strong>Payment Information:</strong> We do not store or process payment card details or UPI PINs. All financial exchanges are processed through Razorpay's PCI-DSS Level 1 certified gateway.</li>
            <li><strong>No Third-Party Sharing:</strong> Your email and contact details will never be sold, rented, or shared with unauthorized third parties.</li>
          </ul>
        </div>
      ),
    },
    about: {
      title: 'About Coach Akshita Sahu',
      content: (
        <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
          <p>
            <strong>Akshita Sahu (@akshitaoffside_)</strong> is a fitness athlete, hypertrophy programmer, and creator of the <em>Build With Me</em> weekly training split.
          </p>
          <p className="text-zinc-400">
            "Build With Me is my personal weekly workout split — the routine I follow to build muscle, get stronger, and work towards my fitness goals. I've structured each training day with specific exercises, sets, and reps so you know exactly what to do when you step into the gym."
          </p>
          <p className="text-[#CCFF00] font-bold">
            Contact: Fitwithakshita@gmail.com • Instagram: @akshitaoffside_
          </p>
        </div>
      ),
    },
    pricing: {
      title: 'Pricing & Membership Details',
      content: (
        <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
          <p>
            <strong>Official Plan Pricing:</strong>
          </p>
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between font-mono">
            <span>One-Time Lifetime Unlock</span>
            <div className="space-x-1.5">
              <span className="line-through text-zinc-500">₹299</span>
              <span className="text-base font-black text-[#CCFF00]">₹49</span>
            </div>
          </div>
          <p className="text-zinc-400">
            Includes all 6 training days (Glutes, Quads, Back, Arms, Legs & Shoulders), active recovery checklist, interactive set tracking, and downloadable colorful PDF guide. Zero recurring monthly surprise charges.
          </p>
        </div>
      ),
    },
    contact: {
      title: 'Contact Support & Inquiries',
      content: (
        <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
          <p>
            For any technical assistance, order receipt lookup, or coaching questions, reach out directly:
          </p>
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#CCFF00]" />
              <a href="mailto:Fitwithakshita@gmail.com" className="hover:underline text-white font-bold">
                Fitwithakshita@gmail.com
              </a>
            </div>
            <p className="text-zinc-400">
              Instagram DM: <a href="https://www.instagram.com/akshitaoffside_?dmpr=MWtiMHAybHhwcGpkMw==" target="_blank" rel="noreferrer" className="text-[#CCFF00] font-bold hover:underline">@akshitaoffside_</a>
            </p>
          </div>
        </div>
      ),
    },
  };

  const activeTopic = contentMap[topic] || contentMap.terms;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md glass-panel-elevated rounded-[28px] overflow-hidden border border-white/10 shadow-2xl p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
            <h3 className="text-sm font-black text-white">{activeTopic.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4">{activeTopic.content}</div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
