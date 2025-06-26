import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import AuthLayout from '../components/layouts/AuthLayout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

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

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate phone number
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      
      // Store the email for the success dialog
      setRegisteredEmail(formData.email);
      
      // Show success dialog
      setShowSuccessDialog(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      setShowSuccessDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-8">
        {!showSuccessDialog ? (
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">
                Join <span className="text-gold">RightHome</span>
              </h1>
              <p className="text-gray-400">Create your account to get started</p>
            </div>

            {/* Registration Form */}
            <div className="bg-[#111] rounded-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-400 text-sm">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-400 text-sm">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-400 text-sm">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-gray-400 text-sm">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-gray-400 text-sm">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-400 text-sm">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
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
                      Creating account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-gold hover:text-gold/80 transition-colors font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-[#111] border-0 text-white w-[90vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              <span className="text-gold">Verify Your Email</span>
            </DialogTitle>
            <DialogDescription className="text-gray-400 space-y-4 pt-4">
              <p className="text-sm">
                Thank you for registering! We've sent a verification link to{' '}
                <span className="text-gold font-medium">{registeredEmail}</span>
              </p>
              <div className="bg-[#0A0A0A] p-3 rounded-lg">
                <h4 className="font-medium text-gold mb-2 text-sm">Next steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the verification link in the email</li>
                  <li>Return to sign in once verified</li>
                </ol>
              </div>
              <p className="text-xs">
                Didn't receive the email? Check your spam folder or contact support.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
                setShowSuccessDialog(false);
                navigate('/login');
              }}
              className="bg-gold text-black hover:bg-gold/90 transition-colors font-medium text-sm px-6"
            >
              Go to Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AuthLayout>
  );
}