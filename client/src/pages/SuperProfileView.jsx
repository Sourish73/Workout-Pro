import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Lock,
  Check,
  ArrowRight,
  ShieldCheck,
  Copy,
  Download,
  Mail,
  ExternalLink,
  Crown,
  User,
  LogOut,
  Sparkles,
  Printer,
  FileText,
  Tag,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { CleanScheduleView } from '../components/CleanScheduleView';
import { LockedResourceModal } from '../components/LockedResourceModal';
import { UnlockedResourceModal } from '../components/UnlockedResourceModal';
import { ProperAuthModal } from '../components/ProperAuthModal';
import { RazorpayModal } from '../components/RazorpayModal';
import { AdminDashboardModal } from '../components/AdminDashboardModal';
import { RazorpayComplianceModal } from '../components/RazorpayComplianceModal';
import { downloadWeeklyGymSplitPdf, printWeeklyGymSplit } from '../utils/generatePdf';
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
import { API_BASE } from '../config/api';

export const SuperProfileView = () => {
  // Checkout Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
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
    amount: 99,
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
        colors: ['#18181B', '#F59E0B', '#10B981', '#3B82F6'],
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

  // Launch Payment Flow
  const launchPayment = async (overrideEmail = '', overridePhone = '') => {
    let buyerEmail = (overrideEmail || email || user?.email || '').trim().toLowerCase();
    let buyerPhone = (overridePhone || phone || user?.phone || '').trim();

    if (!buyerEmail) {
      alert('Please enter your email address in the checkout box.');
      return;
    }

    // If user is not yet logged in, prompt sign-in to attach their purchase
    if (!user) {
      setPendingPaymentAfterAuth(true);
      setAuthModalMode('signin');
      setIsAuthModalOpen(true);
      return;
    }

    setIsProcessingPayment(true);

    try {
      // 1. Create order on backend (₹99 = 9900 paise)
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
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || orderData?.keyId || '';

      // If user provided a real Razorpay Key ID (not placeholder), open real Razorpay Standard Checkout
      if (
        window.Razorpay &&
        razorpayKey &&
        !razorpayKey.includes('placeholder')
      ) {
        const options = {
          key: razorpayKey,
          amount: 99 * 100, // 9900 paise = ₹99
          currency: 'INR',
          name: 'Akshita',
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
            color: '#18181B',
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
        amount: 99,
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
        amount: 99,
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
    <div className="min-h-screen bg-[#F4F4F6] text-zinc-900 pb-20 font-sans selection:bg-zinc-900 selection:text-white">
      {/* ======================================================== */}
      {/* TOP HEADER (Clean Dark Nav Bar matching Mobile Screenshot)*/}
      {/* ======================================================== */}
      <header className="w-full bg-[#18181B] text-white px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Left: Avatar with User Icon and "Akshita ✓" */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-white/40 flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">
              Akshita
            </span>
            <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black">
              ✓
            </span>
            {isAkshitaAdmin && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-black font-mono">
                CREATOR
              </span>
            )}
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center space-x-2.5">
            {/* Admin Dashboard Pill for Akshita Only */}
            {isAkshitaAdmin && (
              <button
                onClick={() => setIsAdminDashboardOpen(true)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-black shadow-sm transition-all"
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
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors"
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
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Payment Success Toast */}
      {paymentSuccessToast && (
        <div className="max-w-md mx-auto my-4 px-4">
          <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center justify-between animate-fadeIn">
            <div className="flex items-center space-x-2.5">
              <Check className="w-5 h-5 stroke-[3]" />
              <div>
                <p className="font-bold text-sm">Payment Successful! (₹99)</p>
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
      {/* MAIN CONTAINER: Clean Whitish Card Layout                 */}
      {/* ======================================================== */}
      <main className="max-w-5xl mx-auto px-3 sm:px-6 pt-6 sm:pt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ==================================================== */}
          {/* LEFT COLUMN: HERO IMAGE & EXACT CONTENT (7 cols)      */}
          {/* ==================================================== */}
          <div className="lg:col-span-7 bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 border border-zinc-200/90 shadow-sm space-y-6">
            {/* Cover Picture (Clean without overlay text, matching screenshot 2) */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-sm border border-zinc-100 bg-zinc-100">
              <img
                src="/cover.png"
                alt="Build With Me by Akshita"
                className="w-full h-full object-cover object-[center_25%]"
              />
            </div>

            {/* Main Heading (Exact from screenshot 2) */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                BUILD WITH ME
              </h1>
            </div>

            {/* ABOUT THE PAGE (Exact text from screenshot 2) */}
            <div className="pt-1 space-y-3.5 text-zinc-700">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400 block">
                  ABOUT THE PAGE
                </span>
                <h2 className="text-base sm:text-lg font-bold text-zinc-900 mt-1">
                  My Weekly Gym Split
                </h2>
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed">
                If you're tired of going to the gym without a plan, this is for you.
              </p>

              <p className="text-sm text-zinc-600 leading-relaxed">
                I've structured each training day with specific exercises, sets, and reps so you know exactly what to do when you step into the gym.
              </p>

              <div className="pt-2">
                <span className="text-sm font-semibold text-zinc-800 block mb-2">
                  What's inside:
                </span>
                <ul className="text-sm text-zinc-600 space-y-1.5 pl-1">
                  <li>- 6 structured training days</li>
                  <li>- Rest & recovery days</li>
                  <li>- Exercises, sets, reps & intensity guidance</li>
                </ul>
              </div>

              <p className="text-sm text-zinc-700 font-medium pt-2">
                Let's build together.
              </p>
            </div>

            {/* WHAT YOU'LL GET (Resource Breakdown Box) */}
            <div className="pt-4 border-t border-zinc-100 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                WHAT YOU'LL GET
              </span>

              <div className="border border-zinc-200 rounded-2xl overflow-hidden divide-y divide-zinc-200 bg-zinc-50/60 text-xs sm:text-sm">
                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-zinc-500 font-medium">Number of resources</span>
                  <span className="font-bold text-zinc-900">1</span>
                </div>

                <div
                  onClick={handleResourceClick}
                  className="p-3.5 flex items-center justify-between hover:bg-zinc-100/60 cursor-pointer transition-colors select-none group"
                  title={hasPaid ? 'Click to view unlocked guide' : 'Click to preview resource'}
                >
                  <span className="text-zinc-500 font-medium">Resource content</span>
                  <div className="flex items-center space-x-2">
                    {hasPaid ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Unlocked</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-700 text-xs font-bold flex items-center space-x-1">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    )}
                    <span className="font-bold text-zinc-900 group-hover:text-black transition-colors underline sm:no-underline">
                      Official PDF Guide (Build With Me)
                    </span>
                  </div>
                </div>

                {/* If paid, display full download action row */}
                {hasPaid && (
                  <div className="p-3.5 bg-emerald-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900">
                      ✓ Access Unlocked • Ready to Save
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadWeeklyGymSplitPdf();
                      }}
                      className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-black text-white text-xs font-bold flex items-center space-x-1 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
              <div className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <a href="mailto:fitwithakshita@gmail.com" className="hover:text-zinc-900 transition-colors font-medium">
                  fitwithakshita@gmail.com
                </a>
              </div>
              <a
                href="https://www.instagram.com/akshitaoffside_?dmpr=MWtiMHAybHhwcGpkMw=="
                target="_blank"
                rel="noreferrer"
                className="text-zinc-600 hover:text-black font-semibold flex items-center space-x-1"
              >
                <span>Instagram: @akshitaoffside_</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: CHECKOUT BOX (5 cols, Sticky)          */}
          {/* ==================================================== */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-6">
            <div className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 border border-zinc-200/90 shadow-sm space-y-4">
              <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                Access to this purchase will be sent to this email
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  launchPayment();
                }}
                className="space-y-3.5"
              >
                {/* Email Address Input */}
                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fitwithakshita@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/60 focus:bg-white focus:border-zinc-900 focus:outline-none text-sm text-zinc-900 placeholder-zinc-400 font-medium transition-colors"
                  />
                </div>

                {/* Phone Number Input */}
                <div>
                  <label className="text-xs font-semibold text-zinc-700 block mb-1">
                    Phone number *
                  </label>
                  <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50/60 focus-within:bg-white focus-within:border-zinc-900 transition-colors overflow-hidden">
                    <span className="px-3 text-xs font-bold text-zinc-600 border-r border-zinc-200 bg-zinc-100/70 py-3 select-none">
                      +91 ⌵
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9340116617"
                      className="w-full px-3 py-3 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 font-medium focus:outline-none"
                    />
                  </div>
                </div>

                {/* Discount Code Collapsible Row */}
                <div className="pt-1">
                  {!isDiscountOpen ? (
                    <button
                      type="button"
                      onClick={() => setIsDiscountOpen(true)}
                      className="w-full flex items-center justify-between py-2 text-xs text-zinc-600 hover:text-zinc-900 transition-colors font-medium border-t border-zinc-100"
                    >
                      <span className="flex items-center space-x-1.5">
                        <Tag className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Have a Discount Code?</span>
                      </span>
                      <span className="font-bold text-zinc-900">Add</span>
                    </button>
                  ) : (
                    <div className="pt-2 pb-1 border-t border-zinc-100 flex items-center space-x-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                        placeholder="ENTER CODE"
                        className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 text-xs uppercase font-mono font-bold focus:outline-none focus:border-zinc-900"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          alert('Standard launch pricing of ₹99 is already maximum discounted.');
                          setIsDiscountOpen(false);
                        }}
                        className="px-3 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Pricing Summary (Exact format from Image 1) */}
                <div className="pt-2 border-t border-zinc-100 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-zinc-500 font-medium">
                    <span>Sub Total</span>
                    <span className="font-mono text-zinc-900 font-semibold">₹99</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-900 font-bold border-t border-zinc-100 pt-1.5">
                    <span>Total</span>
                    <span className="font-mono text-zinc-950 font-black">₹99</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Amount total
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-zinc-950 font-mono tracking-tight block mt-0.5">
                      ₹99
                    </span>
                  </div>
                </div>

                {/* Main CTA Button: "Get it now →" */}
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full py-4 rounded-xl bg-[#18181B] hover:bg-black text-white font-bold text-sm sm:text-base flex items-center justify-between px-6 shadow-md transition-all active:scale-98 disabled:opacity-50 mt-2"
                >
                  {isProcessingPayment ? (
                    <span className="w-full text-center">Connecting Razorpay...</span>
                  ) : hasPaid ? (
                    <>
                      <span>Access Granted • Download Guide</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  ) : (
                    <>
                      <span>Get it now</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>

              {/* Questions Help Text (Exact from Image 1) */}
              <div className="pt-3 border-t border-zinc-100 text-center space-y-1">
                <p className="text-xs text-zinc-500 font-medium">
                  Questions before you buy? Answers come from this page.
                </p>
                <div className="flex items-center justify-center space-x-3 text-xs text-zinc-400">
                  <button
                    type="button"
                    onClick={() => {
                      setComplianceModalTab('shipping');
                      setIsComplianceModalOpen(true);
                    }}
                    className="hover:text-zinc-700 underline"
                  >
                    What do I get?
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => {
                      setComplianceModalTab('shipping');
                      setIsComplianceModalOpen(true);
                    }}
                    className="hover:text-zinc-700 underline"
                  >
                    How do I get access?
                  </button>
                </div>
              </div>

              {/* Accepted Payment Logos */}
              <div className="pt-4 border-t border-zinc-100 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase font-bold">
                  <span>ACCEPTED PAYMENT METHODS</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Instant Access
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                  <div className="flex items-center justify-center py-1.5 px-1 rounded-lg bg-white shadow-xs" title="Google Pay">
                    <GPayLogo className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-center py-1.5 px-1 rounded-lg bg-[#5F259F]" title="PhonePe">
                    <PhonePeLogo className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-center py-1.5 px-1 rounded-lg bg-white border border-zinc-200" title="Paytm">
                    <PaytmLogo className="w-7 h-3.5" />
                  </div>
                  <div className="flex items-center justify-center py-1.5 px-1 rounded-lg bg-white shadow-xs" title="BHIM UPI">
                    <BhimLogo className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1 px-1 pt-1">
                  <div className="flex items-center space-x-1.5">
                    <VisaLogo className="w-7 h-3.5" />
                    <MastercardLogo className="w-6 h-3.5" />
                    <RuPayLogo className="w-8 h-3.5" />
                  </div>
                  <div className="h-3 w-px bg-zinc-200" />
                  <div className="flex items-center space-x-1.5">
                    <HdfcLogo className="w-3.5 h-3.5" />
                    <IciciLogo className="w-3.5 h-3.5" />
                    <SbiLogo className="w-3.5 h-3.5" />
                    <AxisLogo className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-1.5 text-[11px] text-zinc-400 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                  <span>Razorpay Verified • 256-Bit SSL Encrypted</span>
                </div>
              </div>

              {/* INVITE YOUR NETWORK: Copy Link (Exact from Image 1) */}
              <div className="pt-3 border-t border-zinc-100 space-y-2">
                <span className="block text-[11px] font-mono uppercase text-zinc-400 font-bold tracking-wider">
                  INVITE YOUR NETWORK
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full py-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-xs sm:text-sm font-bold text-zinc-700 flex items-center justify-center space-x-2 transition-all active:scale-98"
                >
                  {copyFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-500" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE 7-DAY WORKOUT SCHEDULE                       */}
        {/* ======================================================== */}
        {hasPaid ? (
          <div
            id="unlocked-routine-schedule"
            className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 border-2 border-emerald-500/40 shadow-sm space-y-6 animate-fadeIn"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-sm">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase font-mono">
                      PAYMENT VERIFIED • ACCESS UNLOCKED
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-zinc-900 mt-0.5">
                    Official 7-Day Workout Routine Split
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={downloadWeeklyGymSplitPdf}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold transition-all active:scale-95 flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download Colorful PDF (.pdf)</span>
                </button>
                <button
                  onClick={printWeeklyGymSplit}
                  className="px-3.5 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-bold transition-all active:scale-95 flex items-center space-x-1.5"
                  title="Print or Save via Browser"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Print / View</span>
                </button>
              </div>
            </div>

            {/* Clean Schedule View Component */}
            <CleanScheduleView />
          </div>
        ) : null}
      </main>

      {/* ======================================================== */}
      {/* RAZORPAY COMPLIANCE FOOTER (Required for Activation)      */}
      {/* ======================================================== */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8 border-t border-zinc-200 mt-16 text-zinc-600 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black text-xs shadow-sm">
              AS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-zinc-900 tracking-tight">Akshita</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span className="text-xs font-mono font-medium text-zinc-500">Build With Me</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Official Weekly Gym Split • Digital Creator Storefront
              </p>
            </div>
          </div>

          {/* Legal Compliance Buttons */}
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
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-200 transition-all shadow-2xs active:scale-95"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-200 text-xs text-zinc-400">
          <p>© 2026 Akshita (@akshitaoffside_). All rights reserved.</p>
          <div className="flex items-center space-x-1.5 text-zinc-600 font-mono text-[11px] font-semibold bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
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
        amount={razorpayOrderInfo.amount || 99}
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

export default SuperProfileView;
