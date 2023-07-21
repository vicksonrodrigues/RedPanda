import { Navigate } from 'react-router-dom';
import React from 'react';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const customer = useAuth();
  if (!customer) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
