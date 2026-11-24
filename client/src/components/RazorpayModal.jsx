import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Building2,
  Wallet,
  QrCode,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Lock,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Check,
} from 'lucide-react';
import {
  GPayLogo,
  PhonePeLogo,
  PaytmLogo,
  BhimLogo,
  UpiIcon,
  CredLogo,
  VisaLogo,
  MastercardLogo,
  RuPayLogo,
  HdfcLogo,
  IciciLogo,
  SbiLogo,
  AxisLogo,
  KotakLogo,
  RazorpayBadge,
} from './PaymentLogos';

export const RazorpayModal = ({
  isOpen,
  onClose,
  amount = 99,
  orderId = '',
  buyerEmail = '',
  buyerPhone = '',
  buyerName = 'Athlete',
  onPaymentSuccess,
}) => {
  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'cred' | 'qr'
  const [vpaId, setVpaId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Checkout State Machine: 'select' | 'processing' | 'success'
  const [paymentStep, setPaymentStep] = useState('select');
  const [secondsRemaining, setSecondsRemaining] = useState(299); // 5 min countdown
  const [generatedPaymentId, setGeneratedPaymentId] = useState('');

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setPaymentStep('select');
      setSecondsRemaining(299);
      setSelectedUpiApp('gpay');
    }
  }, [isOpen]);

  // Timer countdown during UPI processing
  useEffect(() => {
    let timer = null;
    if (isOpen && paymentStep === 'processing' && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, paymentStep, secondsRemaining]);

  if (!isOpen) return null;

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const currentOrderId = orderId || `order_${Date.now()}`;

  // Start UPI payment processing
  const handleInitiatePayment = () => {
    const newPayId = `pay_${Date.now()}_${Math.floor(Math.random() * 8999 + 1000)}`;
    setGeneratedPaymentId(newPayId);
    setPaymentStep('processing');
  };

  // Complete Payment
  const handleCompletePayment = () => {
    setPaymentStep('success');
    const payId = generatedPaymentId || `pay_${Date.now()}_${Math.floor(Math.random() * 8999 + 1000)}`;

    setTimeout(() => {
      onPaymentSuccess({
        razorpay_order_id: currentOrderId,
        razorpay_payment_id: payId,
        buyerEmail,
        buyerPhone,
        buyerName,
      });
      onClose();
    }, 1200);
  };

  const upiAppNameMap = {
    gpay: 'Google Pay',
    phonepe: 'PhonePe',
    paytm: 'Paytm UPI',
    bhim: 'BHIM UPI',
    cred: 'CRED UPI',
    qr: 'UPI QR Code',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-white text-stone-900 rounded-[28px] shadow-2xl overflow-hidden flex flex-col border border-stone-200 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ======================================================== */}
        {/* REALISTIC LIGHT RAZORPAY HEADER                          */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-b from-[#F8FAFC] to-[#FFFFFF] p-5 sm:p-6 border-b border-stone-200 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors"
            title="Cancel & close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Trust & Branding Bar */}
          <div className="flex items-center justify-between pr-8 mb-3">
            <div className="flex items-center space-x-2">
              <RazorpayBadge />
            </div>

            <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>256-Bit SSL Secured</span>
            </div>
          </div>

          {/* Business & Price Details */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#1C1917] text-white font-black text-sm flex items-center justify-center shadow-md">
                AS
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-base font-extrabold text-stone-950 tracking-tight">
                    Akshita Sahu
                  </h3>
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                    ✓
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-medium">
                  My Weekly Gym Split (Build With Me Protocol)
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block">
                AMOUNT TO PAY
              </span>
              <span className="text-2xl font-black text-stone-950 font-mono tracking-tight">
                ₹{amount}.00
              </span>
            </div>
          </div>

          {/* Buyer Email & Order Pill */}
          <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span className="font-mono text-[11px] truncate max-w-[200px] text-stone-400">
              ID: {currentOrderId.slice(0, 18)}...
            </span>
            <span className="font-semibold text-stone-700 truncate max-w-[220px]">
              {buyerEmail || 'customer@gmail.com'}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 1: PAYMENT METHOD SELECTOR (LIGHT THEME)            */}
        {/* ======================================================== */}
        {paymentStep === 'select' && (
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[390px]">
            {/* Left Method Tabs (Light Theme Sidebar) */}
            <div className="md:col-span-5 bg-[#F8FAFC] border-r border-stone-200 p-2.5 sm:p-3 flex md:flex-col gap-1.5 overflow-x-auto">
              {/* UPI Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`flex-1 md:flex-none flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                  activeTab === 'upi'
                    ? 'bg-white text-stone-950 shadow-md border border-stone-200 ring-2 ring-blue-500/20'
                    : 'hover:bg-white/70 text-stone-600'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'upi' ? 'bg-blue-50 text-blue-600' : 'bg-stone-100 text-stone-600'}`}>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-extrabold text-stone-900">UPI</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase">
                        POPULAR
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 block font-medium">
                      GPay, PhonePe, Paytm
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 hidden md:block text-stone-400" />
              </button>

              {/* Cards Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`flex-1 md:flex-none flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                  activeTab === 'card'
                    ? 'bg-white text-stone-950 shadow-md border border-stone-200 ring-2 ring-blue-500/20'
                    : 'hover:bg-white/70 text-stone-600'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'card' ? 'bg-blue-50 text-blue-600' : 'bg-stone-100 text-stone-600'}`}>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-stone-900 block">Cards</span>
                    <span className="text-[10px] text-stone-400 block font-medium">
                      Visa, Mastercard, RuPay
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 hidden md:block text-stone-400" />
              </button>

              {/* Netbanking Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`flex-1 md:flex-none flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                  activeTab === 'netbanking'
                    ? 'bg-white text-stone-950 shadow-md border border-stone-200 ring-2 ring-blue-500/20'
                    : 'hover:bg-white/70 text-stone-600'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'netbanking' ? 'bg-blue-50 text-blue-600' : 'bg-stone-100 text-stone-600'}`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-stone-900 block">Netbanking</span>
                    <span className="text-[10px] text-stone-400 block font-medium">
                      HDFC, ICICI, SBI, Axis
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 hidden md:block text-stone-400" />
              </button>

              {/* Wallets Tab */}
              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                className={`flex-1 md:flex-none flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                  activeTab === 'wallet'
                    ? 'bg-white text-stone-950 shadow-md border border-stone-200 ring-2 ring-blue-500/20'
                    : 'hover:bg-white/70 text-stone-600'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${activeTab === 'wallet' ? 'bg-blue-50 text-blue-600' : 'bg-stone-100 text-stone-600'}`}>
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-stone-900 block">Wallets</span>
                    <span className="text-[10px] text-stone-400 block font-medium">
                      Paytm, Amazon Pay, Mobikwik
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 hidden md:block text-stone-400" />
              </button>
            </div>

            {/* Right Tab Content View */}
            <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-between">
              {/* TAB 1: UPI */}
              {activeTab === 'upi' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                    <span className="text-[11px] font-mono font-bold uppercase text-stone-400 tracking-wider">
                      SELECT UPI PAYMENT METHOD
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                      Zero Fees
                    </span>
                  </div>

                  {/* UPI Apps Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Google Pay */}
                    <div
                      onClick={() => setSelectedUpiApp('gpay')}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                        selectedUpiApp === 'gpay'
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-xs shrink-0">
                        <GPayLogo className="w-5 h-5" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-stone-900 block">Google Pay</span>
                        <span className="text-[10px] text-stone-400">Instant UPI</span>
                      </div>
                    </div>

                    {/* PhonePe */}
                    <div
                      onClick={() => setSelectedUpiApp('phonepe')}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                        selectedUpiApp === 'phonepe'
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#5F259F] text-white flex items-center justify-center shadow-xs shrink-0">
                        <PhonePeLogo className="w-6 h-6" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-stone-900 block">PhonePe</span>
                        <span className="text-[10px] text-stone-400">Fast & Direct</span>
                      </div>
                    </div>

                    {/* Paytm */}
                    <div
                      onClick={() => setSelectedUpiApp('paytm')}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                        selectedUpiApp === 'paytm'
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-xs shrink-0 p-0.5">
                        <PaytmLogo className="w-7 h-4" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-stone-900 block">Paytm UPI</span>
                        <span className="text-[10px] text-stone-400">Wallet & UPI</span>
                      </div>
                    </div>

                    {/* BHIM UPI */}
                    <div
                      onClick={() => setSelectedUpiApp('bhim')}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                        selectedUpiApp === 'bhim'
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-xs shrink-0">
                        <BhimLogo className="w-6 h-6" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-stone-900 block">BHIM UPI</span>
                        <span className="text-[10px] text-stone-400">Govt NPCI</span>
                      </div>
                    </div>

                    {/* CRED UPI */}
                    <div
                      onClick={() => setSelectedUpiApp('cred')}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                        selectedUpiApp === 'cred'
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-xs shrink-0">
                        <CredLogo className="w-5 h-5" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-stone-900 block">CRED Pay</span>
                        <span className="text-[10px] text-stone-400">Cred Rewards</span>
                      </div>
                    </div>

                    {/* QR Code Option */}
                    <div
                      onClick={() => setSelectedUpiApp('qr')}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                        selectedUpiApp === 'qr'
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shadow-xs shrink-0">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-stone-900 block">Scan QR</span>
                        <span className="text-[10px] text-stone-400">Any UPI App</span>
                      </div>
                    </div>
                  </div>

                  {/* Or Manual UPI ID */}
                  <div className="pt-2">
                    <label className="block text-[11px] font-mono text-stone-500 uppercase font-bold mb-1">
                      Or Enter Virtual Payment Address (VPA / UPI ID)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={vpaId}
                        onChange={(e) => setVpaId(e.target.value)}
                        placeholder="e.g. yourname@okhdfcbank"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-mono focus:border-stone-900 focus:outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-stone-400">
                        UPI
                      </span>
                    </div>
                  </div>

                  {/* Pay button */}
                  <button
                    type="button"
                    onClick={handleInitiatePayment}
                    className="w-full py-3.5 rounded-2xl bg-[#1C1917] hover:bg-stone-800 text-white font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 mt-2"
                  >
                    <span>Pay ₹{amount} via {upiAppNameMap[selectedUpiApp]}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}

              {/* TAB 2: CARDS */}
              {activeTab === 'card' && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                    <span className="text-[11px] font-mono font-bold uppercase text-stone-400 tracking-wider">
                      CREDIT / DEBIT CARD
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <VisaLogo className="w-8 h-4" />
                      <MastercardLogo className="w-7 h-4" />
                      <RuPayLogo className="w-9 h-4" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-500 uppercase font-bold mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        setCardNumber(val);
                      }}
                      placeholder="4532 •••• •••• 8890"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-mono focus:border-stone-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 uppercase font-bold mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-mono focus:border-stone-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-500 uppercase font-bold mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-mono focus:border-stone-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-stone-400">
                    Your card will be saved securely according to RBI guidelines.
                  </p>

                  <button
                    type="button"
                    onClick={handleInitiatePayment}
                    className="w-full py-3.5 rounded-2xl bg-[#1C1917] hover:bg-stone-800 text-white font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 mt-2"
                  >
                    <span>Pay ₹{amount} Securely</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}

              {/* TAB 3: NETBANKING */}
              {activeTab === 'netbanking' && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                    <span className="text-[11px] font-mono font-bold uppercase text-stone-400 tracking-wider">
                      SELECT BANK
                    </span>
                    <span className="text-[10px] text-stone-400">All Major Banks</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* HDFC */}
                    <div
                      onClick={() => setSelectedBank('HDFC')}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                        selectedBank === 'HDFC'
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <HdfcLogo className="w-6 h-6 shrink-0" />
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-stone-900 block">HDFC Bank</span>
                        <span className="text-[10px] text-stone-400">Fast Netbanking</span>
                      </div>
                    </div>

                    {/* ICICI */}
                    <div
                      onClick={() => setSelectedBank('ICICI')}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                        selectedBank === 'ICICI'
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <IciciLogo className="w-6 h-6 shrink-0" />
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-stone-900 block">ICICI Bank</span>
                        <span className="text-[10px] text-stone-400">Corporate & Retail</span>
                      </div>
                    </div>

                    {/* SBI */}
                    <div
                      onClick={() => setSelectedBank('SBI')}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                        selectedBank === 'SBI'
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <SbiLogo className="w-6 h-6 shrink-0" />
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-stone-900 block">SBI</span>
                        <span className="text-[10px] text-stone-400">State Bank of India</span>
                      </div>
                    </div>

                    {/* Axis */}
                    <div
                      onClick={() => setSelectedBank('Axis')}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center space-x-3 transition-all ${
                        selectedBank === 'Axis'
                          ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <AxisLogo className="w-6 h-6 shrink-0" />
                      <div className="leading-tight">
                        <span className="text-xs font-bold text-stone-900 block">Axis Bank</span>
                        <span className="text-[10px] text-stone-400">Instant Redirect</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleInitiatePayment}
                    className="w-full py-3.5 rounded-2xl bg-[#1C1917] hover:bg-stone-800 text-white font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 mt-2"
                  >
                    <span>Pay ₹{amount} via {selectedBank} Netbanking</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}

              {/* TAB 4: WALLETS */}
              {activeTab === 'wallet' && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
                    <span className="text-[11px] font-mono font-bold uppercase text-stone-400 tracking-wider">
                      SELECT WALLET
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                      One-Click Pay
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div
                      onClick={handleInitiatePayment}
                      className="p-3.5 rounded-2xl border border-stone-200 hover:border-stone-900 cursor-pointer flex items-center justify-between transition-all bg-white"
                    >
                      <div className="flex items-center space-x-3">
                        <PaytmLogo className="w-9 h-5" />
                        <span className="text-xs font-bold text-stone-900">Paytm Wallet</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </div>

                    <div
                      onClick={handleInitiatePayment}
                      className="p-3.5 rounded-2xl border border-stone-200 hover:border-stone-900 cursor-pointer flex items-center justify-between transition-all bg-white"
                    >
                      <div className="flex items-center space-x-3">
                        <PhonePeLogo className="w-6 h-6" />
                        <span className="text-xs font-bold text-stone-900">PhonePe Wallet</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleInitiatePayment}
                    className="w-full py-3.5 rounded-2xl bg-[#1C1917] hover:bg-stone-800 text-white font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 mt-2"
                  >
                    <span>Proceed to Wallet Login</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: REALISTIC UPI PROCESSING SCREEN                  */}
        {/* ======================================================== */}
        {paymentStep === 'processing' && (
          <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600 shadow-sm relative">
                <Smartphone className="w-8 h-8" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <h4 className="text-lg font-black text-stone-950">
                Collect Request Sent to {upiAppNameMap[selectedUpiApp]}
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                Please open your mobile UPI app to approve the payment of{' '}
                <strong className="text-stone-900 font-black">₹{amount}.00</strong> to{' '}
                <strong>Akshita Sahu</strong>.
              </p>
            </div>

            {/* Step-by-Step Instructions Card */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5 text-xs text-stone-700">
              <span className="font-mono text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                HOW TO APPROVE PAYMENT:
              </span>
              <div className="space-y-2">
                <div className="flex items-center space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span>Open <strong>{upiAppNameMap[selectedUpiApp]}</strong> on your smartphone.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span>Look for payment request of <strong>₹{amount}.00</strong> from <strong>Razorpay / Akshita Sahu</strong>.</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span>Enter your 4 or 6-digit UPI PIN to authorize the payment.</span>
                </div>
              </div>
            </div>

            {/* Timer countdown */}
            <div className="flex items-center justify-center space-x-2 text-xs font-mono text-stone-500">
              <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Time remaining to approve:</span>
              <span className="font-bold text-stone-900 text-sm">
                {formatTimer(secondsRemaining)}
              </span>
            </div>

            {/* Simulate Pin Approval (For seamless Instant Testing) */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleCompletePayment}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Simulate UPI PIN Approval (Approve ₹{amount})</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentStep('select')}
                className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-900 font-semibold"
              >
                Cancel & choose another payment method
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: PAYMENT SUCCESS SCREEN                           */}
        {/* ======================================================== */}
        {paymentStep === 'success' && (
          <div className="p-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider font-bold">
                PAYMENT CAPTURED BY RAZORPAY
              </span>
              <h4 className="text-xl font-black text-stone-950">
                ₹{amount}.00 Paid Successfully!
              </h4>
              <p className="text-xs text-stone-500 font-mono">
                Transaction ID: {generatedPaymentId || `pay_${Date.now()}`}
              </p>
            </div>

            <p className="text-xs text-stone-600">
              Unlocking your 7-Day Workout Routine Split & PDF Guide...
            </p>
          </div>
        )}

        {/* Modal Security Footer */}
        <div className="bg-stone-50 px-5 py-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Razorpay 256-Bit TLS Encryption</span>
          </div>
          <span className="font-mono text-stone-400">PCI-DSS Level 1</span>
        </div>
      </div>
    </div>
  );
};
