import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, AuthResponse, LoginCredentials, FormData } from '@/Types/auth';
import { refreshToken,api,loginCompany, registerCompany, logoutUser } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useLocation,useNavigate } from 'react-router-dom';

interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: FormData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isAuthenticated: false,
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation(); // Add useLocation to check current path

  // Axios interceptor for token refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          authState.isAuthenticated
        ) {
          originalRequest._retry = true; // Prevent infinite retry loop
          console.log('401 detected, attempting token refresh');
          try {
            const refreshTokenStored = localStorage.getItem('refreshToken');
            if (!refreshTokenStored) {
              throw new Error('No refresh token available');
            }
            const response = await refreshToken(refreshTokenStored);
            const { accessToken, refreshToken: newRefreshToken, user } = response.data;
            console.log("New refreshToken ",refreshToken)

            // Validate user data
            if (
              !user ||
              typeof user.email !== 'string' ||
              typeof user.name !== 'string' ||
              typeof user.registration_number !== 'string' ||
              typeof user.phone !== 'string'
            ) {
              throw new Error('Invalid user data from refresh');
            }

            // Update localStorage
            try {
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', newRefreshToken);
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('isAuthenticated', 'true');
              console.log('Tokens refreshed and stored:', { accessToken, refreshToken: newRefreshToken });
            } catch (e) {
              console.error('Error updating localStorage:', e);
              throw new Error('Failed to store refreshed tokens');
            }

            // Update auth state
            setAuthState({
              user,
              accessToken,
              isAuthenticated: true,
            });

            // Update API headers
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

            console.log('Retrying original request with new accessToken');
            return api(originalRequest); // Retry the original request
          } catch (refreshError: any) {
            console.error('Token refresh failed:', refreshError.response?.data || refreshError.message);
            // Log out on refresh failure
            try {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              localStorage.removeItem('isAuthenticated');
              console.log('localStorage cleared due to refresh failure');
            } catch (e) {
              console.error('Error clearing localStorage:', e);
            }
            setAuthState({
              user: null,
              accessToken: null,
              isAuthenticated: false,
            });
            delete api.defaults.headers.common['Authorization'];
            toast({
              title: 'Session expired',
              description: 'Your session has expired. Please log in again.',
              variant: 'destructive',
            });
            navigate('/login', { replace: true });
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [authState.isAuthenticated, navigate, toast]);

  // Initialize auth state from localStorage
  useEffect(() => {
    let accessToken: string | null = null;
    let user: string | null = null;
    let isAuthenticated: boolean = false;

    try {
      accessToken = localStorage.getItem('accessToken');
      user = localStorage.getItem('user');
      isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      } catch (e) {
        console.error('Error clearing localStorage:', e);
      }
      toast({
        title: 'Storage error',
        description: 'Unable to access local storage. Please try again.',
        variant: 'destructive',
      });
      navigate('/login', { replace: true });
      return;
    }

    if (accessToken && isAuthenticated) {
      try {
        const parsedUser = user ? JSON.parse(user) : null;
        if (
          !parsedUser ||
          typeof parsedUser.email !== 'string' ||
          typeof parsedUser.name !== 'string' ||
          typeof parsedUser.registration_number !== 'string' ||
          typeof parsedUser.phone !== 'string'
        ) {
          try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
          } catch (e) {
            console.error('Error clearing localStorage:', e);
          }
          toast({
            title: 'Session error',
            description: 'Invalid session data. Please log in again.',
            variant: 'destructive',
          });
          navigate('/login', { replace: true });
        } else {
          setAuthState({
            user: parsedUser,
            accessToken,
            isAuthenticated,
          });
          // Set Authorization header
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          const publicRoutes = ['/login', '/register', '/'];
          if (publicRoutes.includes(location.pathname)) {
            console.log('Redirecting to /dashboard from:', location.pathname);
            navigate('/dashboard', { replace: true });
          }
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        try {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');
        } catch (e) {
          console.error('Error clearing localStorage:', e);
        }
        toast({
          title: 'Session error',
          description: 'Failed to load session. Please log in again.',
          variant: 'destructive',
        });
        navigate('/login', { replace: true });
      }
    }
  }, [navigate, toast, location.pathname]);

  
  // Initialize auth state from localStorage
  useEffect(() => {
    let accessToken: string | null = null;
    let user: string | null = null;
    let isAuthenticated: boolean = false;

    try {
      accessToken = localStorage.getItem('accessToken');
      user = localStorage.getItem('user');
      isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Clear localStorage to prevent further issues
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      } catch (e) {
        console.error('Error clearing localStorage:', e);
      }
      toast({
        title: 'Storage error',
        description: 'Unable to access local storage. Please try again.',
        variant: 'destructive',
      });
      navigate('/login', { replace: true });
      return;
    }

    if (accessToken && isAuthenticated) {
      try {
        const parsedUser = user ? JSON.parse(user) : null;
        if (
          !parsedUser ||
          typeof parsedUser.email !== 'string' ||
          typeof parsedUser.name !== 'string' ||
          typeof parsedUser.registration_number !== 'string' ||
          typeof parsedUser.phone !== 'string'
        ) {
          // Clear invalid data
          try {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
          } catch (e) {
            console.error('Error clearing localStorage:', e);
          }
          toast({
            title: 'Session error',
            description: 'Invalid session data. Please log in again.',
            variant: 'destructive',
          });
          navigate('/login', { replace: true });
        } else {
          setAuthState({
            user: parsedUser,
            accessToken,
            isAuthenticated,
          });
          // Only redirect to /dashboard if on a public route
          const publicRoutes = ['/login', '/register', '/'];
          if (publicRoutes.includes(location.pathname)) {
            console.log('Redirecting to /dashboard from:', location.pathname);
            navigate('/dashboard', { replace: true });
          }
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        // Clear invalid data
        try {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');
        } catch (e) {
          console.error('Error clearing localStorage:', e);
        }
        toast({
          title: 'Session error',
          description: 'Failed to load session. Please log in again.',
          variant: 'destructive',
        });
        navigate('/login', { replace: true });
      }
    }
  }, [navigate, toast,location.pathname]); // Remove authState from dependencies

  const login = async (credentials: LoginCredentials) => {
    try {
      const res = await loginCompany(credentials);
      const { accessToken, refreshToken, user } = res.data;

      // Validate user data
      if (
        !user ||
        typeof user.email !== 'string' ||
        typeof user.name !== 'string' ||
        typeof user.registration_number !== 'string' ||
        typeof user.phone !== 'string'
      ) {
        throw new Error('Invalid user data from server');
      }

      // Store tokens and user data
      try {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
      } catch (error) {
        console.error('Error writing to localStorage:', error);
        throw new Error('Failed to store session data');
      }

      setAuthState({
        user,
        accessToken,
        isAuthenticated: true,
      });

      toast({
        title: 'Login successful',
        description: 'Welcome back to SMARTEN',
      });
      navigate('/dashboard', { replace: true });
    } catch (error:any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Please enter valid credentials';
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
      const { accessToken, refreshToken, user } = res.data;

      // Validate user data
      if (
        !user ||
        typeof user.email !== 'string' ||
        typeof user.name !== 'string' ||
        typeof user.registration_number !== 'string' ||
        typeof user.phone !== 'string'
      ) {
        throw new Error('Invalid user data from server');
      }

      // Do not store tokens or set isAuthenticated; redirect to login
      toast({
        title: 'Registration successful',
        description: 'Please log in to continue.',
      });
      navigate('/login', { replace: true });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'An unexpected error occurred during registration';
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
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Clear localStorage
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      } catch (e) {
        console.error('Error clearing localStorage:', e);
      }
      setAuthState({
        user: null,
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
    <AuthContext.Provider value={{ authState, login, register, logout }}>
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