// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Login API call
  const login = async (email, password) => {
    setError(null);
    console.log("email",email, "password",password);
    try {
      const response = await axios.post('https://grabeats-server.onrender.com/auth/login', { email, password });


      console.log("email",email, "password",password);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        setIsAuthenticated(true);
        setUser(response.data.user || { email });
        return true;
      } else {
        setError(response.data.message || 'Login failed.');
        setIsAuthenticated(false);
        return false;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
      setIsAuthenticated(false);
      return false;
    }
  };

  // Register API call
  const register = async (name, email, password, phone) => {
    setError(null);
    try {
      const response = await axios.post('https://grabeats-server.onrender.com/auth/register', { name, email, password, phone });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        setIsAuthenticated(true);
        setUser(response.data.user || { name, email, phone });
        return true;
      } else {
        setError(response.data.message || 'Registration failed.');
        setIsAuthenticated(false);
        return false;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error. Please try again.');
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
