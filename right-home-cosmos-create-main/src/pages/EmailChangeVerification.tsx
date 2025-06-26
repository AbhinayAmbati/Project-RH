import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import AuthLayout from '../components/layouts/AuthLayout';
import { userApi } from '../config/api';

export default function EmailChangeVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const encodedEmail = searchParams.get('email');
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : null;

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmailChange = async () => {
      if (!token || !email) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        console.log('Verifying with:', { token, email }); // Debug log
        const response = await userApi.verifyEmailChange(token, email);

        if (!response.success) {
          throw new Error(response.message || 'Verification failed');
        }

        setStatus('success');
        setMessage('Email updated successfully');

        // Redirect to profile after 3 seconds
        setTimeout(() => {
          navigate('/profile', { 
            state: { message: 'Email updated successfully.' }
          });
        }, 3000);
      } catch (err) {
        console.error('Verification error:', err);
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Verification failed');
      }
    };

    // Start verification immediately if we have token and email
    if (token && email) {
      verifyEmailChange();
    } else {
      setStatus('error');
      setMessage('Invalid verification link');
    }
  }, [token, email, navigate]);

  return (
    <AuthLayout>
      <Card className="glass-effect border-0 w-full max-w-md mx-auto">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-bold text-center">
            {status === 'verifying' && (
              <span>Verifying Your <span className="text-gradient">New Email</span></span>
            )}
            {status === 'success' && (
              <span>Email <span className="text-gradient">Updated</span></span>
            )}
            {status === 'error' && (
              <span>Verification <span className="text-gradient">Failed</span></span>
            )}
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            {status === 'verifying' && 'Please wait while we verify your new email address'}
            {status === 'success' && 'You will be redirected to your profile'}
            {status === 'error' && 'There was a problem verifying your new email'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'verifying' && (
            <div className="flex justify-center py-8">
              <div className="w-16 h-16 border-t-4 border-gold rounded-full animate-spin"></div>
            </div>
          )}
          {(status === 'success' || status === 'error') && (
            <Alert 
              variant={status === 'success' ? 'default' : 'destructive'}
              className={status === 'success' ? 
                'bg-green-500/10 border-green-500/20 text-green-400' : 
                'bg-red-500/10 border-red-500/20 text-red-400'
              }
            >
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          {status === 'error' && (
            <div className="flex justify-center mt-4">
              <Button 
                onClick={() => navigate('/settings')}
                className="bg-gold-gradient text-space-dark hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Return to Settings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  );
} 