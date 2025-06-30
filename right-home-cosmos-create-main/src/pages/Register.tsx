import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import AuthLayout from '../components/layouts/AuthLayout';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
    setIsLoading(true);

    try {
      console.log('Starting registration process...'); // Debug

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        console.log('Password mismatch error'); // Debug
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }

      // Validate password strength
      if (formData.password.length < 8) {
        console.log('Password too short error'); // Debug
        toast.error('Password must be at least 8 characters long');
        setIsLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        console.log('Invalid email error'); // Debug
        toast.error('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      // Validate phone number
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        console.log('Invalid phone error'); // Debug
        toast.error('Please enter a valid phone number');
        setIsLoading(false);
        return;
      }

      console.log('All validations passed, calling register API...'); // Debug

      const { confirmPassword, ...registerData } = formData;
      
      // Store email before making the API call
      setRegisteredEmail(formData.email);
      console.log('Email stored:', formData.email); // Debug
      
      const result = await register(registerData);
      console.log('Register API result:', result); // Debug
      
      // The register function might be showing its own toast, let's suppress it
      // and show our dialog instead
      console.log('Setting showSuccessDialog to true...'); // Debug
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
      
      console.log('Registration flow completed successfully'); // Debug
      
    } catch (err) {
      console.error('Registration error:', err); // Debug
      const errorMsg = err instanceof Error ? err.message : 'Registration failed';
      
      // Check if this is actually a success message being thrown as an error
      if (errorMsg.includes('Registration successful')) {
        console.log('Success message detected, showing dialog instead of error');
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
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Debug log to see current state
  console.log('Component render - showSuccessDialog:', showSuccessDialog, 'registeredEmail:', registeredEmail);

  // Test button to manually trigger dialog (for debugging)
  const testDialog = () => {
    console.log('Test button clicked');
    setRegisteredEmail('test@example.com');
    setShowSuccessDialog(true);
  };

  return (
    <AuthLayout>
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-8">
        {/* Debug Dialog - This should always show if showSuccessDialog is true */}
        <Dialog open={showSuccessDialog} onOpenChange={(open) => {
          console.log('Dialog onOpenChange called with:', open);
          setShowSuccessDialog(open);
        }}>
          <DialogContent className="sm:max-w-[425px] bg-green-50 border-2 border-green-500/20">
            <DialogHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <DialogTitle className="text-2xl font-bold text-green-800 text-center">
                Registration Successful!
              </DialogTitle>
              
              <DialogDescription className="text-green-700 text-center space-y-4">
                <p className="text-base">
                  Please check your email to verify your account.
                </p>
                
                <div className="bg-white px-4 py-2 rounded-lg border border-green-200">
                  <span className="font-semibold text-green-800 break-all">
                    {registeredEmail || 'No email stored'}
                  </span>
                </div>
                
                <div className="bg-green-100 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Next Steps:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Check your email inbox</li>
                    <li>Click the verification link</li>
                    <li>Return here to sign in</li>
                  </ol>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-6 space-y-2">
              <Button
                onClick={() => {
                  console.log('Continue to Login clicked');
                  navigate('/login');
                }}
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                Continue to Login
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Join <span className="text-gold">RightHome</span>
            </h1>
            <p className="text-gray-400">Create your account to get started</p>
          </div>


          <div className="bg-[#111] rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-400">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-400">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-400">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-400">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-400">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="mt-1 h-12 bg-[#0A0A0A] border border-gray-800 text-white focus:border-gold/50"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gold text-black hover:bg-gold/90 transition-colors"
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

              <div className="text-center mt-4">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-gold hover:text-gold/80">
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