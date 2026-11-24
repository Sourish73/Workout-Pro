import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ironpulse_token') || null);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'
  const [postAuthCallback, setPostAuthCallback] = useState(null);

  // Fetch current user from /api/auth/me
  const refreshUser = useCallback(async (authToken = token) => {
    if (!authToken) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return data.user;
      } else {
        // Invalid or expired token
        localStorage.removeItem('ironpulse_token');
        setToken(null);
        setUser(null);
        return null;
      }
    } catch (err) {
      console.error('[AuthContext] Error fetching profile:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('ironpulse_token', data.token);
      setToken(data.token);
      setUser(data.user);
      setIsAuthModalOpen(false);

      if (typeof postAuthCallback === 'function') {
        postAuthCallback(data.user);
        setPostAuthCallback(null);
      }

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const signup = async (name, email, password, goal) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, goal }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('ironpulse_token', data.token);
      setToken(data.token);
      setUser(data.user);
      setIsAuthModalOpen(false);

      if (typeof postAuthCallback === 'function') {
        postAuthCallback(data.user);
        setPostAuthCallback(null);
      }

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('ironpulse_token');
    setToken(null);
    setUser(null);
  };

  const openAuthModal = (mode = 'login', callback = null) => {
    setAuthModalMode(mode);
    setPostAuthCallback(() => callback);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPostAuthCallback(null);
  };

  const isPro = Boolean(
    user &&
    user.subscriptionStatus === 'active' &&
    user.subscriptionEndDate &&
    new Date(user.subscriptionEndDate) > new Date()
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isPro,
        login,
        signup,
        logout,
        refreshUser,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
