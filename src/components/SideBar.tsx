import { FC } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { grey } from '@mui/material/colors';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import { ReactComponent as Logo } from '../assets/helsi-logo.svg';
import { listOfDoctors } from '../routes';

const DRAWER_WIDTH = 280;

interface ISideBar {
  drawerOpen: boolean;
  setDrawerOpen: (arg: boolean) => void;
}

const SideBar: FC<ISideBar> = (props) => {
  const { drawerOpen, setDrawerOpen } = props;
  const navigate = useNavigate();

  const sideBarList = [
    {
      key: 'list-of-doctors',
      title: 'List of Doctors',
      path: listOfDoctors,
      icon: <PeopleOutlineIcon />,
    },
  ];

  const goToListOfDoctors = () => {
    navigate(listOfDoctors);
    setDrawerOpen(false);
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        position="relative"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          height="10vh"
          px="20px"
        >
          <Box width="90px" height="50px">
            <Logo />
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)}>
            {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        <Divider
          absolute
          variant="fullWidth"
          sx={{ height: '3px', backgroundColor: grey[400] }}
        />
      </Box>

      <List>
        {sideBarList.map((el) => (
          <ListItem key={el.key} disablePadding>
            <ListItemButton onClick={goToListOfDoctors}>
              <ListItemIcon>{el.icon}</ListItemIcon>
              <ListItemText>
                <FormattedMessage id={el.key} defaultMessage={el.title} />
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
