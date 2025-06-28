// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/authSlice';

const ProtectLogin = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log('Is Authenticated:', isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectLogin;
