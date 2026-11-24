import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import {
  Crown,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  CreditCard,
  Smartphone,
} from 'lucide-react';
import { API_BASE } from '../config/api';

export const ProUpgradeModal = () => {
  const { user, token, isPro, refreshUser, openAuthModal } = useAuth();
  const {
    isProModalOpen,
    closeProModal,
    triggerConfetti,
    fetchWeeklyOverview,
    fetchWorkout,
    activeDay,
  } = useWorkout();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isProModalOpen) return null;

  const priceINR = import.meta.env.VITE_SUBSCRIPTION_PRICE_INR || 299;
  const brandName = import.meta.env.VITE_APP_NAME || 'IRONPULSE PRO';

  // Core Razorpay Checkout Flow
  const handleInitiatePayment = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    // If not logged in, prompt user to login first, then auto-trigger checkout
    if (!user || !token) {
      closeProModal();
      openAuthModal('signup', () => {
        // Callback after signup/login
        setTimeout(() => {
          handleInitiatePayment();
        }, 500);
      });
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create order on backend
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.message || 'Failed to create payment order');
      }

      // Check if window.Razorpay is available
      if (typeof window.Razorpay === 'undefined') {
        // If razorpay script blocked or offline, handle gracefully
        if (orderData.isMockMode) {
          await verifyPaymentSuccess({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_dev_${Date.now()}`,
            is_mock_success: true,
          });
          return;
        }
        throw new Error('Razorpay SDK could not be loaded. Please check internet connection.');
      }

      // Standard Razorpay Checkout Options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: brandName,
        description: 'IRONPULSE PRO 30-Day Full Split Access',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop',
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            await verifyPaymentSuccess(response);
          } catch (err) {
            setErrorMessage(err.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: user.name || '',
          email: user.email || '',
          contact: '',
        },
        notes: {
          plan: 'PRO_MONTHLY',
          userId: user.id,
        },
        theme: {
          color: '#CCFF00',
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp) {
          setErrorMessage(resp.error?.description || 'Payment was declined or cancelled.');
          setIsLoading(false);
        });
        rzp.open();
      } catch (sdkError) {
        // If test placeholder keys cause Razorpay to reject invalid key format in checkout
        if (orderData.isMockMode) {
          console.warn('Sandbox mode: simulating payment verification since placeholder key was used.');
          await verifyPaymentSuccess({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_dev_${Date.now()}`,
            is_mock_success: true,
          });
        } else {
          throw sdkError;
        }
      }
    } catch (err) {
      console.error('[Payment Flow Error]', err);
      setErrorMessage(err.message || 'An error occurred while launching payment.');
      setIsLoading(false);
    }
  };

  // 2. Verify signature on backend
  const verifyPaymentSuccess = async (paymentPayload) => {
    try {
      const verifyRes = await fetch(`${API_BASE}/payment/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentPayload),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.message || 'Payment verification failed on server.');
      }

      // Success! Update auth user, refresh workout state, and fire confetti
      await refreshUser();
      await fetchWeeklyOverview();
      await fetchWorkout(activeDay);

      setSuccessMessage('🎉 Payment Verified! Pro status is now active for 30 days.');
      triggerConfetti();

      setTimeout(() => {
        closeProModal();
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-obsidian-card border border-lime/30 rounded-3xl shadow-glow-lime overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lime via-yellow-300 to-lime" />

        {/* Modal Close Button */}
        <button
          onClick={closeProModal}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-obsidian-elevated hover:bg-obsidian-border text-zinc-dim hover:text-white flex items-center justify-center transition-colors border border-obsidian-border"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 space-y-6">
          {/* Header */}
          <div className="text-center pt-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-mono font-bold tracking-wider mb-3">
              <Crown className="w-3.5 h-3.5 fill-lime" />
              <span>ELITE ATHLETE UNLOCK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Unlock Full 7-Day Protocol
            </h2>
            <p className="text-sm text-zinc-subtext mt-1.5 max-w-md mx-auto">
              Get unrestricted access to Wednesday (Back), Thursday (Arms), and Saturday (Legs & Delts) with complete biomechanics cues.
            </p>
          </div>

          {/* Pricing Highlight Pill */}
          <div className="p-4 rounded-2xl bg-obsidian-elevated border border-lime/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-lime font-bold">
                PRO MONTHLY MEMBERSHIP
              </span>
              <div className="flex items-baseline space-x-1 mt-0.5">
                <span className="text-3xl font-black text-white">₹{priceINR}</span>
                <span className="text-xs text-zinc-dim font-mono">/ 30 Days</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-dim block font-mono">ONE-TIME CHARGE</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center justify-end space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Instant Activation</span>
              </span>
            </div>
          </div>

          {/* Side-by-side Free vs Pro comparison */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Free Tier */}
            <div className="p-3.5 rounded-xl bg-obsidian-elevated/40 border border-obsidian-border space-y-2.5">
              <div className="font-mono font-bold text-zinc-dim uppercase tracking-wider">
                FREE ATHLETE
              </div>
              <ul className="space-y-2 text-zinc-subtext">
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-zinc-dim" />
                  <span>Monday Glutes & Hams</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-zinc-dim" />
                  <span>Tuesday Quads</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-zinc-dim" />
                  <span>Friday Active Recovery</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-zinc-dim" />
                  <span>Sunday Analytics</span>
                </li>
                <li className="flex items-center space-x-1.5 text-zinc-dim line-through">
                  <X className="w-3.5 h-3.5 text-zinc-dim" />
                  <span>Wednesday Back Split</span>
                </li>
                <li className="flex items-center space-x-1.5 text-zinc-dim line-through">
                  <X className="w-3.5 h-3.5 text-zinc-dim" />
                  <span>Thursday Arms Split</span>
                </li>
                <li className="flex items-center space-x-1.5 text-zinc-dim line-through">
                  <X className="w-3.5 h-3.5 text-zinc-dim" />
                  <span>Saturday Legs & Shoulders</span>
                </li>
              </ul>
            </div>

            {/* Pro Tier */}
            <div className="p-3.5 rounded-xl bg-lime/5 border border-lime/40 space-y-2.5 shadow-glow-lime-sm">
              <div className="font-mono font-bold text-lime uppercase tracking-wider flex items-center space-x-1">
                <Crown className="w-3 h-3 fill-lime" />
                <span>IRONPULSE PRO</span>
              </div>
              <ul className="space-y-2 text-zinc-text font-medium">
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-lime" />
                  <span>Full 7-Day Complete Split</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-lime" />
                  <span>Wednesday Back Hypertrophy</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-lime" />
                  <span>Thursday Arm Specialization</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-lime" />
                  <span>Saturday Legs & 3D Delts</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-lime" />
                  <span>All YouTube Video Tutorials</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-lime" />
                  <span>Persistent Overload Set Logger</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-lime" />
                  <span>Priority Coach WhatsApp Access</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Supported Indian Payment Rails */}
          <div className="pt-1">
            <p className="text-[11px] text-zinc-dim font-mono uppercase tracking-wider text-center mb-2">
              Supported Razorpay Payment Methods
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-subtext">
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-elevated border border-obsidian-border flex items-center space-x-1">
                <Smartphone className="w-3.5 h-3.5 text-lime" />
                <span>UPI (GPay / PhonePe / Paytm)</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-elevated border border-obsidian-border flex items-center space-x-1">
                <CreditCard className="w-3.5 h-3.5 text-lime" />
                <span>Debit / Credit Cards</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-obsidian-elevated border border-obsidian-border">
                Netbanking
              </span>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-lime/10 border border-lime/40 text-lime text-xs font-bold text-center">
              {successMessage}
            </div>
          )}

          {/* Action CTA */}
          <button
            onClick={handleInitiatePayment}
            disabled={isLoading || Boolean(successMessage)}
            className="w-full py-3.5 rounded-2xl bg-lime hover:bg-lime-hover text-black font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center space-x-2 shadow-glow-lime transition-all active:scale-98 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Connecting Razorpay Gateway...</span>
              </div>
            ) : successMessage ? (
              <span>Unlocked!</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5 fill-black" />
                <span>Pay ₹{priceINR} & Unlock 30-Day Pro Access</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[10px] text-zinc-dim text-center">
            Secured by 256-bit Razorpay encryption. No recurring auto-debit surprise; 30-day term with transparent renewal.
          </p>
        </div>
      </div>
    </div>
  );
};
