import { FC, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Chip,
} from '@mui/material';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { ProfileContext } from '../../../context/ProfileContext';
import { IDoctorProfile, TProfile } from '../../../types/types';
import { profileRoute } from '../../../routes';

function isDoctorProfile(user: TProfile): user is IDoctorProfile {
  return user.role === 'doctor' && 'lastName' in user;
}

const DoctorsSection: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { usersList } = useContext(ProfileContext);

  const doctors = usersList.filter(isDoctorProfile);

  return (
    <Box py={10} px={{ xs: 3, md: 8 }} bgcolor="#f9fafb">
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight={700} color="text.primary" mb={1}>
          <FormattedMessage id="doctors-title" defaultMessage="Our doctors" />
        </Typography>
        <Typography variant="h6" color="text.secondary">
          <FormattedMessage
            id="doctors-subtitle"
            defaultMessage="Experienced specialists ready to help you"
          />
        </Typography>
      </Box>

      {doctors.length === 0 ? (
        <Typography textAlign="center" color="text.secondary" variant="h6">
          <FormattedMessage id="doctors-no-doctors" defaultMessage="No doctors available yet" />
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center" maxWidth="1100px" mx="auto">
          {doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.userID}>
              <Card
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#1a9e5c',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(26,158,92,0.15)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2.5}>
                    <Avatar
                      src={doctor.photoURL ?? ''}
                      alt={`${doctor.name} ${doctor.lastName}`}
                      sx={{ width: 72, height: 72, border: '2px solid #e8f5ee' }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                        {doctor.name} {doctor.lastName}
                      </Typography>
                      {doctor.specialty && (
                        <Chip
                          label={intl.formatMessage({
                            id: doctor.specialty,
                            defaultMessage: doctor.specialty,
                          })}
                          size="small"
                          sx={{
                            mt: 0.5,
                            bgcolor: '#e8f5ee',
                            color: '#0d7a45',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="column" gap={1}>
                    {doctor.experience != null && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <WorkOutlineOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          <FormattedMessage
                            id="doctors-experience"
                            defaultMessage="{years} yrs experience"
                            values={{ years: doctor.experience }}
                          />
                        </Typography>
                      </Box>
                    )}
                    {doctor.fee != null && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <PaidOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {doctor.fee} ₴
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate(`${profileRoute}/${doctor.userID}`)}
                    sx={{
                      borderColor: '#1a9e5c',
                      color: '#1a9e5c',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: '#1a9e5c',
                        color: 'white',
                        borderColor: '#1a9e5c',
                      },
                    }}
                  >
                    <FormattedMessage id="doctors-view-profile" defaultMessage="View profile" />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DoctorsSection;
