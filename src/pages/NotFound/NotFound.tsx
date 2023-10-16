import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FormattedMessage } from 'react-intl';

const NotFound: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: 'linear-gradient(98.66deg, #d6e9ff 2.52%, #ffddf7)',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          display="flex"
          alignItems="center"
          gap="15px"
          color="error"
          variant="h1"
        >
          404
          <ErrorOutlineIcon fontSize="inherit" color="error" />
        </Typography>
        <Typography variant="h3" color="GrayText">
          <FormattedMessage id="not-found" defaultMessage="Page not found" />
        </Typography>
        <Typography variant="h4" color="GrayText">
          <FormattedMessage
            id="not-found-description"
            defaultMessage="The page you are looking for doesn't exist or an other error occurred."
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
