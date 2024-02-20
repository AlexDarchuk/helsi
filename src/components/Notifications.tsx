import { FC, ReactNode, useState, MouseEvent } from 'react';
import { IconButton, Badge, Popper, Paper } from '@mui/material';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

interface INotification {
  children: ReactNode;
  notificationAmount: number;
}

const Notifications: FC<INotification> = ({ children, notificationAmount }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openPopper = Boolean(anchorEl);
  const idPopper = openPopper ? 'header-popper' : undefined;

  const handlePopperClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(openPopper ? null : event.currentTarget);
  };

  return (
    <div>
      <IconButton onClick={handlePopperClick} size="large">
        <Badge badgeContent={notificationAmount} color="success" showZero>
          <CircleNotificationsIcon
            sx={{ width: 52, height: 52 }}
            color="disabled"
          />
        </Badge>
      </IconButton>

      <Popper
        id={idPopper}
        open={openPopper}
        anchorEl={anchorEl}
        placement="bottom"
      >
        <Paper>{children}</Paper>
      </Popper>
    </div>
  );
};

export default Notifications;
