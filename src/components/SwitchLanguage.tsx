import { FC, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { setLanguage } from '../store/slices/languagesSlice';

const SwitchLanguage: FC = () => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.language);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    dispatch(setLanguage({ language: selectedLanguage }));
  }, [dispatch, selectedLanguage]);

  const handleTypographyClick = (lang: string) => {
    setSelectedLanguage(lang);
  };

  return (
    <Box display="flex" alignItems="center" alignSelf="end" gap="5px">
      <Typography
        variant="h5"
        color={selectedLanguage !== 'uk' ? pink[500] : undefined}
        onClick={() => handleTypographyClick('en')}
        sx={{ cursor: 'pointer' }}
      >
        EN
      </Typography>
      /
      <Typography
        variant="h5"
        color={selectedLanguage === 'uk' ? pink[500] : undefined}
        onClick={() => handleTypographyClick('uk')}
        sx={{ cursor: 'pointer' }}
      >
        UA
      </Typography>
    </Box>
  );
};

export default SwitchLanguage;
