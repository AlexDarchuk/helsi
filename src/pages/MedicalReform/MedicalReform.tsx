import { FC } from 'react';
import { Box } from '@mui/material';

const MedicalReform: FC = () => {
  return (
    <Box height="100%" overflow="hidden">
      <iframe
        src="https://rpr.org.ua/medychna-reforma/"
        height="100%"
        width="100%"
      />
    </Box>
  );
};

export default MedicalReform;
