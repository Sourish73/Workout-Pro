import React, { useState } from 'react';
import { X, ShieldCheck, Mail, ExternalLink, FileText, ArrowRight } from 'lucide-react';

export const RazorpayComplianceModal = ({ isOpen, onClose, initialTab = 'terms' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#16161D] text-zinc-100 rounded-[28px] shadow-2xl border border-white/10 flex flex-col max-h-[88vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Legal & Razorpay Compliance Policies
              </h3>
              <p className="text-[11px] font-mono text-zinc-400">
                Akshita Sahu • Build With Me • Official Merchant Policies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center space-x-1 p-2 bg-black/40 border-b border-white/10 overflow-x-auto no-scrollbar text-xs font-bold">
          {[
            { id: 'terms', label: 'Terms & Conditions' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'refund', label: 'Refund & Cancellation' },
            { id: 'shipping', label: 'Delivery & Pricing' },
            { id: 'contact', label: 'Contact Us' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white/15 text-white shadow-sm border border-white/10'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          {activeTab === 'terms' && (
            <div className="space-y-3.5">
              <h4 className="text-base font-black text-white">Terms & Conditions</h4>
              <p className="text-xs text-zinc-400">Last updated: 2026</p>
              <p>
                Welcome to <strong>Build With Me • My Weekly Gym Split</strong> created and managed by <strong>Akshita Sahu</strong> (@akshitaoffside_). By accessing this website or purchasing our digital workout protocol, you agree to comply with and be bound by the following terms.
              </p>
              <div className="space-y-2 pt-1">
                <p><strong>1. Nature of Product:</strong> The product sold on this storefront is a digital personal fitness guide and 7-day workout routine protocol. It includes downloadable PDF documentation and lifetime online schedule access.</p>
                <p><strong>2. Personal Use Only:</strong> All materials, exercise regimens, and routines are protected intellectual property of Akshita Sahu. Purchases grant single-user, non-transferable access for personal non-commercial fitness use.</p>
                <p><strong>3. Health & Medical Disclaimer:</strong> The workouts provided are based on personal fitness practice. Before beginning any intense physical exercise program, please consult a qualified healthcare or medical professional.</p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3.5">
              <h4 className="text-base font-black text-white">Privacy Policy</h4>
              <p className="text-xs text-zinc-400">Last updated: 2026</p>
              <p>
                Your privacy is of paramount importance to us. This policy describes how we collect, use, and protect your information when purchasing our workout split.
              </p>
              <div className="space-y-2 pt-1">
                <p><strong>1. Information Collected:</strong> We collect your full name, email address, and contact number purely for order fulfillment, account authentication, and sending your digital access receipt.</p>
                <p><strong>2. Payment Security:</strong> We do not store, process, or view your credit card, debit card, or UPI PIN numbers. All payment transactions are securely handled by <strong>Razorpay (Razorpay Software Private Limited)</strong>, an RBI-licensed, 256-bit SSL encrypted Payment Aggregator compliant with PCI-DSS standards.</p>
                <p><strong>3. Data Sharing:</strong> We never sell, rent, or trade your personal data to third-party marketing companies.</p>
              </div>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-3.5">
              <h4 className="text-base font-black text-white">Refund & Cancellation Policy</h4>
              <p className="text-xs text-zinc-400">Last updated: 2026</p>
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-zinc-200">
                <p className="font-bold text-amber-300">Digital Product Instant Delivery Notice:</p>
                <p className="mt-1">
                  Because "My Weekly Gym Split" is an irrevocable digital product delivered instantly upon successful payment, standard returns are not applicable once the content is unlocked and downloaded.
                </p>
              </div>
              <div className="space-y-2 pt-1">
                <p><strong>1. Accidental Duplicate Transactions:</strong> If your bank account or UPI was charged more than once for the same order due to a network glitch, contact us at <strong>Fitwithakshita@gmail.com</strong> with your Razorpay Payment ID. Full duplicate amounts will be refunded within 5 to 7 working days to the original payment source.</p>
                <p><strong>2. Technical Delivery Issues:</strong> If you completed payment but experienced any difficulty viewing the schedule or downloading the PDF, our team will manually verify and email you the full resources within 24 hours.</p>
                <p><strong>3. Cancellation:</strong> Since orders are executed and delivered digitally in real time, cancellations cannot be processed post-delivery.</p>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3.5">
              <h4 className="text-base font-black text-white">Pricing, Shipping & Delivery Policy</h4>
              <p className="text-xs text-zinc-400">Last updated: 2026</p>
              <div className="space-y-2 pt-1">
                <p><strong>1. Pricing:</strong> The price for "My Weekly Gym Split (Build With Me Protocol)" is fixed at <strong>₹49 INR (inclusive of all applicable taxes)</strong> with no hidden recurring subscription charges.</p>
                <p><strong>2. Shipping & Delivery:</strong> As this is a 100% digital workout guide and web protocol, no physical parcel is shipped. Delivery occurs <strong>instantaneously</strong> via screen unlock, automatic account sync, and immediate one-click PDF download upon verified payment.</p>
                <p><strong>3. Access Duration:</strong> Lifetime access to the routine schedule and downloadable resources for the registered email address.</p>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-3.5">
              <h4 className="text-base font-black text-white">Contact & Support Details</h4>
              <p className="text-xs text-zinc-400">Official Creator Contact for Razorpay & Customer Queries</p>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#CCFF00]/15 text-[#CCFF00] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold block">Support Email</span>
                    <a href="mailto:Fitwithakshita@gmail.com" className="font-bold text-white hover:underline">
                      Fitwithakshita@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/15 text-pink-400 flex items-center justify-center">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold block">Official Instagram</span>
                    <a
                      href="https://www.instagram.com/akshitaoffside_?dmpr=MWtiMHAybHhwcGpkMw=="
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-[#CCFF00] hover:underline"
                    >
                      @akshitaoffside_ (Akshita Sahu)
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 text-xs text-zinc-400">
                  <p>Operating Hours: Monday to Saturday, 10:00 AM – 7:00 PM IST</p>
                  <p>Expected Response Time: Within 24 hours</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-zinc-500 font-mono text-[11px]">
            Compliant with Razorpay Merchant Guidelines
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
