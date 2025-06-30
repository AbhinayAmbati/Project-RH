import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import AuthLayout from '../components/layouts/AuthLayout';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await forgotPassword(email);
      toast.success('Check your email for password reset instructions', {
        duration: 5000,
        className: 'bg-green-500/10 border-green-500/20 text-green-400',
      });
      setEmail(''); // Clear the form
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        className: 'bg-red-500/10 border-red-500/20 text-red-400',
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
              Reset Your <span className="text-gold">Password</span>
            </h1>
            <p className="text-gray-400">Enter your email to receive reset instructions</p>
          </div>

          <div className="bg-[#111] rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-400 text-sm">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gold text-black hover:bg-gold/90 transition-colors font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-black rounded-full animate-spin mr-2" />
                    Sending reset link...
                  </div>
                ) : (
                  'Send reset link'
                )}
              </Button>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Remember your password?{' '}
                  <Link to="/login" className="text-gold hover:text-gold/80 transition-colors font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
} 