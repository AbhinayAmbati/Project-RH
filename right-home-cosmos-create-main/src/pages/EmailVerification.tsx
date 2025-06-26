import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import AuthLayout from '../components/layouts/AuthLayout';
import { API_URL } from '../config/api';

export default function EmailVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !email) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        console.log('Verifying email with:', { token, email }); // Debug log
        const response = await fetch(`${API_URL}/users/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            verificationToken: token,
            email: email
          }),
        });

        const data = await response.json();
        console.log('Verification response:', data); // Debug log

        if (!response.ok) {
          throw new Error(data.message || 'Verification failed');
        }

        setStatus('success');
        setMessage('Email verified successfully');

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Email verified successfully. You can now login.' }
          });
        }, 3000);
      } catch (err) {
        console.error('Verification error:', err); // Debug log
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Verification failed');
      }
    };

    // Start verification immediately if we have token and email
    if (token && email) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('Please check your email for the verification link');
    }
  }, [token, email, navigate]);

  const handleRetryVerification = () => {
    if (token && email) {
      setStatus('verifying');
      setMessage('');
      // Re-trigger the verification process
      const verifyEmail = async () => {
        try {
          const response = await fetch(`${API_URL}/users/verify-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              verificationToken: token,
              email: email
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Verification failed');
          }

          setStatus('success');
          setMessage('Email verified successfully');

          setTimeout(() => {
            navigate('/login', { 
              state: { message: 'Email verified successfully. You can now login.' }
            });
          }, 3000);
        } catch (err) {
          setStatus('error');
          setMessage(err instanceof Error ? err.message : 'Verification failed');
        }
      };
      verifyEmail();
    }
  };

  return (
    <AuthLayout>
      <Card className="glass-effect border-0 w-full max-w-md mx-auto">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-bold text-center">
            {status === 'verifying' && (
              <span>Verifying Your <span className="text-gradient">Email</span></span>
            )}
            {status === 'success' && (
              <span>Email <span className="text-gradient">Verified</span></span>
            )}
            {status === 'error' && (
              <span>Verification <span className="text-gradient">Failed</span></span>
            )}
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            {status === 'verifying' && 'Please wait while we verify your email address'}
            {status === 'success' && 'You will be redirected to login'}
            {status === 'error' && 'There was a problem verifying your email'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
            <div className="flex justify-center space-x-4">
              {token && email ? (
                <Button 
                  onClick={handleRetryVerification}
                  className="bg-gold-gradient text-space-dark hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Retry Verification
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate('/login')}
                  className="bg-gold-gradient text-space-dark hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Return to Login
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  );
} 