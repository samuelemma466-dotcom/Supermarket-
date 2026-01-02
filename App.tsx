import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CustomerHome from './pages/CustomerHome';
import AdminDashboard from './pages/AdminDashboard';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public/Entry Route */}
        <Route path="/login" element={<Login />} />

        {/* Customer Routes */}
        <Route path="/shop" element={<CustomerLayout />}>
          <Route index element={<CustomerHome />} />
          <Route path="cart" element={<CustomerHome />} />
          <Route path="profile" element={<CustomerHome />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminDashboard />} />
          <Route path="inventory" element={<AdminDashboard />} />
          <Route path="customers" element={<AdminDashboard />} />
        </Route>

        {/* Default Redirect to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;