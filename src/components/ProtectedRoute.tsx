import { FC, ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { loginRoute } from '../routes';
import Loader from './Loader';

interface IProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to={loginRoute} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
