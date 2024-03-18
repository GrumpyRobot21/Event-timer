import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('/api/auth/user');
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    // Simulated login function
    console.log('Simulated login with:', email, password);
    // You can set the user state here with the simulated user data
    const simulatedUser = {
      id: 1,
      email: email,
      // Add any other user properties you need
    };
    setUser(simulatedUser);
  };

  const signup = async (email, password) => {
    // Simulated signup function
    console.log('Simulated signup with:', email, password);
    // You can set the user state here with the simulated user data
    const simulatedUser = {
      id: 1,
      email: email,
      // Add any other user properties you need
    };
    setUser(simulatedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};