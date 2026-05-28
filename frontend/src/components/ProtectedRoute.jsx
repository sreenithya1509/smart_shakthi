import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { LoadingScreen } from './LoadingScreen.jsx';

export const ProtectedRoute = () => {
  const { isAuthenticated, booting } = useAuth();
  const location = useLocation();

  if (booting) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
};
