import { FC, useContext, useMemo } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { Box, Link, Button, Divider, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { AuthContext } from '../context/AuthContext';
import { homeRoute } from '../routes';
import { ReactComponent as Logo } from '../assets/helsi-logo.svg';
import SwitchLanguage from './SwitchLanguage';

const Header: FC = () => {
  const intl = useIntl();
  const { logout, user } = useContext(AuthContext);

  const handleLogOut = async () => {
    await logout();
    if (!user) {
      return;
    }

    const userDocRef = doc(getFirestore(), 'users', user.uid);
    updateDoc(userDocRef, { onlineStatus: false });
  };

  const pages = useMemo(
    () => [
      {
        title: intl.formatMessage({
          id: 'online-reception',
          defaultMessage: 'Online reception',
        }),
      },
      {
        title: intl.formatMessage({
          id: 'about-helsi',
          defaultMessage: 'About Helsi',
        }),
      },
    ],
    [intl]
  );

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
      px={2.5}
    >
      <Box width="90px" height="50px">
        <Link component={RouterLink} to={homeRoute}>
          <Logo />
        </Link>
      </Box>
      <Box
        display="flex"
        justifyContent="end"
        alignItems="center"
        gap="15px"
        width="100%"
        height="100%"
        px={2.5}
        mr={2.5}
        borderRight="1px solid"
        borderColor={grey[500]}
      >
        {pages.map((page) => (
          <Link
            key={page.title}
            component={RouterLink}
            to="#"
            variant="h5"
            underline="none"
            color="inherit"
          >
            {page.title}
          </Link>
        ))}
      </Box>
      <Box display="flex" alignItems="center" gap="15px">
        <SwitchLanguage />
        <Box display="flex" alignItems="center" gap="5px">
          <AccountBoxIcon color="info" fontSize="large" />
          <Typography variant="h5">{user && user.displayName}</Typography>
        </Box>
        <Button onClick={handleLogOut} variant="text">
          <Typography variant="body2" minWidth="70px">
            <FormattedMessage id="log-out" defaultMessage="Logout" />
          </Typography>
        </Button>
      </Box>
      <Divider
        absolute
        variant="fullWidth"
        sx={{ height: '3px', backgroundColor: grey[400] }}
      />
    </Box>
  );
};

export default Header;
