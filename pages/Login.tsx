import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ShieldCheck, User, Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>('customer');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        // Authenticate with Firebase (Anonymous for demo resilience)
        await signInAnonymously(auth);
        
        // Store session info
        if (activeTab === 'customer') {
            localStorage.setItem('userName', formData.name || 'Valued Customer');
            localStorage.setItem('userRole', 'customer');
            navigate('/shop');
        } else {
            localStorage.setItem('userName', 'Administrator');
            localStorage.setItem('userRole', 'admin');
            navigate('/admin');
        }
    } catch (error: any) {
        console.warn("Login fallback used due to:", error.message);
        // Fallback navigation
        const path = activeTab === 'customer' ? '/shop' : '/admin';
        navigate(path);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Left Side: Brand & Visual */}
        <div className="md:w-1/2 bg-slate-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex p-3 bg-emerald-500/20 backdrop-blur-sm rounded-xl mb-6 border border-emerald-500/30">
              <Store className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">FreshMarket <span className="text-emerald-400">Genius</span></h1>
            <p className="text-slate-400 text-lg">
              Experience the future of grocery shopping with our AI-powered dual-interface platform.
            </p>
          </div>

          <div className="relative z-10 mt-12 space-y-4">
             <div className="flex items-center gap-4 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-emerald-400" />
                </div>
                <span>Customer Shopping Portal</span>
             </div>
             <div className="flex items-center gap-4 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                </div>
                <span>Admin Management Dashboard</span>
             </div>
          </div>

          {/* Abstract circles background */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center bg-gray-50">
          
          {/* Tabs */}
          <div className="flex p-1 bg-white border border-gray-200 rounded-xl mb-8">
            <button
              onClick={() => setActiveTab('customer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'customer' 
                  ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4" /> Customer
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'admin' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                    {activeTab === 'customer' ? 'Hello, Shopper!' : 'Welcome Back'}
                </h2>
                <p className="text-gray-500 text-sm">
                    {activeTab === 'customer' 
                        ? 'Enter your details to start your fresh journey.' 
                        : 'Please sign in to access the dashboard.'}
                </p>
            </div>

            <div className="space-y-4">
                {activeTab === 'customer' ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="text"
                                required
                                placeholder="e.g. Alex Smith"
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="email"
                                    required
                                    placeholder="admin@freshmarket.com"
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed ${
                    activeTab === 'customer' 
                        ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' 
                        : 'bg-slate-800 hover:bg-slate-900 shadow-slate-200'
                }`}
            >
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        {activeTab === 'customer' ? 'Start Shopping' : 'Login to Dashboard'}
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;