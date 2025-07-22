
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('authToken');
    return!!token; 
  });
  const navigate = useNavigate();

  // Simulate login
  const login = async (email, password) => {
    console.log('Attempting login for:', email);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    if (email === 'test@example.com' && password === 'password') {
      localStorage.setItem('authToken', 'fake-jwt-token'); 
      setIsAuthenticated(true);
      navigate('/profile'); 
      return true;
    } else {
      alert('Invalid credentials');
      return false;
    }
  };

  // Simulate logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page after logout
  };

 
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};