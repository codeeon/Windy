import React from 'react';
import { auth } from '../../firebase';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser;

  return user ? <>{children}</> : <Navigate to='/login' />;
};

export default ProtectedRoute;
