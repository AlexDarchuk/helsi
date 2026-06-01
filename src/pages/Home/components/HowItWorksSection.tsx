import { FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

interface Step {
  number: number;
  icon: typeof PersonAddOutlinedIcon;
  titleId: string;
  descId: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    icon: PersonAddOutlinedIcon,
    titleId: 'how-step1-title',
    descId: 'how-step1-desc',
  },
  {
    number: 2,
    icon: ManageSearchOutlinedIcon,
    titleId: 'how-step2-title',
    descId: 'how-step2-desc',
  },
  {
    number: 3,
    icon: EventAvailableOutlinedIcon,
    titleId: 'how-step3-title',
    descId: 'how-step3-desc',
  },
];

const HowItWorksSection: FC = () => {
  return (
    <Box py={10} px={{ xs: 3, md: 8 }} bgcolor="white">
      <Box textAlign="center" mb={7}>
        <Typography variant="h3" fontWeight={700} color="text.primary" mb={1}>
          <FormattedMessage id="how-title" defaultMessage="How it works" />
        </Typography>
        <Typography variant="h6" color="text.secondary">
          <FormattedMessage
            id="how-subtitle"
            defaultMessage="Three simple steps to your appointment"
          />
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" maxWidth="900px" mx="auto">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === STEPS.length - 1;

          return (
            <Grid item xs={12} md={4} key={step.number}>
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <Box position="relative" display="flex" alignItems="center" width="100%" mb={4}>
                  <Box flex={1} />
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={88}
                    height={88}
                    borderRadius="50%"
                    bgcolor="#e8f5ee"
                    border="3px solid"
                    borderColor="#1a9e5c"
                    position="relative"
                    zIndex={1}
                    flexShrink={0}
                  >
                    <Icon sx={{ fontSize: 40, color: '#1a9e5c' }} />
                    <Box
                      position="absolute"
                      top={-8}
                      right={-8}
                      width={28}
                      height={28}
                      borderRadius="50%"
                      bgcolor="#1a9e5c"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography variant="caption" color="white" fontWeight={700} fontSize={13}>
                        {step.number}
                      </Typography>
                    </Box>
                  </Box>
                  {!isLast && (
                    <Box
                      flex={1}
                      height="2px"
                      sx={{
                        background: 'linear-gradient(90deg, #1a9e5c 0%, #e0e0e0 100%)',
                        display: { xs: 'none', md: 'block' },
                      }}
                    />
                  )}
                  {isLast && <Box flex={1} />}
                </Box>

                <Typography variant="h5" fontWeight={700} color="text.primary" mb={1.5}>
                  <FormattedMessage id={step.titleId} defaultMessage={step.titleId} />
                </Typography>
                <Typography variant="body1" color="text.secondary" maxWidth={260}>
                  <FormattedMessage id={step.descId} defaultMessage={step.descId} />
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HowItWorksSection;
