import { FC, ReactNode } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { ReactComponent as Logo } from '../assets/helsi-logo.svg';
import SwitchLanguage from './SwitchLanguage';

interface IAuthLayout {
  children: ReactNode;
}

const AuthLayout: FC<IAuthLayout> = ({ children }) => {
  return (
    <Grid container overflow="hidden" minHeight="100vh" display="flex">
      <Grid item xs={12} md={6}>
        <Box
          flex={1}
          height="100%"
          sx={{
            background: 'linear-gradient(98.66deg, #d6e9ff 2.52%, #ffddf7)',
          }}
        >
          <Box width="214px" height="137px" p={2.5}>
            <Logo />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignSelf="center"
            gap={2}
            mt={25}
            textAlign="center"
          >
            <Typography variant="h3">
              <FormattedMessage
                id="search-doctor"
                defaultMessage="Search for doctors online"
              />
            </Typography>
            <Typography variant="h6">
              <FormattedMessage
                id="make-appointment"
                defaultMessage="Make an appointment without leaving your home"
              />
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        flexDirection="column"
        p="20px 40px"
      >
        <SwitchLanguage />
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
