import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginCredentials, FormData } from '@/Types/auth';
import { refreshToken, loginCompany, registerCompany, logoutUser, validateToken } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: FormData) => Promise<void>;
  logout: () => Promise<void>;
  validate: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    isAuthenticated: false,
  });
  const [refreshTimerId, setRefreshTimerId] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Validate token
  const validate = async () => {
    try {
      const response = await validateToken();
      const { message } = response.data;
      if (typeof message !== 'string') {
        throw new Error('Invalid response from server');
      }
      localStorage.setItem('isAuthenticated', 'true');
      setAuthState({
        accessToken: null, // Not stored in frontend; managed via cookies
        isAuthenticated: true,
      });
      const publicRoutes = ['/login', '/register', '/'];
      if (publicRoutes.includes(location.pathname)) {
        console.log('Redirecting to /dashboard from:', location.pathname);
        navigate('/dashboard', { replace: true });
      }
    } catch (error: any) {
      console.error('Token validation failed:', error.response?.data || error.message);
      localStorage.removeItem('isAuthenticated');
      setAuthState({ accessToken: null, isAuthenticated: false });
      toast({
        title: 'Session expired',
        description: 'Please log in again.',
        variant: 'destructive',
      });
      navigate('/login', { replace: true });
    }
  };

  // Initialize auth state and validate token
  useEffect(() => {
    if (refreshTimerId) {
      window.clearTimeout(refreshTimerId);
    }
    validate();
  }, [location.pathname]);

  // Periodic token validation
  useEffect(() => {
    if (!authState.isAuthenticated) {
      return;
    }
    const SCHEDULE_MS = 5 * 60 * 1000; // Every 5 minutes
    const id = window.setTimeout(async () => {
      await validate();
    }, SCHEDULE_MS);
    setRefreshTimerId(id);
    return () => {
      window.clearTimeout(id);
    };
  }, [authState.isAuthenticated]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const res = await loginCompany(credentials);
      const { message } = res.data;
      if (typeof message !== 'string') {
        throw new Error('Invalid response from server');
      }
      // Validate token after login to set isAuthenticated
      await validate();
      toast({
        title: 'Login successful',
        description: 'Welcome back to SMARTEN',
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || 'Please enter valid credentials';
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const register = async (userData: FormData) => {
    try {
      const res = await registerCompany(userData);
      const { message } = res.data;
      if (typeof message !== 'string') {
        throw new Error('Invalid response from server');
      }
      toast({
        title: 'Registration successful',
        description: 'Please log in to continue.',
      });
      navigate('/login', { replace: true });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || error.message || 'An unexpected error occurred during registration';
      toast({
        title: 'Registration failed',
        description: errorMessage,
        variant: 'destructive',
      });
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      if (refreshTimerId) {
        window.clearTimeout(refreshTimerId);
      }
      localStorage.removeItem('isAuthenticated');
      setAuthState({
        accessToken: null,
        isAuthenticated: false,
      });
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully.',
      });
      navigate('/login', { replace: true });
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, validate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};