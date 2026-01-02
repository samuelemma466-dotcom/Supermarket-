import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Store } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800">
      <nav className="bg-emerald-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Store className="h-8 w-8 text-emerald-100" />
              <span className="font-bold text-xl tracking-tight">SuperMarket Genius</span>
            </div>
            <div className="flex space-x-4">
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-500'
                  }`
                }
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Customer
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-500'
                  }`
                }
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Admin
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;