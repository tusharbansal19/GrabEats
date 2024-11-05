// src/ProtectedRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ComppProtect = ({ element, children }) => {
  const { isAuthenticated } = useAuth();



  if(isAuthenticated)
  return <>
    {children}</>
    
    
    return <Navigate to="/login" />;

 
};

export default ComppProtect;
