import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialState: AuthContextType = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialState);

interface AuthProviderProps {
  children: ReactNode;
}

// API URL - in a real app, this would be in an environment variable
const API_URL = 'http://localhost:5000/api';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for token in localStorage on initial load
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        // Verify the token is valid and not expired
        const decoded = jwtDecode<{ id: string; email: string; exp: number }>(storedToken);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem('token');
          setIsLoading(false);
        } else {
          // Valid token
          setToken(storedToken);
          setUser({ id: decoded.id, email: decoded.email });
          setIsAuthenticated(true);
          
          // Set auth header for all future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (error) {
        // Invalid token
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const decoded = jwtDecode<{ id: string; email: string }>(token);
      setUser({ id: decoded.id, email: decoded.email });
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await axios.post(`${API_URL}/auth/signup`, { email, password });
      // Automatically login after successful signup
      await login(email, password);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Signup failed');
      } else {
        setError('An unexpected error occurred');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};