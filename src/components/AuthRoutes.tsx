import { FC, useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import { homeRoute } from '../routes';
import Loader from './Loader';

interface IAuthRoutes {
  children: ReactNode;
}

const AuthRoutes: FC<IAuthRoutes> = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to={homeRoute} />;
  }

  return children;
};

export default AuthRoutes;
