import React, { useState, useEffect } from 'react';
import {
  X,
  Crown,
  Users,
  IndianRupee,
  RefreshCw,
  ShoppingBag,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminDashboardModal = ({ isOpen, onClose, token }) => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setIsLoading(true);
    setError('');
    try {
      const authToken = token || localStorage.getItem('winter_arc_token');
      const res = await fetch(`${API_BASE}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch admin stats');
      }

      setStats(data.stats);
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || 'Error loading dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStats();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 bg-amber-50/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-black text-amber-400 flex items-center justify-center shadow-md">
              <Crown className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black text-white font-black tracking-wider">
                  AKSHITA SAHU EXCLUSIVE
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  Fitwithakshita@gmail.com
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-gray-950 mt-0.5">
                Workout Plan Sales & Buyers Dashboard (@akshitaoffside_)
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
              title="Refresh Stats"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>TOTAL BUYERS</span>
                <Users className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-black text-gray-950 font-mono">
                {stats?.totalBuyers ?? 0}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold block">
                ✓ Recorded in MongoDB
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>TOTAL REVENUE</span>
                <IndianRupee className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-black text-emerald-600 font-mono">
                ₹{stats?.totalRevenueINR ?? 0}
              </div>
              <span className="text-[11px] text-gray-500 font-mono block">
                Razorpay Captured
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>UNIT PRICE</span>
                <ShoppingBag className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-3xl font-black text-gray-950 font-mono">
                ₹49
              </div>
              <span className="text-[11px] text-gray-500 font-mono block">
                Complete 12-Week Guide
              </span>
            </div>
          </div>

          {/* Buyers & Orders Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
                Recent Purchase Transactions ({orders.length})
              </h4>
              <span className="text-[11px] text-gray-500 font-mono">
                Live from Database
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-gray-200 text-center text-xs text-gray-400">
                No orders recorded yet. As athletes pay on your page, their transactions will appear here in real time.
              </div>
            ) : (
              <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-white hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-950 text-sm">
                          {order.buyerName}
                        </span>
                        <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                          {order.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 font-mono">
                        <span className="flex items-center space-x-1">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{order.buyerEmail}</span>
                        </span>
                        {order.buyerPhone && (
                          <span className="flex items-center space-x-1">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{order.buyerPhone}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 font-mono">
                        Payment ID: {order.paymentId}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-base font-black text-gray-950 font-mono block">
                        ₹{order.amountINR}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {new Date(order.date).toLocaleDateString()} at{' '}
                        {new Date(order.date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs transition-all"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
