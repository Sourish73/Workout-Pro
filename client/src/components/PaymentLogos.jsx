import React from 'react';

// Google Pay Logo
export const GPayLogo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

// PhonePe Logo
export const PhonePeLogo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="48" fill="#5F259F" />
    <path d="M52 22h-8c-1.1 0-2 .9-2 2v40c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V52h10c11 0 19-8 19-15s-8-15-19-15zm8 20h-8V30h8c5 0 9 2 9 6s-4 6-9 6z" fill="#FFFFFF" />
    <path d="M68 62L52 46l-4 4 14 16h6c1 0 1-.8 0-1.5z" fill="#00D285" />
    <path d="M35 34h30v6H35z" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

// Paytm Logo
export const PaytmLogo = ({ className = 'w-10 h-4' }) => (
  <svg viewBox="0 0 140 45" className={className}>
    <rect width="140" height="45" rx="8" fill="#002E6E" />
    <text x="12" y="30" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="24" letterSpacing="0.5">
      pay
    </text>
    <text x="60" y="30" fill="#00BAF2" fontFamily="sans-serif" fontWeight="900" fontSize="24" letterSpacing="0.5">
      tm
    </text>
  </svg>
);

// BHIM UPI Official Logo
export const BhimLogo = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <rect width="100" height="100" rx="20" fill="#F4F4F5" />
    <path d="M50 15L20 70h60L50 15z" fill="#009A44" opacity="0.1" />
    <path d="M42 22L24 68h14l12-32 8 16 10-4-16-26z" fill="#009A44" />
    <path d="M58 38l-6 16 12 14h14L58 38z" fill="#F37021" />
    <text x="50" y="90" fill="#1C1917" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="16">
      BHIM
    </text>
  </svg>
);

// UPI Generic Unified Logo
export const UpiIcon = ({ className = 'w-10 h-6' }) => (
  <svg viewBox="0 0 120 40" className={className}>
    <rect width="120" height="40" rx="8" fill="#0F766E" />
    <path d="M22 10L14 30h7l5-13 4 7 5-2-9-12z" fill="#22C55E" />
    <path d="M30 18l-3 7 6 5h7l-10-12z" fill="#F97316" />
    <text x="75" y="27" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="20" fontStyle="italic">
      UPI
    </text>
  </svg>
);

// Cred Logo
export const CredLogo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="48" fill="#09090B" />
    <circle cx="50" cy="50" r="32" fill="none" stroke="#FFFFFF" strokeWidth="6" />
    <path d="M38 38h24v24H38z" fill="none" stroke="#FFFFFF" strokeWidth="6" />
  </svg>
);

// Visa Logo
export const VisaLogo = ({ className = 'w-10 h-5' }) => (
  <svg viewBox="0 0 80 32" className={className}>
    <rect width="80" height="32" rx="6" fill="#1A1F71" />
    <text x="40" y="22" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="20" letterSpacing="1">
      VISA
    </text>
  </svg>
);

// Mastercard Logo
export const MastercardLogo = ({ className = 'w-9 h-6' }) => (
  <svg viewBox="0 0 60 38" className={className}>
    <rect width="60" height="38" rx="6" fill="#222222" />
    <circle cx="23" cy="19" r="12" fill="#EB001B" />
    <circle cx="37" cy="19" r="12" fill="#F79E1B" fillOpacity="0.85" />
  </svg>
);

// RuPay Logo
export const RuPayLogo = ({ className = 'w-11 h-5' }) => (
  <svg viewBox="0 0 90 32" className={className}>
    <rect width="90" height="32" rx="6" fill="#002E6E" />
    <path d="M22 6L14 26h8l4-10 6 10h8L32 14l6-8H22z" fill="#00AEEF" />
    <path d="M24 10l-4 12h5l2-5 3 5h5l-6-8 4-4h-5z" fill="#F37021" />
    <text x="62" y="22" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="15" fontStyle="italic">
      RuPay
    </text>
  </svg>
);

// HDFC Bank Logo
export const HdfcLogo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 60 60" className={className}>
    <rect width="60" height="60" rx="10" fill="#004C8F" />
    <rect x="22" y="10" width="16" height="40" fill="#ED232A" />
    <rect x="10" y="22" width="40" height="16" fill="#ED232A" />
    <rect x="22" y="22" width="16" height="16" fill="#FFFFFF" />
  </svg>
);

// ICICI Bank Logo
export const IciciLogo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 60 60" className={className}>
    <rect width="60" height="60" rx="10" fill="#A42022" />
    <circle cx="30" cy="30" r="18" fill="none" stroke="#F37021" strokeWidth="5" />
    <text x="30" y="36" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="18">
      i
    </text>
  </svg>
);

// State Bank of India (SBI) Logo
export const SbiLogo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 60 60" className={className}>
    <circle cx="30" cy="30" r="28" fill="#0099DA" />
    <circle cx="30" cy="24" r="8" fill="#FFFFFF" />
    <rect x="27" y="24" width="6" height="24" fill="#FFFFFF" />
  </svg>
);

// Axis Bank Logo
export const AxisLogo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 60 60" className={className}>
    <rect width="60" height="60" rx="10" fill="#97144D" />
    <path d="M30 14L15 44h12l8-16 8 16h6L30 14z" fill="#FFFFFF" />
  </svg>
);

// Kotak Mahindra Bank Logo
export const KotakLogo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 60 60" className={className}>
    <rect width="60" height="60" rx="10" fill="#ED1C24" />
    <circle cx="22" cy="30" r="8" fill="none" stroke="#FFFFFF" strokeWidth="4" />
    <circle cx="38" cy="30" r="8" fill="none" stroke="#FFFFFF" strokeWidth="4" />
    <path d="M26 24L34 36M26 36L34 24" stroke="#FFFFFF" strokeWidth="4" />
  </svg>
);

// Razorpay Official Logo Symbol (Light theme friendly)
export const RazorpayBadge = ({ className = 'h-5' }) => (
  <div className={`inline-flex items-center space-x-1.5 ${className}`}>
    <svg viewBox="0 0 32 32" className="w-5 h-5">
      <path d="M22.5 4L9 18h8.5l-4 10 13.5-14H18.5l4-10z" fill="#0C2340" />
      <path d="M22.5 4L9 18h8.5l-4 10 13.5-14H18.5l4-10z" fill="#3395FF" opacity="0.8" />
    </svg>
    <div className="flex flex-col leading-none">
      <span className="text-[10px] font-black tracking-widest text-[#0C2340]">RAZORPAY</span>
      <span className="text-[8px] font-bold text-blue-600">VERIFIED BUSINESS</span>
    </div>
  </div>
);
