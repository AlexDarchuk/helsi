import { FC } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined';
import PregnantWomanOutlinedIcon from '@mui/icons-material/PregnantWomanOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import { SvgIconComponent } from '@mui/icons-material';

import { listOfDoctorsRoute } from '../../../routes';

interface Specialty {
  key: string;
  icon: SvgIconComponent;
  color: string;
  bgColor: string;
}

const SPECIALTIES: Specialty[] = [
  { key: 'dermatologist', icon: FaceRetouchingNaturalOutlinedIcon, color: '#e67e22', bgColor: '#fef3e2' },
  { key: 'gynecologist', icon: PregnantWomanOutlinedIcon, color: '#e91e8c', bgColor: '#fde8f5' },
  { key: 'neurologist', icon: PsychologyOutlinedIcon, color: '#7b1fa2', bgColor: '#f3e5f5' },
  { key: 'orthopaedist', icon: AccessibilityNewOutlinedIcon, color: '#1976d2', bgColor: '#e3f2fd' },
  { key: 'pediatrician', icon: ChildCareOutlinedIcon, color: '#388e3c', bgColor: '#e8f5e9' },
  { key: 'surgeon', icon: MedicalServicesOutlinedIcon, color: '#d32f2f', bgColor: '#ffebee' },
];

const SpecialtiesSection: FC = () => {
  const navigate = useNavigate();

  const handleSpecialtyClick = (specialtyKey: string) => {
    navigate(`${listOfDoctorsRoute}?specialty=${specialtyKey}`);
  };

  return (
    <Box py={8} px={{ xs: 3, md: 8 }} bgcolor="#f9fafb">
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight={700} color="text.primary" mb={1}>
          <FormattedMessage id="specialties-title" defaultMessage="Choose a specialty" />
        </Typography>
        <Typography variant="h6" color="text.secondary">
          <FormattedMessage
            id="specialties-subtitle"
            defaultMessage="Select the right specialist for your needs"
          />
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center" maxWidth="900px" mx="auto">
        {SPECIALTIES.map(({ key, icon: Icon, color, bgColor }) => (
          <Grid item xs={6} sm={4} md={4} key={key}>
            <Paper
              elevation={0}
              onClick={() => handleSpecialtyClick(key)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
                py: 4,
                px: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: color,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${color}33`,
                },
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={72}
                height={72}
                borderRadius="50%"
                bgcolor={bgColor}
              >
                <Icon sx={{ fontSize: 38, color }} />
              </Box>
              <Typography variant="h6" fontWeight={600} textAlign="center" color="text.primary">
                <FormattedMessage id={key} defaultMessage={key} />
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SpecialtiesSection;
