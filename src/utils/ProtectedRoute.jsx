// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';


const ProtectedRoute = ({ element }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }

  return element; 
};

export default ProtectedRoute;
