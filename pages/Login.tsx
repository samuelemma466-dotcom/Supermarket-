import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ShieldCheck, User, Loader2 } from 'lucide-react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (path: string) => {
    setLoading(true);
    try {
        // Attempt anonymous auth
        await signInAnonymously(auth);
        navigate(path);
    } catch (error: any) {
        // Log the error for debugging but do not block the user
        console.warn("Authentication skipped/failed (using offline mode):", error.message);
        
        // In a real app, you might want to block access, but for this demo 
        // with static fallback data, we allow the user to proceed.
        // This specifically handles 'auth/admin-restricted-operation' which happens
        // if Anonymous Auth is disabled in the Firebase Console.
        navigate(path);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-emerald-100 rounded-full mb-2">
            <Store className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome to FreshMarket</h1>
          <p className="text-gray-500">Choose your portal to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('/shop')}
            disabled={loading}
            className="w-full group relative flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <User className="w-6 h-6" />}
            Continue as Customer
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Staff Access</span>
            </div>
          </div>

          <button
            onClick={() => handleLogin('/admin')}
            disabled={loading}
            className="w-full group flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-900 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />}
            Admin Login
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          © 2024 FreshMarket Systems. Secure Connection.
        </p>
      </div>
    </div>
  );
};

export default Login;