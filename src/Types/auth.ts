export interface FormData {
    name: string;
    email: string;
    registration_number: string;
    password: string;
    phone: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface User {
    email: string;
    name: string;
    registration_number: string;
    phone: string;
  }
  
  export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
  }
  
  export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
  }