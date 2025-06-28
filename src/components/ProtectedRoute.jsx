// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/authSlice';

const ComppProtect = ({ element, children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log('Is Authenticated (Protected):', isAuthenticated);

  if (isAuthenticated) {
    return <>{children}</>;
  }
    
  return <Navigate to="/login" replace />;
};

export default ComppProtect;
