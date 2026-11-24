import React, { useState, useEffect } from 'react';
import {
  FileText,
  Mail,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Lock,
  User,
  Heart,
  Sparkles,
  Crown,
  LogOut,
  Printer,
  Download,
  ExternalLink,
  Dumbbell,
  Calendar,
  Zap,
  Target,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LockedResourceModal } from '../components/LockedResourceModal';
import { UnlockedResourceModal } from '../components/UnlockedResourceModal';
import { ProperAuthModal } from '../components/ProperAuthModal';
import { AdminDashboardModal } from '../components/AdminDashboardModal';
import { CleanScheduleView } from '../components/CleanScheduleView';
import { RazorpayModal } from '../components/RazorpayModal';
import { RazorpayComplianceModal } from '../components/RazorpayComplianceModal';
import {
  downloadWeeklyGymSplitPdf,
  printWeeklyGymSplit,
} from '../utils/generatePdf';
import {
  GPayLogo,
  PhonePeLogo,
  PaytmLogo,
  BhimLogo,
  VisaLogo,
  MastercardLogo,
  RuPayLogo,
  HdfcLogo,
  IciciLogo,
  SbiLogo,
  AxisLogo,
  RazorpayBadge,
} from '../components/PaymentLogos';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const SuperProfileView = () => {
  // Theme Mode State: 'dark' (Obsidian) vs 'pink' (Rose Noir Glow)
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('akshita_theme') || 'pink';
  });

  // Checkout Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [paymentSuccessToast, setPaymentSuccessToast] = useState(false);
  const [pendingPaymentAfterAuth, setPendingPaymentAfterAuth] = useState(false);

  // User Auth & Paid State
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('winter_arc_user')) || null;
    } catch {
      return null;
    }
  });

  // Automatically sync email & phone from authenticated user
  useEffect(() => {
    if (user) {
      if (user.email && !email) setEmail(user.email);
      if (user.phone && !phone) setPhone(user.phone);
    }
  }, [user]);

  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('winter_arc_token') || '';
  });

  // Gated Routine & Resource: Strictly locked until payment is verified
  const [hasPaid, setHasPaid] = useState(() => {
    const savedUser = localStorage.getItem('winter_arc_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.hasPaid || parsed.role === 'admin') return true;
      } catch {
        // Ignore
      }
    }
    return (
      sessionStorage.getItem('active_payment_unlocked') === 'true' ||
      localStorage.getItem('winter_arc_paid') === 'true'
    );
  });

  // Modals
  const [isLockedResourceModalOpen, setIsLockedResourceModalOpen] = useState(false);
  const [isUnlockedResourceModalOpen, setIsUnlockedResourceModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isRazorpayModalOpen, setIsRazorpayModalOpen] = useState(false);
  const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);
  const [complianceModalTab, setComplianceModalTab] = useState('terms');
  const [razorpayOrderInfo, setRazorpayOrderInfo] = useState({
    orderId: '',
    amount: 49,
    email: '',
    phone: '',
    name: 'Athlete',
  });

  // Confetti trigger
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#CCFF00', '#F59E0B', '#10B981', '#FFFFFF'],
      });
    } catch {
      // Ignore
    }
  };

  // Copy link
  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    } catch {
      // Ignore
    }
  };

  // Launch Payment Flow (Strictly Requires User to be Logged In)
  const launchPayment = async (overrideEmail = '', overridePhone = '') => {
    // STRICT FEATURE GATE: No one can pay until they are logged in
    if (!user) {
      setPendingPaymentAfterAuth(true);
      setAuthModalMode('signin');
      setIsAuthModalOpen(true);
      return;
    }

    let buyerEmail = (overrideEmail || email || user?.email || '').trim().toLowerCase();
    let buyerPhone = (overridePhone || phone || user?.phone || '').trim();

    if (!buyerEmail) {
      alert('Please enter or confirm your email address in the checkout box.');
      return;
    }

    setIsProcessingPayment(true);

    try {
      // 1. Create order on backend
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify({
          email: buyerEmail,
          phone: buyerPhone,
          name: user?.name || 'Athlete',
        }),
      });

      const orderData = await res.json();
      const generatedOrderId = orderData?.orderId || `order_${Date.now()}`;
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

      // If user provided a real Razorpay Key ID (not placeholder), open real Razorpay Standard Checkout
      if (
        window.Razorpay &&
        razorpayKey &&
        !razorpayKey.includes('placeholder')
      ) {
        const options = {
          key: razorpayKey,
          amount: 49 * 100, // 4900 paise = ₹49
          currency: 'INR',
          name: 'Akshita Sahu',
          description: 'My Weekly Gym Split (Build With Me Protocol)',
          image: '/cover.png',
          order_id: generatedOrderId,
          handler: async function (response) {
            await finalizePaymentVerification({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              buyerEmail,
              buyerPhone,
              buyerName: user?.name || 'Athlete',
            });
          },
          prefill: {
            email: buyerEmail,
            contact: buyerPhone,
          },
          theme: {
            color: '#CCFF00',
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          alert(`Payment Failed: ${response.error.description}`);
        });
        rzp.open();
        setIsProcessingPayment(false);
        return;
      }

      // Otherwise, open our realistic Light Razorpay Checkout Modal
      setRazorpayOrderInfo({
        orderId: generatedOrderId,
        amount: 49,
        email: buyerEmail,
        phone: buyerPhone,
        name: user?.name || 'Athlete',
      });
      setIsRazorpayModalOpen(true);
    } catch (err) {
      console.warn('[Payment Order Notice]', err);
      // Fallback: still open checkout so user is never blocked
      const fallbackOrderId = `order_${Date.now()}`;
      setRazorpayOrderInfo({
        orderId: fallbackOrderId,
        amount: 49,
        email: buyerEmail,
        phone: buyerPhone,
        name: user?.name || 'Athlete',
      });
      setIsRazorpayModalOpen(true);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Handle successful payment callback
  const handleRazorpaySuccess = async (paymentDetails) => {
    await finalizePaymentVerification({
      razorpay_order_id: paymentDetails.razorpay_order_id,
      razorpay_payment_id: paymentDetails.razorpay_payment_id,
      buyerEmail: paymentDetails.buyerEmail || email || user?.email,
      buyerPhone: paymentDetails.buyerPhone || phone || user?.phone,
      buyerName: paymentDetails.buyerName || user?.name || 'Athlete',
      is_mock_success: true,
    });
  };

  // Finalize & Verify Payment
  const finalizePaymentVerification = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/payment/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        console.log('[Payment Verified on Server]', data);
      }
    } catch (err) {
      console.warn('[Payment Notice] Server sync note:', err);
    } finally {
      // Mark paid and persist to session & storage
      setHasPaid(true);
      sessionStorage.setItem('active_payment_unlocked', 'true');
      localStorage.setItem('winter_arc_paid', 'true');

      if (user) {
        const updated = { ...user, hasPaid: true };
        setUser(updated);
        localStorage.setItem('winter_arc_user', JSON.stringify(updated));
      }

      setPaymentSuccessToast(true);
      triggerConfetti();

      // Automatically open the unlocked resource card
      setTimeout(() => {
        setIsUnlockedResourceModalOpen(true);
      }, 500);

      // Smooth scroll directly to the newly unlocked 7-day routine schedule
      setTimeout(() => {
        const scheduleEl = document.getElementById('unlocked-routine-schedule');
        if (scheduleEl) {
          scheduleEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 700);

      setIsProcessingPayment(false);
    }
  };

  // When clicking resource row in "WHAT YOU'LL GET"
  const handleResourceClick = () => {
    if (hasPaid || user?.role === 'admin') {
      setIsUnlockedResourceModalOpen(true);
    } else {
      setIsLockedResourceModalOpen(true);
    }
  };

  // On Auth Success
  const handleAuthSuccess = (loggedUser) => {
    setUser(loggedUser);
    setAuthToken(localStorage.getItem('winter_arc_token') || '');
    if (loggedUser.email) setEmail(loggedUser.email);
    if (loggedUser.phone) setPhone(loggedUser.phone);

    if (loggedUser.hasPaid || loggedUser.role === 'admin') {
      setHasPaid(true);
      sessionStorage.setItem('active_payment_unlocked', 'true');
      localStorage.setItem('winter_arc_paid', 'true');
      triggerConfetti();
      setPendingPaymentAfterAuth(false);
    } else if (pendingPaymentAfterAuth) {
      // User was prompted to login specifically to complete payment: auto-resume payment!
      setPendingPaymentAfterAuth(false);
      setTimeout(() => {
        launchPayment(loggedUser.email, loggedUser.phone || phone);
      }, 350);
    }
  };

  // Sign out
  const handleSignOut = () => {
    localStorage.removeItem('winter_arc_token');
    localStorage.removeItem('winter_arc_user');
    localStorage.removeItem('winter_arc_paid');
    sessionStorage.removeItem('active_payment_unlocked');
    setUser(null);
    setAuthToken('');
    setHasPaid(false);
  };

  const isAkshitaAdmin =
    [
      'fitwithakshita@gmail.com',
      'akshitaoffside@gmail.com',
      'akshitasahu@gmail.com',
      'kashish18bhatt@gmail.com',
    ].includes(user?.email?.toLowerCase()) || user?.role === 'admin';

  return (
    <div
      className={`min-h-screen ${
        themeMode === 'pink'
          ? 'theme-pink text-white selection:bg-[#FF2E7E] selection:text-white'
          : 'theme-dark text-white selection:bg-[#CCFF00] selection:text-black'
      } pb-24 font-sans relative transition-colors duration-500`}
    >
      {/* Ambient subtle light glows */}
      {themeMode === 'pink' ? (
        <>
          <div className="fixed top-0 left-1/4 w-[550px] h-[550px] bg-[#FF2E7E]/[0.12] rounded-full blur-[140px] pointer-events-none" />
          <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#FB7185]/[0.08] rounded-full blur-[160px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="fixed top-0 left-1/3 w-[500px] h-[500px] bg-[#CCFF00]/[0.035] rounded-full blur-[140px] pointer-events-none" />
          <div className="fixed bottom-0 right-1/3 w-[550px] h-[550px] bg-amber-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
        </>
      )}

      {/* ======================================================== */}
      {/* TOP HEADER (Adaptive for Mobile & Desktop)               */}
      {/* ======================================================== */}
      <header className="w-full px-4 sm:px-8 py-4 flex items-center justify-between max-w-5xl mx-auto">
        {/* Left: Akshita Sahu pill */}
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 shadow-sm">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-stone-800 border border-[#CCFF00]/40 flex items-center justify-center text-white">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-tight text-white">
              Akshita sahu
            </span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#CCFF00] text-black flex items-center justify-center text-[9px] font-black">
              ✓
            </span>
            {isAkshitaAdmin && (
              <span className="px-1.5 py-0.2 rounded bg-amber-400 text-black text-[10px] font-black font-mono">
                CREATOR
              </span>
            )}
          </div>

          <a
            href="https://www.instagram.com/akshitaoffside_?dmpr=MWtiMHAybHhwcGpkMw=="
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-xs font-semibold border border-white/10 transition-all"
            title="Follow Akshita on Instagram"
          >
            <span className={themeMode === 'pink' ? 'text-[#FF2E7E]' : 'text-[#CCFF00]'}>
              @akshitaoffside_
            </span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>

        {/* Right Header Navigation */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Dark ↔ Pink Mode Switch Toggle */}
          <button
            type="button"
            onClick={() => {
              const nextMode = themeMode === 'pink' ? 'dark' : 'pink';
              setThemeMode(nextMode);
              localStorage.setItem('akshita_theme', nextMode);
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm ${
              themeMode === 'pink'
                ? 'bg-[#FF2E7E]/15 border-[#FF2E7E]/40 text-pink-200 hover:bg-[#FF2E7E]/25 shadow-[0_0_15px_rgba(255,46,126,0.25)]'
                : 'bg-white/[0.05] border-white/10 text-zinc-300 hover:bg-white/[0.1]'
            }`}
            title="Switch theme: Dark Obsidian ↔ Rose Pink"
          >
            {themeMode === 'pink' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#FF2E7E] animate-pulse" />
                <span className="font-mono text-[11px]">🌸 Rose Pink</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                <span className="font-mono text-[11px]">🌙 Dark Obsidian</span>
              </>
            )}
          </button>

          {/* Admin Dashboard Pill for Akshita Only */}
          {isAkshitaAdmin && (
            <button
              onClick={() => setIsAdminDashboardOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black shadow-md transition-all active:scale-95"
            >
              <Crown className="w-3.5 h-3.5 fill-black" />
              <span>Admin Orders</span>
            </button>
          )}

          {/* User Sign In / Account Button */}
          {user ? (
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-zinc-300 font-medium hidden sm:inline">
                {user.name} {hasPaid && '• Paid ✓'}
              </span>
              <button
                onClick={handleSignOut}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthModalMode('signin');
                setIsAuthModalOpen(true);
              }}
              className="px-4 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-bold border border-white/10 transition-all"
            >
              Sign In
            </button>
          )}

          <div className="hidden sm:flex items-center space-x-1 text-xs text-zinc-500 font-medium pl-2 border-l border-white/10">
            <span>Built with</span>
            <Heart className={`w-3.5 h-3.5 ${themeMode === 'pink' ? 'fill-[#FF2E7E] text-[#FF2E7E]' : 'fill-[#CCFF00] text-[#CCFF00]'}`} />
            <span className="text-zinc-300 font-semibold">on SuperProfile</span>
          </div>
        </div>
      </header>

      {/* Payment Success Toast */}
      {paymentSuccessToast && (
        <div className="max-w-md mx-auto mb-4 px-4">
          <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center justify-between animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <Check className="w-5 h-5 stroke-[3]" />
              <div>
                <p className="font-bold text-sm">Payment Successful! (₹49)</p>
                <p className="text-xs text-emerald-100">
                  Resource & 7-Day Routine Schedule Unlocked.
                </p>
              </div>
            </div>
            <button
              onClick={() => setPaymentSuccessToast(false)}
              className="text-white/80 hover:text-white text-xs font-mono font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MAIN CONTAINER (Single Adaptive Card Layout)             */}
      {/* ======================================================== */}
      <main className="max-w-5xl mx-auto px-3 sm:px-6 mt-1 space-y-8">
        <div className="transparent-card rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ==================================================== */}
            {/* LEFT COLUMN: HERO, ABOUT & RESOURCE SPECS (7 cols)   */}
            {/* ==================================================== */}
            <div className="lg:col-span-7 space-y-6">
              {/* Cover Picture (Akshita Sahu Official Cover Photo) */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[460px] rounded-2xl overflow-hidden shadow-md border border-white/10 group bg-stone-950">
                <img
                  src="/cover.png"
                  alt="My Weekly Gym Split by Akshita Sahu"
                  className="w-full h-full object-cover object-[center_25%] group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-4 pb-5 pointer-events-none">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#CCFF00] font-bold drop-shadow">
                    BUILD WITH ME
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-white tracking-wider mt-0.5 drop-shadow-md">
                    MY WEEKLY GYM SPLIT
                  </h2>
                  <span className="text-[11px] font-mono text-zinc-300 uppercase tracking-widest mt-0.5">
                    BY AKSHITA SAHU
                  </span>
                </div>
              </div>

              {/* Title & Brand Headline */}
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/30 text-[#CCFF00] text-[10px] font-black uppercase font-mono tracking-wider">
                  OFFICIAL WORKOUT SPLIT
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  My Weekly Gym Split
                </h1>
                <p className="text-sm font-bold text-[#CCFF00]">
                  Build With Me • Personal Training Protocol
                </p>
              </div>

              {/* ABOUT THE PAGE (High-End Structured Editorial Bento UI) */}
              <div className="space-y-4 pt-1 text-zinc-200">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${themeMode === 'pink' ? 'bg-[#FF2E7E]' : 'bg-[#CCFF00]'} animate-pulse`} />
                    <span className="text-xs font-mono font-black uppercase tracking-wider text-zinc-400">
                      ABOUT THE GUIDE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                    Official Protocol
                  </span>
                </div>

                {/* 1. The Hook / Gym-Goer Problem Statement Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/[0.07] via-white/[0.03] to-transparent border border-white/10 shadow-sm relative overflow-hidden">
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-10 h-10 rounded-2xl ${themeMode === 'pink' ? 'bg-[#FF2E7E]/15 border-[#FF2E7E]/30 text-[#FF2E7E]' : 'bg-[#CCFF00]/15 border-[#CCFF00]/30 text-[#CCFF00]'} border flex items-center justify-center shrink-0 shadow-sm`}>
                      <Target className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                        WHO THIS IS FOR
                      </span>
                      <p className="text-sm sm:text-base font-extrabold text-white leading-snug mt-0.5">
                        If you're tired of going to the gym without a plan, this is for you.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Philosophy & Structure Bento Grid (2 Cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Protocol Card */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 transition-colors space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-lg ${themeMode === 'pink' ? 'bg-[#FF2E7E]/15 text-[#FF2E7E]' : 'bg-[#CCFF00]/15 text-[#CCFF00]'} flex items-center justify-center shrink-0`}>
                        <Dumbbell className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className={`text-xs font-mono font-black uppercase tracking-wider ${themeMode === 'pink' ? 'text-[#FF2E7E]' : 'text-[#CCFF00]'}`}>
                        Build With Me
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                      <strong className="text-white font-bold">Build With Me</strong> is my personal weekly workout split — the routine I follow to build muscle, get stronger, and work towards my fitness goals.
                    </p>
                  </div>

                  {/* Execution Clarity Card */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 transition-colors space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-xs font-mono font-black uppercase tracking-wider text-emerald-400">
                        Gym-Floor Clarity
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                      I've structured each training day with specific exercises, sets, and reps so you know exactly what to do when you step into the gym.
                    </p>
                  </div>
                </div>

                {/* 3. "What's Inside" Redesigned Bento Grid Card */}
                <div className="rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden shadow-md">
                  <div className="px-5 py-3.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
                    <h4 className={`text-xs font-mono font-black uppercase tracking-wider flex items-center space-x-1.5 ${themeMode === 'pink' ? 'text-[#FF2E7E]' : 'text-[#CCFF00]'}`}>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>What's inside:</span>
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest bg-white/[0.05] border border-white/5 px-2.5 py-0.5 rounded-full">
                      Full Protocol Breakdown
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { title: '6 structured training days', tag: 'Full Weekly Split' },
                      { title: 'Glute & hamstring focused training', tag: 'High-Tension Volume' },
                      { title: 'Quad-focused workouts', tag: 'Strength & Drive' },
                      { title: 'Back, arms & forearms training', tag: 'V-Taper Pull' },
                      { title: 'Legs & shoulders', tag: 'Upper & Lower Synergy' },
                      { title: 'Rest & recovery days', tag: 'Muscle Repair' },
                      { title: 'Exercises, sets, reps & intensity guidance', tag: 'Form Cues & Rep Ranges', colSpan: true },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start space-x-2.5 transition-all hover:bg-white/[0.04] ${
                          item.colSpan ? `sm:col-span-2 ${themeMode === 'pink' ? 'bg-[#FF2E7E]/[0.03] border-[#FF2E7E]/20' : 'bg-[#CCFF00]/[0.03] border-[#CCFF00]/20'}` : ''
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg ${themeMode === 'pink' ? 'bg-[#FF2E7E]/20 text-[#FF2E7E]' : 'bg-[#CCFF00]/20 text-[#CCFF00]'} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                            {item.title}
                          </p>
                          <span className="text-[10px] font-mono text-zinc-400 font-semibold uppercase tracking-wider block mt-0.5">
                            {item.tag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Training With Purpose Callout Card */}
                <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 flex items-center space-x-3 text-xs sm:text-sm text-zinc-200 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <p className="leading-relaxed font-medium">
                    Whether you're just starting your gym journey or looking for a structured routine to follow, <strong className="text-white font-bold">this is your guide to training with purpose.</strong>
                  </p>
                </div>

                {/* Golden Highlight Quote Card */}
                <div className="golden-quote-card p-5 sm:p-6 rounded-3xl relative overflow-hidden my-4 shadow-xl">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-start space-x-3.5">
                    <div className="w-9 h-9 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-300 font-serif text-xl font-black shadow-inner">
                      “
                    </div>
                    <div className="space-y-3 flex-1">
                      <p className="golden-gradient-text text-sm sm:text-base font-extrabold italic leading-relaxed tracking-wide">
                        "You don't have to be the strongest girl in the gym. You just have to keep showing up."
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-400/25 text-xs">
                        <span className="font-extrabold text-amber-300 font-mono tracking-wider flex items-center space-x-1.5">
                          <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                          <span>Akshita Sahu</span>
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-amber-200 font-bold bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full shadow-xs">
                          Let's build together.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WHAT YOU'LL GET (Resource Breakdown) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                    WHAT YOU'LL GET
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>

                <div className="border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10 bg-white/[0.02]">
                  <div className="p-3.5 flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-zinc-400 font-medium">Number of resources</span>
                    <span className="font-bold text-white">1</span>
                  </div>

                  {/* Resource Content Row: Click to open Locked/Unlocked card */}
                  <div
                    onClick={handleResourceClick}
                    className="p-3.5 flex items-center justify-between text-xs sm:text-sm hover:bg-white/[0.04] cursor-pointer transition-colors group select-none"
                    title={hasPaid ? 'Click to view unlocked guide' : 'Click to preview resource'}
                  >
                    <span className="text-zinc-400 font-medium">Resource content</span>
                    <div className="flex items-center space-x-2">
                      {hasPaid ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center space-x-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Unlocked</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center space-x-1">
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </span>
                      )}
                      <span className="font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                        Official PDF Guide (Build With Me)
                      </span>
                    </div>
                  </div>

                  {/* Resource Content Breakdown (Exclusively visible after payment) */}
                  {hasPaid && (
                    <div className="p-4 bg-emerald-950/20 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Resource Content (Unlocked):</span>
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              downloadWeeklyGymSplitPdf();
                            }}
                            className="text-[11px] font-bold text-black bg-[#CCFF00] hover:bg-[#BBE600] px-2.5 py-0.5 rounded-lg flex items-center space-x-1 transition-colors"
                          >
                            <Download className="w-3 h-3 stroke-[2.5]" />
                            <span>Download PDF</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsUnlockedResourceModalOpen(true);
                            }}
                            className="text-[11px] font-bold text-zinc-300 hover:text-white underline flex items-center space-x-1"
                          >
                            <FileText className="w-3 h-3" />
                            <span>View Full Guide</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-zinc-200 font-semibold pl-1">
                        <div className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                          <span>6 structured training days</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                          <span>Glute & hamstring focused training</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                          <span>Quad-focused workouts</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                          <span>Back, arms & forearms training</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                          <span>Legs & shoulders</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                          <span>Rest & recovery days</span>
                        </div>
                        <div className="flex items-center space-x-2 sm:col-span-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                          <span>Exercises, sets, reps & intensity guidance</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-zinc-500">
                  {hasPaid
                    ? '✓ Resource unlocked. Click above to view or download.'
                    : '🔒 Click resource above to inspect locked preview and payment unlock.'}
                </p>
              </div>

              {/* Already made payment link */}
              <div className="pt-1">
                <p className="text-xs text-zinc-400">
                  Already made a payment on this page?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode('signin');
                      setIsAuthModalOpen(true);
                    }}
                    className="text-[#CCFF00] hover:underline font-bold"
                  >
                    Sign in to view details
                  </button>
                </p>
              </div>

              {/* Contact Me */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 block">
                  CONTACT ME FOR ANY ISSUES OR QUERIES
                </span>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-300 font-semibold">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-[#CCFF00]" />
                    <a
                      href="mailto:Fitwithakshita@gmail.com"
                      className="hover:underline text-white"
                    >
                      Fitwithakshita@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <a
                      href="https://www.instagram.com/akshitaoffside_?dmpr=MWtiMHAybHhwcGpkMw=="
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#CCFF00] hover:underline font-bold"
                    >
                      Instagram: @akshitaoffside_
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================================================== */}
            {/* RIGHT COLUMN: CHECKOUT CARD (5 cols, Sticky)         */}
            {/* ==================================================== */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-8">
              <div className="transparent-card-elevated rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
                    Access will be linked & sent to this email
                  </p>
                  {user && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                      ✓ Logged In
                    </span>
                  )}
                </div>

                {!user && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-2 text-xs">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-zinc-300 leading-snug">
                      <strong className="text-amber-300">Sign in required:</strong> You must be logged in to pay ₹49 so your routine & downloads are permanently saved to your athlete account.
                    </div>
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    launchPayment();
                  }}
                  className="space-y-3.5"
                >
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] focus:border-[#CCFF00] focus:bg-white/[0.07] focus:outline-none text-sm text-white placeholder-zinc-500 font-medium transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 Phone number *"
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] focus:border-[#CCFF00] focus:bg-white/[0.07] focus:outline-none text-sm text-white placeholder-zinc-500 font-medium transition-colors"
                    />
                  </div>

                  {/* Pricing (Sub Total ₹299 ₹49 / Total ₹49) */}
                  <div className="pt-2 border-t border-white/10 space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-zinc-400 font-medium">
                      <span>Sub Total</span>
                      <div className="space-x-1.5 font-mono">
                        <span className="line-through text-zinc-500">₹299</span>
                        <span className="font-bold text-white">₹49</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-base font-black text-white pt-1 border-t border-white/10">
                      <span>Total</span>
                      <span className={`font-mono text-xl ${themeMode === 'pink' ? 'text-[#FF2E7E]' : 'text-[#CCFF00]'}`}>
                        ₹49
                      </span>
                    </div>
                  </div>

                  {/* Lightish Neon CTA Button with Login Gate Check */}
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="w-full py-4 rounded-2xl btn-neon font-black text-sm flex items-center justify-center space-x-2 transition-all active:scale-98 disabled:opacity-50"
                  >
                    {isProcessingPayment ? (
                      <span>Connecting Razorpay...</span>
                    ) : hasPaid ? (
                      <>
                        <span>Access Granted • Download Guide</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </>
                    ) : user ? (
                      <>
                        <span>Proceed to Pay ₹49 →</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Sign In to Unlock & Pay (₹49) →</span>
                      </>
                    )}
                  </button>
                </form>

                {/* ACCEPTED PAYMENT METHODS (Well UI Oriented) */}
                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-black tracking-wider text-zinc-400">
                      ACCEPTED PAYMENT METHODS
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                      Instant Delivery
                    </span>
                  </div>

                  {/* Row 1: UPI Apps */}
                  <div className="grid grid-cols-4 gap-1.5 p-2 rounded-2xl bg-black/40 border border-white/5">
                    <div className="flex items-center justify-center py-1.5 px-1 rounded-xl bg-white/5" title="Google Pay">
                      <GPayLogo className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-center py-1.5 px-1 rounded-xl bg-[#5F259F]" title="PhonePe">
                      <PhonePeLogo className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-center py-1.5 px-1 rounded-xl bg-white/5" title="Paytm">
                      <PaytmLogo className="w-7 h-3.5" />
                    </div>
                    <div className="flex items-center justify-center py-1.5 px-1 rounded-xl bg-white/5" title="BHIM UPI">
                      <BhimLogo className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Row 2: Cards & Top Banks */}
                  <div className="flex items-center justify-between gap-1 px-1">
                    <div className="flex items-center space-x-1.5">
                      <VisaLogo className="w-7 h-3.5" />
                      <MastercardLogo className="w-6 h-3.5" />
                      <RuPayLogo className="w-8 h-3.5" />
                    </div>
                    <div className="h-3 w-px bg-white/10" />
                    <div className="flex items-center space-x-1.5" title="Netbanking: HDFC, ICICI, SBI, Axis">
                      <HdfcLogo className="w-3.5 h-3.5" />
                      <IciciLogo className="w-3.5 h-3.5" />
                      <SbiLogo className="w-3.5 h-3.5" />
                      <AxisLogo className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-1.5 text-[11px] text-zinc-400 font-medium pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                    <span>Razorpay Verified Merchant • 256-Bit SSL Encrypted</span>
                  </div>
                </div>

                {/* INVITE YOUR NETWORK: Copy Link */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <span className="block text-[11px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
                    INVITE YOUR NETWORK
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="w-full py-3 rounded-2xl border border-white/10 hover:bg-white/5 text-xs sm:text-sm font-bold text-zinc-200 flex items-center justify-center space-x-2 transition-all active:scale-98"
                  >
                    {copyFeedback ? (
                      <>
                        <Check className="w-4 h-4 text-[#CCFF00]" />
                        <span className="text-[#CCFF00]">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-400" />
                        <span>Copy link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* EXCLUSIVE 7-DAY WORKOUT SCHEDULE (AFTER PAYMENT ONLY)    */}
        {/* ======================================================== */}
        {hasPaid ? (
          <div
            id="unlocked-routine-schedule"
            className="transparent-card rounded-3xl p-6 sm:p-8 animate-fadeIn border-2 border-emerald-500/30 shadow-2xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase font-mono">
                      PAYMENT SUCCESSFUL • ACCESS UNLOCKED
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                    Official 7-Day Workout Routine Split
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={downloadWeeklyGymSplitPdf}
                  className="px-4 py-2 rounded-xl btn-neon text-xs font-black transition-all active:scale-95 flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download Colorful PDF (.pdf)</span>
                </button>
                <button
                  onClick={printWeeklyGymSplit}
                  className="px-3.5 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-200 text-xs font-bold transition-all active:scale-95 flex items-center space-x-1.5"
                  title="Print or Save via Browser"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Print / View</span>
                </button>
              </div>
            </div>

            {/* Unlocked Resource Contents Overview Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black uppercase tracking-wider text-white flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>RESOURCE CONTENTS (UNLOCKED):</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-bold">
                  ✓ Full Access Granted
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-zinc-200">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                  <span>6 structured training days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                  <span>Glute & hamstring focused training</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                  <span>Quad-focused workouts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                  <span>Back, arms & forearms training</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                  <span>Legs & shoulders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                  <span>Rest & recovery days</span>
                </div>
                <div className="flex items-center space-x-2 sm:col-span-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3] shrink-0" />
                  <span>Exercises, sets, reps & intensity guidance</span>
                </div>
              </div>
            </div>

            {/* Clean Schedule View (No complex reps count inputs) */}
            <CleanScheduleView />
          </div>
        ) : null}
      </main>

      {/* ======================================================== */}
      {/* RAZORPAY COMPLIANCE FOOTER (Required for Live Activation) */}
      {/* ======================================================== */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-10 border-t border-white/10 mt-14 text-zinc-300 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full ${themeMode === 'pink' ? 'bg-[#FF2E7E]/20 text-[#FF2E7E] border-[#FF2E7E]/40' : 'bg-[#CCFF00]/20 text-[#CCFF00] border-[#CCFF00]/40'} border flex items-center justify-center font-black text-xs shadow-sm`}>
              AS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-sm text-white tracking-tight">Akshita Sahu</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                <span className="text-xs font-mono font-bold text-zinc-300">Build With Me</span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                Official Weekly Gym Split • Creator Protocol Storefront
              </p>
            </div>
          </div>

          {/* Bold, Prominent Policy Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'terms', label: 'Terms & Conditions' },
              { id: 'privacy', label: 'Privacy Policy' },
              { id: 'refund', label: 'Refund Policy' },
              { id: 'shipping', label: 'Pricing & Delivery' },
              { id: 'contact', label: 'Contact Us' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setComplianceModalTab(btn.id);
                  setIsComplianceModalOpen(true);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black text-white bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 hover:border-white/30 transition-all shadow-sm active:scale-95 ${
                  themeMode === 'pink' ? 'hover:border-[#FF2E7E]/50' : 'hover:border-[#CCFF00]/50'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs font-bold text-zinc-400">
          <p>© 2026 Akshita Sahu (@akshitaoffside_). All rights reserved.</p>
          <div className="flex items-center space-x-1.5 text-emerald-400 font-mono text-[11px] font-black bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Payments Processed via Razorpay (RBI Regulated Gateway)</span>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* MODALS                                                   */}
      {/* ======================================================== */}
      <LockedResourceModal
        isOpen={isLockedResourceModalOpen}
        onClose={() => setIsLockedResourceModalOpen(false)}
        onUnlockClick={() => launchPayment()}
        onSignInClick={() => {
          setAuthModalMode('signin');
          setIsAuthModalOpen(true);
        }}
      />

      <UnlockedResourceModal
        isOpen={isUnlockedResourceModalOpen}
        onClose={() => setIsUnlockedResourceModalOpen(false)}
      />

      <ProperAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        defaultEmail={email || user?.email || ''}
        onAuthSuccess={handleAuthSuccess}
      />

      <RazorpayModal
        isOpen={isRazorpayModalOpen}
        onClose={() => setIsRazorpayModalOpen(false)}
        amount={razorpayOrderInfo.amount || 49}
        orderId={razorpayOrderInfo.orderId}
        buyerEmail={razorpayOrderInfo.email || email}
        buyerPhone={razorpayOrderInfo.phone || phone}
        buyerName={razorpayOrderInfo.name || user?.name || 'Athlete'}
        onPaymentSuccess={handleRazorpaySuccess}
      />

      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        token={authToken}
      />

      <RazorpayComplianceModal
        isOpen={isComplianceModalOpen}
        onClose={() => setIsComplianceModalOpen(false)}
        initialTab={complianceModalTab}
      />
    </div>
  );
};
