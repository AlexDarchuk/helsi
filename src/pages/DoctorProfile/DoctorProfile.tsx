import { FC, useContext, useEffect } from 'react';
import {
  Typography,
  Container,
  Link,
  Grid,
  Box,
  Avatar,
  Button,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink, useParams } from 'react-router-dom';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import { newDoctorRoute } from '../../routes';
import { ProfileContext } from '../../context/ProfileContext';
import useFetchUser from '../../hooks/useFetchUser';
import Loader from '../../components/Loader';
import Days from '../../components/Days';
import { IDoctorProfile } from '../../types/types';

const DoctorProfile: FC = () => {
  const { processApprovalStatus } = useContext(ProfileContext);
  const { currentUser, fetchUserData } = useFetchUser();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [fetchUserData, id]);

  if (!currentUser) {
    return <Loader />;
  }

  const {
    photoURL,
    name,
    lastName,
    phone,
    email,
    address,
    specialty,
    qualification,
    fee,
    startTime,
    endTime,
    days,
    role,
    userID,
  } = currentUser as IDoctorProfile;

  return (
    <Container maxWidth="lg" sx={{ height: '100%' }}>
      <Grid
        container
        spacing={1}
        height="100%"
        alignItems="start"
        py={2.5}
        px={1.25}
      >
        <Grid item xs={12} md={4} lg={3}>
          <Avatar
            src={photoURL || ''}
            alt={`${name} ${lastName}`}
            variant="rounded"
            sx={{ width: '160px', height: '160px' }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Typography
            variant="h3"
            color="GrayText"
            mb={2.5}
          >{`${name} ${lastName}`}</Typography>
          <Box
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            gap="30px"
            mb={2.5}
          >
            <Box display="flex" alignItems="start" gap="10px">
              <LocalPhoneOutlinedIcon
                color="primary"
                sx={{ marginTop: '5px' }}
              />
              <Box>
                <Typography variant="h6" color="GrayText">
                  <FormattedMessage id="phone" defaultMessage="Phone" />
                </Typography>
                <Typography variant="h6" color="GrayText">
                  {phone}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="start" gap="10px">
              <EmailOutlinedIcon color="primary" sx={{ marginTop: '5px' }} />
              <Box>
                <Typography variant="h6" color="GrayText">
                  <FormattedMessage id="email" defaultMessage="Email" />
                </Typography>
                <Typography variant="h6" color="GrayText">
                  {email}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="start" gap="10px" mb={2.5}>
            <LocationCityOutlinedIcon
              color="primary"
              sx={{ marginTop: '5px' }}
            />
            <Box>
              <Typography variant="h6" color="GrayText">
                <FormattedMessage id="address" defaultMessage="Address" />
              </Typography>
              <Typography variant="h6" color="GrayText">
                {address}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="start"
            flexWrap="wrap"
            gap="30px"
            mb="20px"
          >
            <Box display="flex" alignItems="start" gap="10px">
              <WorkOutlineOutlinedIcon
                color="primary"
                sx={{ marginTop: '5px' }}
              />
              <Box>
                <Typography variant="h6" color="GrayText">
                  <FormattedMessage id="specialty" defaultMessage="Specialty" />
                </Typography>
                <Typography variant="h6" color="GrayText">
                  <FormattedMessage id={specialty ?? ''} defaultMessage="" />
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="start" gap="10px">
              <EqualizerOutlinedIcon
                color="primary"
                sx={{ marginTop: '5px' }}
              />
              <Box>
                <Typography variant="h6" color="GrayText">
                  <FormattedMessage
                    id="qualification"
                    defaultMessage="Qualification"
                  />
                </Typography>
                <Typography variant="h6" color="GrayText">
                  <FormattedMessage
                    id={qualification ?? ''}
                    defaultMessage=""
                  />
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="start" gap="10px">
              <PaidOutlinedIcon color="primary" sx={{ marginTop: '5px' }} />
              <Box>
                <Typography variant="h6" color="GrayText">
                  <FormattedMessage id="fee" defaultMessage="Fee" />
                </Typography>
                <Typography variant="h6" color="GrayText">
                  {fee}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="start" gap="10px" mb={2.5}>
            <AccessTimeOutlinedIcon color="primary" sx={{ marginTop: '5px' }} />
            <Box>
              <Typography variant="h6" color="GrayText">
                <FormattedMessage id="work-hours" defaultMessage="Work Hours" />
              </Typography>
              <Typography variant="h6" color="GrayText">
                {`${startTime} - ${endTime}`}
              </Typography>
            </Box>
          </Box>
          <Days days={days} />
          {role === 'doctor' ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="end"
              alignItems="end"
              height="100%"
            >
              <Link component={RouterLink} to={newDoctorRoute} variant="h6">
                <FormattedMessage id="update" defaultMessage="Update" />
              </Link>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="end"
              alignItems="end"
              height="100%"
              gap="10px"
            >
              <Button
                onClick={() =>
                  processApprovalStatus({
                    user: currentUser,
                    id: userID,
                    status: 'rejected',
                  })
                }
                color="inherit"
                size="small"
                variant="outlined"
              >
                <FormattedMessage id="reject" defaultMessage="Reject" />
              </Button>
              <Button
                onClick={() =>
                  processApprovalStatus({
                    user: currentUser,
                    id: userID,
                    status: 'approved',
                  })
                }
                color="primary"
                size="small"
                variant="contained"
              >
                <FormattedMessage id="approve" defaultMessage="Approve" />
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DoctorProfile;
