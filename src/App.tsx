import { FC, useState } from 'react';
import { IntlProvider } from 'react-intl';

import AppRouter from './Router';
import enMessages from './languages/en.json';
import ukMessages from './languages/uk.json';

interface Messages {
  [key: string]: string;
}

const messages: Record<string, Messages> = {
  en: enMessages,
  uk: ukMessages,
};

const App: FC = () => {
  const appLanguage = navigator.language.split(/[-_]/)[0];
  const [locale] = useState<string>(appLanguage || 'en');

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <AppRouter />
    </IntlProvider>
  );
};

export default App;
