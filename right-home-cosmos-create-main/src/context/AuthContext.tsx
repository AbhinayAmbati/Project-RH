import React, { createContext, useContext, useState, useEffect } from 'react';
import { userApi } from '../config/api';
import Cookies from 'js-cookie';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(Cookies.get('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let retryCount = 0;
    let mounted = true;

    const initAuth = async () => {
      const storedToken = Cookies.get('token');
      if (!storedToken) {
        if (mounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await userApi.getProfile();
        
        if (!mounted) return;

        if (response.success && response.data) {
          setUser(response.data);
          setToken(storedToken);
        } else {
          console.error('Failed to get user profile:', response.message);
          Cookies.remove('token');
          setToken(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        
        if (!mounted) return;

        if (retryCount < MAX_RETRIES) {
          retryCount++;
          console.log(`Retrying authentication (${retryCount}/${MAX_RETRIES})...`);
          setTimeout(initAuth, RETRY_DELAY);
          return;
        }

        Cookies.remove('token');
        setToken(null);
        setUser(null);
        setError('Unable to connect to the server. Please try again later.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await userApi.login(email, password);

      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }

      // Set the token in cookies with secure options
      Cookies.set('token', response.token, {
        expires: 30, // 30 days
        secure: window.location.protocol === 'https:', // Only send cookie over HTTPS in production
        sameSite: 'strict'
      });

      setToken(response.token);
      setUser(response.data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 
        'Unable to connect to the server. Please check your internet connection and try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await userApi.register(userData);

      if (!response.success) {
        throw new Error(response.message || 'Registration failed');
      }

      setError(null);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 
        'Unable to connect to the server. Please check your internet connection and try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await userApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('token');
      setToken(null);
      setUser(null);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await userApi.forgotPassword(email);

      if (!response.success) {
        throw new Error(response.message || 'Failed to send reset email');
      }

      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 
        'Unable to connect to the server. Please check your internet connection and try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    forgotPassword,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 