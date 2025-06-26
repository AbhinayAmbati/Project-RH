import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Settings as SettingsIcon, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { userApi } from '@/config/api';
import Navigation from './Navigation';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // UI state
  const [error, setError] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(true);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessDialog(true);
    toast.success(message);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setEmailVerificationSent(false);

    try {
      const isEmailChanged = profileData.email !== user?.email;
      
      const response = await userApi.updateProfile({
        ...profileData,
        requireEmailVerification: isEmailChanged
      });
      
      // Check if response exists and handle both success cases
      if (response) {
        if (response.requiresEmailVerification) {
          setEmailVerificationSent(true);
          showSuccess('Profile updated. Please check your email to verify your new email address.');
          toast.info('Verification email sent. Please check your inbox.');
        } else if (response._id) { // Check if we got a successful response with user data
          showSuccess('Profile updated successfully');
          // Update the form with the returned data
          setProfileData({
            name: response.name || profileData.name,
            email: response.email || profileData.email,
            phone: response.phone || profileData.phone,
            address: response.address || profileData.address,
          });
          setShowProfileForm(false);
        } else if (response.message) { // If we got an error message
          throw new Error(response.message);
        } else {
          throw new Error('Unexpected response from server');
        }
      } else {
        throw new Error('No response received from server');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      const errorMessage = 'New passwords do not match';
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    try {
      const response = await userApi.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (!response.success) {
        throw new Error(response.message || 'Failed to change password');
      }

      showSuccess('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      toast.success('Password changed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to change password';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await userApi.deleteAccount();

      if (!response.success) {
        throw new Error(response.message || 'Failed to delete account');
      }

      showSuccess('Account deleted successfully');
      toast.success('Account deleted successfully');
      // Wait for dialog to be visible before redirecting
      setTimeout(() => {
        logout();
        navigate('/');
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete account';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    // Reset forms visibility if needed
    if (!emailVerificationSent) {
      setShowProfileForm(true);
      setShowPasswordForm(true);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Success Dialog with Green Theme */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-green-50 border-green-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Success!
            </DialogTitle>
            <DialogDescription className="text-green-700 text-base">
              {successMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleCloseSuccessDialog}
              className="bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-[#0A0A0A]">
        <Navigation />
        
        <div className="py-12 mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Profile Settings */}
            <Card className="bg-[#111] border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                {showProfileForm ? (
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="bg-[#0A0A0A] border-gray-800 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-400">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="bg-[#0A0A0A] border-gray-800 text-white"
                        />
                        {emailVerificationSent && (
                          <p className="text-sm text-gold mt-1">
                            Verification email sent. Please check your inbox.
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-400">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="bg-[#0A0A0A] border-gray-800 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-gray-400">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={profileData.address}
                          onChange={handleProfileChange}
                          className="bg-[#0A0A0A] border-gray-800 text-white"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="bg-gold text-black hover:bg-gold/90 transition-colors font-medium"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Profile'}
                    </Button>
                  </form>
                ) : (
                  <div className="flex justify-center">
                    <Button
                      onClick={() => setShowProfileForm(true)}
                      className="bg-gold text-black hover:bg-gold/90"
                    >
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card className="bg-[#111] border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                {showPasswordForm ? (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-gray-400">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="bg-[#0A0A0A] border-gray-800 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-gray-400">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="bg-[#0A0A0A] border-gray-800 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-gray-400">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="bg-[#0A0A0A] border-gray-800 text-white"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="bg-gold text-black hover:bg-gold/90 transition-colors font-medium"
                      disabled={loading}
                    >
                      {loading ? 'Changing Password...' : 'Change Password'}
                    </Button>
                  </form>
                ) : (
                  <div className="flex justify-center">
                    <Button
                      onClick={() => setShowPasswordForm(true)}
                      className="bg-gold text-black hover:bg-gold/90"
                    >
                      Change Password
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delete Account */}
            <Card className="bg-[#111] border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center space-x-2">
                  <Trash2 className="w-5 h-5 text-red-500" />
                  <span>Delete Account</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showDeleteConfirm ? (
                  <div>
                    <p className="text-gray-400 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button
                      onClick={() => setShowDeleteConfirm(true)}
                      variant="destructive"
                      className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      Delete Account
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
                      <AlertDescription className="text-red-400">
                        Are you absolutely sure you want to delete your account? This action cannot be undone.
                      </AlertDescription>
                    </Alert>
                    <div className="space-x-4">
                      <Button
                        onClick={handleDeleteAccount}
                        disabled={loading}
                        variant="destructive"
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                        {loading ? 'Deleting...' : 'Yes, Delete My Account'}
                      </Button>
                      <Button
                        onClick={() => setShowDeleteConfirm(false)}
                        variant="outline"
                        className="border-gray-800 text-gray-400 hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;