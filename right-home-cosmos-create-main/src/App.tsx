import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/EmailVerification';
import EmailChangeVerification from './pages/EmailChangeVerification';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import Profile from './pages/Profile';
import Settings from './components/Settings';
import Admin from '@/pages/Admin';
import Architecture from './pages/products/Architecture';
import Interiors from './pages/products/Interiors';
import Furniture from './pages/products/Furniture';
import Construction from './pages/products/Construction';
import Kitchens from './pages/products/Kitchens';
import Engineering from './pages/products/Engineering';
import Lifts from './pages/products/Lifts';
import Tiles from './pages/products/Tiles';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Public route wrapper (accessible only when not authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/verify-email-change" element={<EmailChangeVerification />} />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />  
          <Route path='/' element={<Index />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />

          {/* Product Routes */}
          <Route path="/products/architecture" element={<Architecture />} />
          <Route path="/products/interiors" element={<Interiors />} />
          <Route path="/products/furniture" element={<Furniture />} />
          <Route path="/products/construction" element={<Construction />} />
          <Route path="/products/kitchens" element={<Kitchens />} />
          <Route path="/products/engineering" element={<Engineering />} />
          <Route path="/products/lifts" element={<Lifts />} />
          <Route path="/products/tiles" element={<Tiles />} />

          {/* Add more routes as needed */}
        </Routes>
        <Toaster 
          position="top-right"
          expand={false}
          closeButton
          style={{
            marginTop: '4rem'
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
