import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import AuthLayout from '../components/layouts/AuthLayout';
import { toast } from 'sonner';
import { userApi } from '../config/api';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await userApi.resetPassword(token, formData.password);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to reset password');
      }

      toast.success('Password reset successful! You can now login with your new password.', {
        duration: 5000,
        className: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
        style: { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', borderColor: 'rgba(34, 197, 94, 0.2)' }
      });

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        className: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Create New <span className="text-gold">Password</span>
            </h1>
            <p className="text-gray-400">Enter your new password below</p>
          </div>

          <div className="bg-[#111] rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-gray-400 text-sm">
                    New Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                    placeholder="Enter your new password"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-400 text-sm">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gold text-black hover:bg-gold/90 transition-colors font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-black rounded-full animate-spin mr-2" />
                    Resetting password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
} 