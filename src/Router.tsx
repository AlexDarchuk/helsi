import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import enMessages from './languages/en.json';
import ukMessages from './languages/uk.json';
import { useAppSelector } from './hooks/reduxHooks';
import { loginRoute, homeRoute, registerRoute } from './routes';
import AuthRoutes from './components/AuthRoutes';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

interface Messages {
  [key: string]: string;
}

const messages: Record<string, Messages> = {
  en: enMessages,
  uk: ukMessages,
};

const AppRouter: FC = () => {
  const { language } = useAppSelector((state) => state.language);

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <BrowserRouter>
        <Routes>
          <Route
            path={loginRoute}
            element={
              <AuthRoutes>
                <AuthLayout>
                  <Login />
                </AuthLayout>
              </AuthRoutes>
            }
          />
          <Route
            path={registerRoute}
            element={
              <AuthRoutes>
                <AuthLayout>
                  <Registration />
                </AuthLayout>
              </AuthRoutes>
            }
          />
          <Route
            path={homeRoute}
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Home />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default AppRouter;
