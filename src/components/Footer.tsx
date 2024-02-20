import { FC } from 'react';
import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { homeRoute, medicalReformRoute } from '../routes';
import { ReactComponent as Logo } from '../assets/helsi-logo.svg';

const Footer: FC = () => {
  return (
    <Box display="flex" height="100%" py={2.75} bgcolor="#eeeff1">
      <Box px={2.5} width="16%">
        <Box width="100px" height="70px">
          <Link component={RouterLink} to={homeRoute}>
            <Logo />
          </Link>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap="3px" px={2.5} width="16%">
        <Link component={RouterLink} to="#" variant="body2" ml={0.75}>
          <FormattedMessage id="about-helsi" defaultMessage="About Helsi" />
        </Link>
        <Link
          component={RouterLink}
          to={medicalReformRoute}
          variant="body2"
          ml={0.75}
        >
          <FormattedMessage
            id="medical-reform"
            defaultMessage="Medical reform"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
