import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import {
  X,
  User,
  Crown,
  Flame,
  Calendar,
  CreditCard,
  LogOut,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const UserProfileDrawer = () => {
  const { user, isPro, token, logout, refreshUser } = useAuth();
  const { isProfileDrawerOpen, closeProfileDrawer, openProModal } = useWorkout();

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isProfileDrawerOpen && token) {
      fetchPaymentHistory();
    }
  }, [isProfileDrawerOpen, token]);

  const fetchPaymentHistory = async () => {
    setIsLoadingPayments(true);
    try {
      const res = await fetch(`${API_BASE}/payment/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setPaymentHistory(data.data || []);
      }
    } catch (err) {
      console.error('[Profile] Payment history fetch error:', err);
    } finally {
      setIsLoadingPayments(false);
    }
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshUser();
    await fetchPaymentHistory();
    setIsRefreshing(false);
  };

  if (!isProfileDrawerOpen || !user) return null;

  // Calculate days remaining
  let daysRemaining = 0;
  if (user.subscriptionEndDate && new Date(user.subscriptionEndDate) > new Date()) {
    const diffMs = new Date(user.subscriptionEndDate) - new Date();
    daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md h-full bg-obsidian-card border-l border-obsidian-border shadow-2xl flex flex-col overflow-hidden animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-obsidian-border bg-obsidian-elevated/40">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-lime" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-text">
              Athlete Profile & Membership
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="p-1.5 rounded-lg text-zinc-dim hover:text-white hover:bg-obsidian-elevated transition-colors"
              title="Refresh profile state"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={closeProfileDrawer}
              className="p-1.5 rounded-lg text-zinc-dim hover:text-white hover:bg-obsidian-elevated transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="overflow-y-auto p-5 space-y-5 flex-1">
          {/* User Card */}
          <div className="p-4 rounded-2xl bg-obsidian-elevated border border-obsidian-border flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime/20 to-lime/5 border border-lime/40 flex items-center justify-center text-lime font-black text-xl shadow-glow-lime-sm">
              {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white truncate">{user.name}</h3>
              <p className="text-xs text-zinc-subtext truncate font-mono">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded bg-obsidian-card border border-obsidian-border text-zinc-dim font-mono">
                  Goal: {user.goal || 'Hypertrophy'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono font-bold flex items-center space-x-1">
                  <Flame className="w-3 h-3 fill-amber-400" />
                  <span>{user.streak || 0} Streak</span>
                </span>
              </div>
            </div>
          </div>

          {/* Membership Status Box */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isPro
                ? 'bg-lime/5 border-lime/40 shadow-glow-lime-sm'
                : 'bg-obsidian-elevated border-obsidian-border'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase font-bold text-zinc-dim">
                CURRENT TIER
              </span>
              {isPro ? (
                <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-lime/20 text-lime text-xs font-bold font-mono">
                  <Crown className="w-3.5 h-3.5 fill-lime" />
                  <span>PRO ATHLETE</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-subtext text-xs font-mono">
                  FREE TIER
                </span>
              )}
            </div>

            {isPro ? (
              <div className="space-y-2 pt-1">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-white font-mono">
                    {daysRemaining} Days
                  </span>
                  <span className="text-xs text-zinc-subtext">Remaining in Billing Cycle</span>
                </div>
                <p className="text-xs text-zinc-dim">
                  Full 7-day protocol unlocked, including Back, Arms, and Legs & Shoulders.
                </p>
                {user.subscriptionEndDate && (
                  <div className="flex items-center space-x-1 text-[11px] text-zinc-dim font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Renews / expires: {new Date(user.subscriptionEndDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                <p className="text-xs text-zinc-subtext leading-relaxed">
                  You are currently on the Free Athlete Tier. Wednesday, Thursday, and Saturday are locked.
                </p>
                <button
                  onClick={() => {
                    closeProfileDrawer();
                    openProModal();
                  }}
                  className="w-full py-2.5 rounded-xl bg-lime hover:bg-lime-hover text-black font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-glow-lime transition-all"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
                  <span>Upgrade to Full 7-Day Split (₹299)</span>
                </button>
              </div>
            )}
          </div>

          {/* Past Razorpay Payment Receipts */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-dim flex items-center space-x-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Razorpay Receipt History</span>
              </h4>
              <span className="text-[10px] text-zinc-dim font-mono">
                {paymentHistory.length} Transactions
              </span>
            </div>

            {isLoadingPayments ? (
              <div className="py-6 text-center text-xs text-zinc-dim">
                Loading receipts...
              </div>
            ) : paymentHistory.length === 0 ? (
              <div className="p-4 rounded-xl bg-obsidian-elevated/40 border border-obsidian-border text-center text-xs text-zinc-dim">
                No past transactions recorded yet.
              </div>
            ) : (
              <div className="space-y-2">
                {paymentHistory.map((receipt) => (
                  <div
                    key={receipt.id}
                    className="p-3 rounded-xl bg-obsidian-elevated border border-obsidian-border flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono font-bold text-white">
                          ₹{receipt.amountINR}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono uppercase">
                          {receipt.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-dim font-mono mt-0.5 truncate max-w-[190px]">
                        ID: {receipt.paymentId}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-zinc-subtext block font-mono">
                        {new Date(receipt.date).toLocaleDateString()}
                      </span>
                      <span className="text-[9px] text-zinc-dim">30 Days Pro</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-obsidian-border bg-obsidian-elevated/30 flex items-center justify-between">
          <button
            onClick={() => {
              logout();
              closeProfileDrawer();
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <span className="text-[10px] text-zinc-dim font-mono">IRONPULSE PRO v1.0</span>
        </div>
      </div>
    </div>
  );
};
