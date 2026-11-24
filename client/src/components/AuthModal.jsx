import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Target,
  ArrowRight,
  ShieldCheck,
  Dumbbell,
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    closeAuthModal,
    login,
    signup,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('Hypertrophy');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, text: 'Empty', color: 'bg-zinc-700' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 1:
        return { score: 25, text: 'Weak', color: 'bg-red-500' };
      case 2:
        return { score: 50, text: 'Fair', color: 'bg-amber-500' };
      case 3:
        return { score: 75, text: 'Good', color: 'bg-lime' };
      case 4:
      default:
        return { score: 100, text: 'Strong', color: 'bg-emerald-400' };
    }
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (authModalMode === 'login') {
        const result = await login(email, password);
        if (!result.success) {
          setErrorMessage(result.message || 'Login failed');
        }
      } else {
        if (!name.trim()) {
          setErrorMessage('Please enter your full name');
          setIsLoading(false);
          return;
        }
        const result = await signup(name, email, password, goal);
        if (!result.success) {
          setErrorMessage(result.message || 'Sign up failed');
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-obsidian-card border border-obsidian-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-obsidian-elevated hover:bg-obsidian-border text-zinc-dim hover:text-white flex items-center justify-center transition-colors border border-obsidian-border"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="pt-6 px-6 pb-2">
          <div className="flex items-center space-x-2 justify-center mb-4">
            <div className="w-9 h-9 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center text-lime">
              <Dumbbell className="w-5 h-5 text-lime" />
            </div>
            <span className="font-extrabold text-lg text-white">IRONPULSE PRO</span>
          </div>

          <div className="grid grid-cols-2 p-1 rounded-xl bg-obsidian-elevated border border-obsidian-border">
            <button
              onClick={() => {
                setAuthModalMode('login');
                setErrorMessage('');
              }}
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                authModalMode === 'login'
                  ? 'bg-lime text-black shadow-glow-lime-sm'
                  : 'text-zinc-subtext hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthModalMode('signup');
                setErrorMessage('');
              }}
              className={`py-2 rounded-lg text-xs font-bold transition-all ${
                authModalMode === 'signup'
                  ? 'bg-lime text-black shadow-glow-lime-sm'
                  : 'text-zinc-subtext hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              {errorMessage}
            </div>
          )}

          {authModalMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-dim mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-dim">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Hunter"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border focus:border-lime focus:outline-none text-sm text-white placeholder-zinc-dim transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-dim mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-dim">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@ironpulse.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border focus:border-lime focus:outline-none text-sm text-white placeholder-zinc-dim transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-dim mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-dim">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-obsidian-elevated border border-obsidian-border focus:border-lime focus:outline-none text-sm text-white placeholder-zinc-dim transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-dim hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Meter (on Sign Up) */}
            {authModalMode === 'signup' && password.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-[10px] text-zinc-dim font-mono mb-1">
                  <span>Strength: {strength.text}</span>
                  <span>{password.length}/6+ chars</span>
                </div>
                <div className="w-full bg-obsidian-elevated h-1 rounded-full overflow-hidden border border-obsidian-border">
                  <div
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {authModalMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-dim mb-1">
                Primary Fitness Goal
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Hypertrophy', 'Strength', 'Fat Loss'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      goal === g
                        ? 'bg-lime/10 border-lime text-lime'
                        : 'bg-obsidian-elevated border-obsidian-border text-zinc-subtext hover:border-zinc-dim'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {authModalMode === 'login' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 text-zinc-subtext cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-obsidian-elevated border-obsidian-border text-lime focus:ring-lime"
                />
                <span>Remember me</span>
              </label>
              <span className="text-zinc-dim hover:text-zinc-text cursor-pointer">
                Forgot password?
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-lime hover:bg-lime-hover text-black font-extrabold text-sm tracking-wide flex items-center justify-center space-x-2 shadow-glow-lime transition-all active:scale-98 disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {authModalMode === 'login' ? 'Enter Training Zone' : 'Start Free Athlete Plan'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-zinc-dim text-center pt-1">
            {authModalMode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('signup')}
                  className="text-lime hover:underline font-semibold"
                >
                  Create one free
                </button>
              </>
            ) : (
              <>
                Already have an athlete profile?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="text-lime hover:underline font-semibold"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};
