import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import createApi from './api';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login/`, {
        email,
        password,
      });
      const { access, refresh, expiresIn } = response.data;
      const expiresAt = new Date().getTime() + expiresIn * 1000;
      const user = { access, refresh, expiresAt };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register/`, {
        email,
        password,
        name,
      });
      const { access, refresh, expiresIn } = response.data;
      const expiresAt = new Date().getTime() + expiresIn * 1000;
      const user = { access, refresh, expiresAt };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  const refreshToken = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/refresh/`, {
        refresh: storedUser.refresh,
      });
      const { access, expiresIn } = response.data;
      const expiresAt = new Date().getTime() + expiresIn * 1000;
      const user = { ...storedUser, access, expiresAt };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  };

  const isAuthenticated = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser && storedUser.expiresAt > new Date().getTime();
  };

  const getAccessToken = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser ? storedUser.access : null;
  };

  const api = createApi(isAuthenticated, getAccessToken, refreshToken);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshToken, isAuthenticated, getAccessToken, api }}>
      {children}
    </AuthContext.Provider>
  );
};