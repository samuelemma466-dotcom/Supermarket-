import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Loader2, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      
      // Determine redirection based on email domain
      // If email contains '@admin.com', go to Admin Dashboard
      // Otherwise, go to Customer Shop
      if (email.toLowerCase().includes('@admin.com')) {
         // Keep localStorage for legacy component support (Layouts)
         localStorage.setItem('userName', 'Administrator');
         localStorage.setItem('userRole', 'admin');
         navigate('/admin');
      } else {
         localStorage.setItem('userName', email.split('@')[0]);
         localStorage.setItem('userRole', 'customer');
         navigate('/shop');
      }

    } catch (err: any) {
      console.error(err);
      // Simplify error message for user
      let msg = "Failed to authenticate.";
      if (err.code === 'auth/invalid-credential') msg = "Invalid email or password.";
      if (err.code === 'auth/email-already-in-use') msg = "Email already in use.";
      if (err.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";
      setError(msg);
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
              {isSignup 
                ? "Join us today and experience AI-powered shopping." 
                : "Welcome back! Access your personalized shopping experience."}
            </p>
          </div>

          <div className="relative z-10 mt-12">
             <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
                <p className="text-sm text-slate-300">
                    <span className="font-bold text-emerald-400">Pro Tip:</span> 
                    {isSignup ? " Use an email ending in @admin.com to create an admin account." : " Log in with your registered email to view your order history."}
                </p>
             </div>
          </div>

          {/* Abstract circles background */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center bg-gray-50">
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignup ? 'Create Account' : 'Sign In'}
            </h2>
            <p className="text-gray-500">
                {isSignup ? 'Enter your details to get started.' : 'Access your account securely.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {isSignup && <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
            >
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button 
                    onClick={() => { setIsSignup(!isSignup); setError(''); }}
                    className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors"
                >
                    {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
