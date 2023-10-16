import { FC, ReactNode } from 'react';
import { Grid } from '@mui/material';

import Header from './Header';

interface IMainLayout {
  children: ReactNode;
}

const MainLayout: FC<IMainLayout> = ({ children }) => {
  return (
    <Grid container overflow="hidden" display="flex">
      <Grid item xs={12} height="10vh" component="header">
        <Header />
      </Grid>
      <Grid
        item
        xs={12}
        height="75vh"
        sx={{
          background: 'linear-gradient(98.66deg, #d6e9ff 2.52%, #ffddf7)',
        }}
      >
        {children}
      </Grid>
      <Grid item xs={12} height="15vh">
        Footer
      </Grid>
    </Grid>
  );
};

export default MainLayout;
