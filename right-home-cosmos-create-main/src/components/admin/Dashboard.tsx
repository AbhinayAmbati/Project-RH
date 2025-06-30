import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { API_URL } from '@/config/api';
import Cookies from 'js-cookie';

interface Stats {
  totalUsers: number;
  totalConsultations: number;
  pendingConsultations: number;
  completedConsultations: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalConsultations: 0,
    pendingConsultations: 0,
    completedConsultations: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = Cookies.get('token');
        const response = await fetch(`${API_URL}/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#111] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#111] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Consultations</CardTitle>
            <MessageSquare className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalConsultations}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#111] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.pendingConsultations}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#111] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.completedConsultations}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 