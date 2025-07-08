import Cookies from 'js-cookie';

export const API_URL = import.meta.env.VITE_API_URI;


interface UserData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
  currentPassword?: string;
  newPassword?: string;
  requireEmailVerification?: boolean;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  token?: string;
  requiresEmailVerification?: boolean;
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const getAuthHeaders = () => {
  const token = Cookies.get('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const userApi = {
  // Authentication
  register: async (userData: UserData): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (email: string, password: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  logout: async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  // Profile Management
  getProfile: async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  updateProfile: async (userData: UserData): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/update-profile`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Password Management
  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ oldPassword: currentPassword, newPassword }),
    });
    return response.json();
  },

  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password: newPassword }),
    });
    return response.json();
  },

  // Email Verification
  verifyEmail: async (token: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    return response.json();
  },

  verifyEmailChange: async (token: string, email: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/verify-email-change`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ token, email }),
    });
    return response.json();
  },

  // Account Management
  deleteAccount: async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/users/delete-account`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
}; 
