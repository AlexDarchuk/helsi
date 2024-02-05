import { FC, useContext, useEffect, useState, Fragment } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Button,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { profileRoute } from '../routes';
import { ProfileContext } from '../context/ProfileContext';
import { INotifications } from '../types/types';
import Loader from '../components/Loader';

const AdminNotifications: FC = () => {
  const navigate = useNavigate();
  const { currentUser, processApprovalStatus } = useContext(ProfileContext);
  const [notificationsList, setNotificationsList] = useState<INotifications[]>(
    []
  );

  useEffect(() => {
    if (currentUser && currentUser.notifications) {
      setNotificationsList(currentUser.notifications);
    }
  }, [currentUser]);

  const handleMoveToProfile = (id: string) => {
    navigate(`${profileRoute}/${id}`);
  };

  if (!currentUser) {
    return <Loader />;
  }

  return (
    <Box height="70vh" width="400px">
      {!notificationsList.length ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="h6">
            <FormattedMessage
              id="notification-list"
              defaultMessage="The notification list is empty."
            />
          </Typography>
        </Box>
      ) : (
        <List>
          {notificationsList.map((el) => (
            <Fragment key={el.userID}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={el.name} src={el.photoURL || ''} />
                </ListItemAvatar>
                <Box
                  width="100%"
                  onClick={() => handleMoveToProfile(el.userID)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Typography variant="h6">{`${el.name} ${el.lastName}`}</Typography>
                  <Box display="flex" alignItems="center" gap="5px">
                    <Typography variant="body2" color="text.primary">
                      <FormattedMessage
                        id="specialty"
                        defaultMessage="Specialty "
                      />
                    </Typography>
                    <span> - </span>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontWeight="600"
                    >
                      <FormattedMessage id={el?.specialty} defaultMessage=" " />
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap="5px">
                    <Typography variant="body2" color="text.primary">
                      <FormattedMessage
                        id="working-days"
                        defaultMessage="Working Days"
                      />
                    </Typography>
                    <span> - </span>
                    {el.days.map((day: string) => (
                      <Typography
                        key={day}
                        variant="body2"
                        color="text.primary"
                        fontWeight="600"
                      >
                        <FormattedMessage id={day} defaultMessage=" " />
                        <span>,</span>
                      </Typography>
                    ))}
                  </Box>
                  <Box display="flex" justifyContent="end">
                    <Button
                      onClick={() =>
                        processApprovalStatus({
                          user: currentUser,
                          id: el.userID,
                          status: 'rejected',
                        })
                      }
                      variant="text"
                      color="inherit"
                      size="small"
                    >
                      <FormattedMessage id="reject" defaultMessage="Reject" />
                    </Button>
                    <Button
                      onClick={() =>
                        processApprovalStatus({
                          user: currentUser,
                          id: el.userID,
                          status: 'approved',
                        })
                      }
                      variant="text"
                      color="primary"
                      size="small"
                    >
                      <FormattedMessage id="approve" defaultMessage="Approve" />
                    </Button>
                  </Box>
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AdminNotifications;
