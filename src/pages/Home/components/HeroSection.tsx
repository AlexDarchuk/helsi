import { FC, useContext, useMemo, useState } from 'react';
import { Box, Typography, Button, Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useIntl, FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { ProfileContext } from '../../../context/ProfileContext';
import { IDoctorProfile, TProfile } from '../../../types/types';
import { profileRoute, listOfDoctorsRoute } from '../../../routes';

type SearchOption =
  | { type: 'doctor'; label: string; id: string }
  | { type: 'specialty'; label: string; value: string };

function isDoctorProfile(user: TProfile): user is IDoctorProfile {
  return user.role === 'doctor' && 'lastName' in user;
}

const HeroSection: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { usersList } = useContext(ProfileContext);
  const [selectedOption, setSelectedOption] = useState<SearchOption | null>(null);

  const options = useMemo<SearchOption[]>(() => {
    const doctors = usersList.filter(isDoctorProfile);

    const specialtyOptions: SearchOption[] = Array.from(
      new Set(doctors.map((d) => d.specialty).filter(Boolean))
    ).map((specialty) => ({
      type: 'specialty',
      label: intl.formatMessage({ id: specialty, defaultMessage: specialty }),
      value: specialty,
    }));

    const doctorOptions: SearchOption[] = doctors.map((d) => ({
      type: 'doctor',
      label: `${d.name} ${d.lastName}`,
      id: d.userID,
    }));

    return [...specialtyOptions, ...doctorOptions];
  }, [usersList, intl]);

  const handleSearch = () => {
    if (!selectedOption) return;

    if (selectedOption.type === 'doctor') {
      navigate(`${profileRoute}/${selectedOption.id}`);
    } else {
      navigate(`${listOfDoctorsRoute}?specialty=${selectedOption.value}`);
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1a9e5c 0%, #0d7a45 60%, #095e34 100%)',
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography
        variant="h2"
        color="white"
        fontWeight={700}
        textAlign="center"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        <FormattedMessage id="hero-title" defaultMessage="Find your doctor online" />
      </Typography>

      <Typography
        variant="h5"
        color="rgba(255,255,255,0.85)"
        textAlign="center"
        mb={3}
        sx={{ fontSize: { xs: '1rem', md: '1.4rem' } }}
      >
        <FormattedMessage
          id="hero-subtitle"
          defaultMessage="Book an appointment without queues or phone calls"
        />
      </Typography>

      <Box
        display="flex"
        gap={1}
        width="100%"
        maxWidth="680px"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Autocomplete
          fullWidth
          options={options}
          groupBy={(option) =>
            option.type === 'specialty'
              ? intl.formatMessage({ id: 'specialty', defaultMessage: 'Specialty' })
              : intl.formatMessage({ id: 'first-name', defaultMessage: 'Doctor' })
          }
          getOptionLabel={(option) => option.label}
          noOptionsText={intl.formatMessage({
            id: 'hero-no-options',
            defaultMessage: 'No doctors found',
          })}
          value={selectedOption}
          onChange={(_, value) => setSelectedOption(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={intl.formatMessage({
                id: 'hero-search-placeholder',
                defaultMessage: 'Specialty or doctor name',
              })}
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
            />
          )}
        />
        <Button
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{
            backgroundColor: '#f5a623',
            color: 'white',
            fontWeight: 700,
            px: 4,
            whiteSpace: 'nowrap',
            '&:hover': { backgroundColor: '#e09400' },
          }}
        >
          <FormattedMessage id="hero-search-btn" defaultMessage="Find" />
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
