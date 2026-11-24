import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Crown,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ProperAuthModal = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  defaultEmail = '',
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState(defaultEmail || '');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync defaultEmail when modal opens
  React.useEffect(() => {
    if (defaultEmail && !email) {
      setEmail(defaultEmail);
    }
  }, [defaultEmail, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Login failed. Please check your credentials.');
        }

        localStorage.setItem('winter_arc_token', data.token);
        localStorage.setItem('winter_arc_user', JSON.stringify(data.user));

        onAuthSuccess(data.user);
        onClose();
      } else {
        if (!name.trim()) {
          throw new Error('Please enter your full name.');
        }

        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            password,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Sign up failed.');
        }

        localStorage.setItem('winter_arc_token', data.token);
        localStorage.setItem('winter_arc_user', JSON.stringify(data.user));

        onAuthSuccess(data.user);
        onClose();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Demo Login for Akshita (Admin)
  const handleAkshitaAdminQuickLogin = async () => {
    setEmail('Fitwithakshita@gmail.com');
    setPassword('akshita_admin_2026');
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Try login or register Akshita if first time
      let res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'Fitwithakshita@gmail.com',
          password: 'akshita_admin_2026',
        }),
      });

      let data = await res.json();

      if (!res.ok) {
        // Register if not yet in database
        res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Akshita Sahu',
            email: 'Fitwithakshita@gmail.com',
            phone: '+91 98765 43210',
            password: 'akshita_admin_2026',
          }),
        });
        data = await res.json();
      }

      if (data.token) {
        localStorage.setItem('winter_arc_token', data.token);
        localStorage.setItem('winter_arc_user', JSON.stringify(data.user));
        onAuthSuccess(data.user);
        onClose();
      } else {
        throw new Error(data.message || 'Admin login failed');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to auto-sign in as Akshita.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white text-stone-900 rounded-[32px] shadow-2xl p-6 sm:p-8 border border-[#EADBCC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#F3ECE1] text-stone-500 hover:text-stone-950 flex items-center justify-center transition-colors border border-[#EADBCC]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Program Badge */}
        <div className="flex items-center justify-center space-x-1.5 mb-4">
          <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-[10px] font-black font-mono shadow-xs">
            AS
          </div>
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-stone-500">
            BUILD WITH ME • MEMBER ACCESS
          </span>
        </div>

        {/* Tab Toggle: Sign In vs Create Account */}
        <div className="text-center mb-6">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#F6F1E8] border border-[#EADBCC] mb-4 w-full">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                mode === 'signin'
                  ? 'bg-[#1C1917] text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                mode === 'signup'
                  ? 'bg-[#1C1917] text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              Create Account
            </button>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight">
            {mode === 'signin' ? 'Welcome Back' : 'Create Your Athlete Account'}
          </h3>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed">
            {mode === 'signin'
              ? 'Sign in to access your My Weekly Gym Split schedule & resources'
              : 'Sign up to track your routine and join Build With Me'}
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Hunter"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-stone-900 focus:outline-none text-sm text-stone-900 placeholder-stone-400 font-medium transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@gmail.com"
                className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-stone-900 focus:outline-none text-sm text-stone-900 placeholder-stone-400 font-medium transition-colors"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1">
                +91 Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-stone-900 focus:outline-none text-sm text-stone-900 placeholder-stone-400 font-medium transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-200 bg-[#FAF8F5] focus:bg-white focus:border-stone-900 focus:outline-none text-sm text-stone-900 placeholder-stone-400 font-medium transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-[#1C1917] hover:bg-stone-800 text-white font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 disabled:opacity-50 mt-3"
          >
            {isLoading ? (
              <span>Connecting...</span>
            ) : (
              <>
                <span>{mode === 'signin' ? 'Sign In & Access Split' : 'Create Athlete Profile'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        {/* Coach Akshita Admin Shortcut */}
        <div className="pt-4 mt-5 border-t border-[#EADBCC]">
          <button
            type="button"
            onClick={handleAkshitaAdminQuickLogin}
            disabled={isLoading}
            className="w-full py-3 px-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200/90 text-amber-950 text-xs font-extrabold flex items-center justify-center space-x-2 transition-all shadow-xs active:scale-98"
          >
            <Crown className="w-4 h-4 text-amber-600 fill-amber-600 shrink-0" />
            <span>Admin Option: Sign in as Akshita Sahu</span>
          </button>
          <p className="text-[10px] text-stone-400 text-center mt-1.5 font-mono">
            Directly access live buyers & revenue dashboard from database
          </p>
        </div>
      </div>
    </div>
  );
};
