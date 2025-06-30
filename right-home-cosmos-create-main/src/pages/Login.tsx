import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import AuthLayout from '../components/layouts/AuthLayout';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!', {
        duration: 3000,
        className: 'bg-green-50 text-green-800 border-2 border-green-500/20',
        position: 'top-center',
      });
      navigate('/profile');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        className: 'bg-[#1a0a0a] text-red-400 border-2 border-red-500/20',
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome to <span className="text-gold">RightHome</span>
            </h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-[#111] rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-400 text-sm">Email Address</Label>
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

                <div>
                  <Label htmlFor="password" className="text-gray-400 text-sm">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
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
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>

              <div className="space-y-4">
                <div className="text-center">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-gold hover:text-gold/80 transition-colors font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}