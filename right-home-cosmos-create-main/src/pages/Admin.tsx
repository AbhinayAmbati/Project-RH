import React, { useEffect } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import AdminSidebar from '@/components/ui/AdminSidebar';
import Dashboard from '@/components/admin/Dashboard';
import Users from '@/components/admin/Users';
import Consultations from '@/components/admin/Consultations';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <AdminSidebar />
      
      <div className="pl-64 pt-20">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="consultations" element={<Consultations />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin; 