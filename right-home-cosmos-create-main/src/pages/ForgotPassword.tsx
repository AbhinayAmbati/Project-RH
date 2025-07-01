import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import AuthLayout from '../components/layouts/AuthLayout';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
  
    try {
      await forgotPassword(email);
      setSentEmail(email);
      setShowSuccessDialog(true);
      setEmail(''); // Clear the form
      setSuccess('Password reset email sent');
      toast.success('Password reset email sent', {
        duration: 5000,
        className: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        className: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-8">
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-[425px] bg-green-50 border-2 border-green-500/20">
            <DialogHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <DialogTitle className="text-2xl font-bold text-green-800 text-center">
                Reset Link Sent!
              </DialogTitle>
              
              <DialogDescription className="text-green-700 text-center space-y-4">
                <p className="text-base">
                  Please check your email for password reset instructions.
                </p>
                
                <div className="bg-white px-4 py-2 rounded-lg border border-green-200">
                  <span className="font-semibold text-green-800 break-all">
                    {sentEmail}
                  </span>
                </div>
                
                <div className="bg-green-100 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Next Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Check your email inbox</li>
                    <li>Click the reset password link</li>
                    <li>Set your new password</li>
                  </ol>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-6 space-y-2">
              <Button
                onClick={() => {
                  setShowSuccessDialog(false);
                  navigate('/login');
                }}
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                Return to Login
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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
              
              {success && (
                <Alert className="bg-green-500/10 border-green-500/20 text-green-400">
                  <AlertDescription>{success}</AlertDescription>
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