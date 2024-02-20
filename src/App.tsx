import { FC } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import AppRouter from './Router';
import { AuthContextProvider } from './context/AuthContext';
import { ProfileContextProvider } from './context/ProfileContext';

const App: FC = () => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <ProfileContextProvider>
          <AppRouter />
        </ProfileContextProvider>
      </AuthContextProvider>
    </Provider>
  );
};

export default App;
