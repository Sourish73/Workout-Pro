import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SignInModal = ({ isOpen, onClose, onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess(email || 'athlete@winterarc.com');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white text-gray-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-gray-950">
            Sign In to View Schedule
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Access your purchased Winter Arc 7-Day Protocol
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@winterarc.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
              Password or Access PIN
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:outline-none text-sm text-gray-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-black hover:bg-gray-800 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Verifying Access...</span>
            ) : (
              <>
                <span>Sign In & Unlock Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              onSignInSuccess('demo.athlete@winterarc.com');
              onClose();
            }}
            className="w-full py-2.5 rounded-2xl border border-dashed border-gray-300 hover:bg-gray-50 text-xs text-gray-600 font-semibold transition-all"
          >
            Instant Unlock (Demo / Test Mode)
          </button>
        </form>
      </div>
    </div>
  );
};
