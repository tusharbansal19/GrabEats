// src/ProtectedRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectLogin = ({  children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);



  if(isAuthenticated)
    return<Navigate to="/" />;

    return <>
    {children}</>

};

export default ProtectLogin;
