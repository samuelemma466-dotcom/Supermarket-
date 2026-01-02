import React, { useState, useEffect } from 'react';
import { fetchOrders, fetchStats } from '../services/db';
import { Order, Stats } from '../types';
import { DollarSign, ShoppingBag, Package, CheckCircle, Clock, Loader2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({ totalSales: 0, activeOrders: 0, totalProducts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [ordersData, statsData] = await Promise.all([
        fetchOrders(),
        fetchStats()
      ]);
      setOrders(ordersData);
      setStats(statsData);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
     return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
        </div>
     );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Row: Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sales Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Sales</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              ${stats.totalSales.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Orders</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {stats.activeOrders}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {stats.totalProducts}
            </h3>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <Package className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Main Section: Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4">
                    {order.status === 'Completed' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <Clock className="w-3.5 h-3.5" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;