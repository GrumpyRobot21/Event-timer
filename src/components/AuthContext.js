import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate a logged-in user by setting the user state
    const simulatedUser = {
      id: 1,
      email: 'test@example.com',
      // Add any other user properties you need
    };
    setUser(simulatedUser);
    setLoading(false);
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
    // Simulated logout function
    console.log('Simulated logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};