import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CustomerShop from './pages/CustomerShop';
import AdminDashboard from './pages/AdminDashboard';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import { AuthProvider, useAuth } from './context/AuthContext';

// Component to protect routes requiring authentication
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  
  // If no user is logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected content
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Public/Entry Route */}
          <Route path="/login" element={<Login />} />

          {/* Customer Routes - Protected */}
          <Route path="/shop" element={
            <ProtectedRoute>
              <CustomerLayout />
            </ProtectedRoute>
          }>
            <Route index element={<CustomerShop />} />
            <Route path="cart" element={<CustomerShop />} />
            <Route path="profile" element={<CustomerShop />} />
          </Route>

          {/* Admin Routes - Protected */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminDashboard />} />
            <Route path="inventory" element={<AdminDashboard />} />
            <Route path="customers" element={<AdminDashboard />} />
          </Route>

          {/* Default Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;