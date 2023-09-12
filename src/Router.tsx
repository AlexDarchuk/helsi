import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './components/AuthLayout';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { loginRoute, registerRoute } from './routes';

const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={loginRoute}
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path={registerRoute}
          element={
            <AuthLayout>
              <Registration />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
