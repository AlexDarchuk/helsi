import { FC } from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import AppRouter from './Router';
import { AuthContextProvider } from './context/AuthContext';

const App: FC = () => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </Provider>
  );
};

export default App;
