import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { userApi } from '../config/api';
import Navigation from '../components/Navigation';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await userApi.logout();
      logout();
      navigate('/login');
    } catch (err) {
      setError('Failed to logout');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />

      <div className="py-12 mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-[#111] border-gray-800">
            <CardHeader className="pb-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-gold text-black text-xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-6">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Phone Number</p>
                  <p className="text-white">{user.phone || 'Not provided'}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Address</p>
                  <p className="text-white">{user.address || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  onClick={() => navigate('/settings')}
                  className="bg-gold text-black hover:bg-gold/90 transition-colors font-medium"
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
