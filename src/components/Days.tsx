import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Typography } from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

import { WORKING_DAYS } from '../constants/constants';

interface IDays {
  days: string[];
}

const Days: FC<IDays> = (props) => {
  const { days } = props;

  return (
    <Box display="flex" alignItems="start" gap="10px">
      <DateRangeOutlinedIcon color="primary" sx={{ marginTop: '5px' }} />
      <Box>
        <Typography variant="h6" color="GrayText">
          <FormattedMessage id="working-days" defaultMessage="Working days" />
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap" gap="10px">
          {WORKING_DAYS.map(({ key }) => (
            <Typography
              key={key}
              variant="h6"
              color={days.includes(key) ? 'tomato' : 'GrayText'}
            >
              <FormattedMessage id={key} defaultMessage="" />
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Days;
