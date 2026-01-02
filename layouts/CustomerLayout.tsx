import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, User, Store, LogOut } from 'lucide-react';

const CustomerLayout: React.FC = () => {
  const [userName, setUserName] = useState('Shopper');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
        setUserName(storedName.split(' ')[0]); // Get first name
    }
  }, []);

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    // Navigate back to login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="w-6 h-6 text-emerald-600" />
          <div>
            <span className="font-bold text-lg text-slate-800 tracking-tight block leading-none">FreshMarket</span>
            <span className="text-[10px] text-gray-500 font-medium">Hi, {userName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
            <button className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-1 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center min-w-[1.25rem]">
                3
              </span>
            </button>
            
            <div className="h-6 w-px bg-gray-200 mx-1"></div>

            <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                aria-label="Logout"
                title="Sign out"
            >
                <LogOut className="w-5 h-5" />
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 w-full max-w-lg mx-auto md:max-w-4xl lg:max-w-7xl">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 h-16 flex items-center justify-around z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <NavLink
          to="/shop"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs font-medium transition-colors p-2 rounded-lg ${
              isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-500'
            }`
          }
        >
          <Home className="w-6 h-6" />
          Home
        </NavLink>
        <NavLink
          to="/shop/cart"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs font-medium transition-colors p-2 rounded-lg ${
              isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-500'
            }`
          }
        >
          <ShoppingCart className="w-6 h-6" />
          Cart
        </NavLink>
        <NavLink
          to="/shop/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs font-medium transition-colors p-2 rounded-lg ${
              isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-500'
            }`
          }
        >
          <User className="w-6 h-6" />
          Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default CustomerLayout;