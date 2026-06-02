import { FC, useContext, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Avatar,
  Button,
  Chip,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { ProfileContext } from '../../context/ProfileContext';
import Loader from '../../components/Loader';
import { SPECIALTIES } from '../../constants/specialties';
import { WORKING_DAYS } from '../../constants/constants';
import { profileRoute, homeRoute } from '../../routes';
import { IDoctorProfile, TProfile } from '../../types/types';

function isDoctorProfile(user: TProfile): user is IDoctorProfile {
  return user.role === 'doctor' && 'lastName' in user;
}

const DoctorsBySpecialty: FC = () => {
  const { specialty } = useParams<{ specialty: string }>();
  const navigate = useNavigate();
  const intl = useIntl();
  const { doctorsList } = useContext(ProfileContext);

  const specialtyConfig = SPECIALTIES.find((s) => s.key === specialty);

  const doctors = useMemo(
    () => doctorsList.filter((d) => isDoctorProfile(d) && d.specialty === specialty) as IDoctorProfile[],
    [doctorsList, specialty]
  );

  const sortedDays = (days: string[]) =>
    [...days].sort(
      (a, b) => WORKING_DAYS.findIndex((d) => d.key === a) - WORKING_DAYS.findIndex((d) => d.key === b)
    );

  const formatDays = (days: string[]) =>
    sortedDays(days)
      .map((d) => intl.formatMessage({ id: d, defaultMessage: d }).slice(0, 2))
      .join(' ');

  if (!doctorsList.length && !specialty) {
    return <Loader />;
  }

  const Icon = specialtyConfig?.icon;
  const color = specialtyConfig?.color ?? '#1a9e5c';
  const bgColor = specialtyConfig?.bgColor ?? '#e8f5ee';
  const specialtyLabel = intl.formatMessage({ id: specialty ?? '', defaultMessage: specialty ?? '' });

  return (
    <Box>
      {/* Hero banner */}
      <Box bgcolor={bgColor} py={5} px={{ xs: 3, md: 8 }}>
        <Container maxWidth="lg" disableGutters>
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link component={RouterLink} to={homeRoute} color="inherit" underline="hover" variant="body2">
              <FormattedMessage id="breadcrumb-home" defaultMessage="Home" />
            </Link>
            <Typography variant="body2" color="text.primary">
              {specialtyLabel}
            </Typography>
          </Breadcrumbs>

          <Box display="flex" alignItems="center" gap={2.5}>
            {Icon && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={64}
                height={64}
                borderRadius="50%"
                bgcolor="white"
                boxShadow={`0 4px 12px ${color}33`}
              >
                <Icon sx={{ fontSize: 36, color }} />
              </Box>
            )}
            <Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {specialtyLabel}
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={0.5}>
                <FormattedMessage
                  id="specialty-doctors-found"
                  defaultMessage="{count} specialists found"
                  values={{ count: doctors.length }}
                />
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Doctor list */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {doctors.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={3}
            py={10}
          >
            {Icon && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={96}
                height={96}
                borderRadius="50%"
                bgcolor={bgColor}
              >
                <Icon sx={{ fontSize: 52, color }} />
              </Box>
            )}
            <Box textAlign="center">
              <Typography variant="h5" fontWeight={600} color="text.primary" mb={1}>
                <FormattedMessage
                  id="specialty-no-doctors"
                  defaultMessage="No {specialty} available yet"
                  values={{ specialty: specialtyLabel }}
                />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <FormattedMessage
                  id="specialty-no-doctors-desc"
                  defaultMessage="Specialists will appear soon. Check back later."
                />
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(homeRoute)}
              sx={{
                borderColor: color,
                color,
                fontWeight: 600,
                borderRadius: 2,
                mt: 1,
                '&:hover': { bgcolor: color, color: 'white', borderColor: color },
              }}
            >
              <FormattedMessage id="specialty-back-btn" defaultMessage="Choose another specialty" />
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {doctors.map((doctor) => (
              <Box
                key={doctor.userID}
                border="1px solid"
                borderColor="grey.200"
                borderRadius={3}
                p={3}
                display="flex"
                alignItems="center"
                gap={3}
                sx={{
                  transition: 'all 0.2s ease',
                  bgcolor: 'white',
                  '&:hover': {
                    borderColor: color,
                    boxShadow: `0 4px 20px ${color}22`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Avatar
                  src={doctor.photoURL ?? ''}
                  alt={`${doctor.name} ${doctor.lastName}`}
                  sx={{ width: 72, height: 72, flexShrink: 0, border: `2px solid ${bgColor}` }}
                />

                <Box flex={1} minWidth={0}>
                  <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap" mb={0.5}>
                    <Typography variant="h6" fontWeight={700}>
                      {doctor.name} {doctor.lastName}
                    </Typography>
                    <Chip
                      label={specialtyLabel}
                      size="small"
                      sx={{ bgcolor: bgColor, color, fontWeight: 600, fontSize: '0.75rem' }}
                    />
                  </Box>

                  <Box display="flex" flexWrap="wrap" gap={2.5} mt={1}>
                    {doctor.experience != null && (
                      <Box display="flex" alignItems="center" gap={0.75}>
                        <WorkOutlineOutlinedIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          <FormattedMessage
                            id="doctors-experience"
                            defaultMessage="{years} yrs experience"
                            values={{ years: doctor.experience }}
                          />
                        </Typography>
                      </Box>
                    )}
                    {doctor.address && (
                      <Box display="flex" alignItems="center" gap={0.75}>
                        <LocationCityOutlinedIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {doctor.address}
                        </Typography>
                      </Box>
                    )}
                    {doctor.days?.length > 0 && doctor.startTime && doctor.endTime && (
                      <Box display="flex" alignItems="center" gap={0.75}>
                        <AccessTimeOutlinedIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDays(doctor.days)} &nbsp;{doctor.startTime}–{doctor.endTime}
                        </Typography>
                      </Box>
                    )}
                    {doctor.fee != null && (
                      <Box display="flex" alignItems="center" gap={0.75}>
                        <PaidOutlinedIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {doctor.fee} ₴
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => navigate(`${profileRoute}/${doctor.userID}`)}
                  sx={{
                    flexShrink: 0,
                    borderColor: color,
                    color,
                    fontWeight: 600,
                    borderRadius: 2,
                    whiteSpace: 'nowrap',
                    '&:hover': { bgcolor: color, color: 'white', borderColor: color },
                  }}
                >
                  <FormattedMessage id="doctors-view-profile" defaultMessage="View profile" />
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DoctorsBySpecialty;
