import { FC, useContext, useMemo, useState, MouseEvent } from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import {
  Box,
  Link,
  Divider,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';

import { AuthContext } from '../context/AuthContext';
import { ProfileContext } from '../context/ProfileContext';
import { homeRoute, profileRoute } from '../routes';
import { ReactComponent as Logo } from '../assets/helsi-logo.svg';
import SwitchLanguage from './SwitchLanguage';
import Notifications from './Notifications';
import AdminNotifications from './AdminNotifications';

const Header: FC = () => {
  const intl = useIntl();
  const { logout, user } = useContext(AuthContext);
  const { currentUser } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleLogOut = async () => {
    await logout();
    if (!user) {
      return;
    }

    const userDocRef = doc(getFirestore(), 'users', user.uid);
    updateDoc(userDocRef, { onlineStatus: false });
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoveToProfilePage = () => {
    if (currentUser && currentUser.role === 'doctor') {
      return navigate(`${profileRoute}/${currentUser.userID}`);
    }

    return navigate(profileRoute);
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
        <Notifications
          notificationAmount={currentUser?.notifications?.length || 0}
        >
          <AdminNotifications />
        </Notifications>
        <SwitchLanguage />
        <Box display="flex" alignItems="center" gap="5px">
          <Typography variant="h5">
            {currentUser && currentUser.name}
          </Typography>
          <IconButton onClick={handleClick} size="small">
            <Avatar
              alt={intl.formatMessage({
                id: 'profile-img',
                defaultMessage: 'Profile img',
              })}
              src={currentUser?.photoURL ?? ''}
              sx={{ width: 52, height: 52 }}
            />
          </IconButton>
        </Box>
      </Box>
      <Divider
        absolute
        variant="fullWidth"
        sx={{ height: '3px', backgroundColor: grey[400] }}
      />
      <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMoveToProfilePage}>
          <Typography variant="body2" minWidth="70px">
            <FormattedMessage id="profile" defaultMessage="Profile" />
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <Typography variant="body2" minWidth="70px">
            <FormattedMessage id="log-out" defaultMessage="Logout" />
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;
