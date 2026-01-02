import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Package, Users, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to get page title based on path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('orders')) return 'Order Management';
    if (path.includes('inventory')) return 'Inventory Control';
    if (path.includes('customers')) return 'Customer Database';
    return 'Dashboard Overview';
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-20 shadow-xl transition-all duration-300">
        <div className="h-16 flex items-center px-6 font-bold text-white text-xl border-b border-slate-800 tracking-wider">
          ADMIN PANEL
        </div>

        <nav className="flex-1 py-6 space-y-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white border-r-4 border-emerald-500'
                  : 'hover:bg-slate-800 hover:text-white border-r-4 border-transparent'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white border-r-4 border-emerald-500'
                  : 'hover:bg-slate-800 hover:text-white border-r-4 border-transparent'
              }`
            }
          >
            <ClipboardList className="w-5 h-5" />
            Orders
          </NavLink>
          <NavLink
            to="/admin/inventory"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white border-r-4 border-emerald-500'
                  : 'hover:bg-slate-800 hover:text-white border-r-4 border-transparent'
              }`
            }
          >
            <Package className="w-5 h-5" />
            Inventory
          </NavLink>
          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white border-r-4 border-emerald-500'
                  : 'hover:bg-slate-800 hover:text-white border-r-4 border-transparent'
              }`
            }
          >
            <Users className="w-5 h-5" />
            Customers
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-4 py-2 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 z-10 sticky top-0">
          <h2 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right hidden sm:block">
              <div className="font-medium text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">Super Admin</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-100">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;