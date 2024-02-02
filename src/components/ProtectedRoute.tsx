import React from 'react';
import { auth } from '../../firebase';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // 프론트에서 인가 역할을 하는 컴포넌트
  const user = auth.currentUser;

  return user ? <>{children}</> : <Navigate to='/login' />;
};

export default ProtectedRoute;
