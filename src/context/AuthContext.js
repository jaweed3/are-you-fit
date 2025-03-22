import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);
  
  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await authService.getCurrentUser();
      setCurrentUser(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch user data');
      localStorage.removeItem('token');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.data.access_token);
      await fetchCurrentUser();
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      localStorage.setItem('token', response.data.access_token);
      await fetchCurrentUser();
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setCurrentUser(null);
    } catch (err) {
      setError('Logout failed');
    }
  };
  
  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      error,
      login,
      register,
      logout,
      setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};