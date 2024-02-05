import { FC, useContext, useState, ChangeEvent } from 'react';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { TUserType } from '../../types/types';
import { newDoctorRoute } from '../../routes';
import { AuthContext } from '../../context/AuthContext';
import { ProfileContext } from '../../context/ProfileContext';
import Loader from '../../components/Loader';

const Profile: FC = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { currentUser } = useContext(ProfileContext);
  const [photoUrl, setPhotoUrl] = useState('');

  const handlePhotoUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhotoUrl(event.target.value);
  };

  const updateUserPhotoUrl = async () => {
    if (!user) {
      return;
    }

    const userDocRef = doc(getFirestore(), 'users', user.uid);
    await updateDoc(userDocRef, { photoURL: photoUrl });
    setPhotoUrl('');
  };

  if (!currentUser) {
    return <Loader />;
  }

  const renderLinkName = (role: TUserType) => {
    switch (role) {
      case 'patient':
        return (
          <Link
            component={RouterLink}
            to={newDoctorRoute}
            variant="h5"
            ml={0.75}
          >
            <FormattedMessage id="me-doctor" defaultMessage="I am a doctor" />
          </Link>
        );
      case 'doctor':
        return (
          <Link
            component={RouterLink}
            to={newDoctorRoute}
            variant="h5"
            ml={0.75}
          >
            <FormattedMessage id="update-data" defaultMessage="Update data" />
          </Link>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" gap="20px" pt="100px">
        <Avatar
          alt={intl.formatMessage({
            id: 'profile-img',
            defaultMessage: 'Profile img',
          })}
          src={currentUser.photoURL ?? ''}
          sx={{ width: 150, height: 150 }}
        />
        <Box display="flex" alignItems="center" gap="20px">
          <TextField
            label={intl.formatMessage({
              id: 'profile-photo-url',
              defaultMessage: 'Set photo url',
            })}
            helperText={intl.formatMessage({
              id: 'profile-update-photo',
              defaultMessage: 'Update your photo',
            })}
            variant="standard"
            value={photoUrl}
            onChange={handlePhotoUrlChange}
            sx={{ width: 400 }}
          />
          <Button
            onClick={updateUserPhotoUrl}
            variant="outlined"
            size="small"
            disabled={!photoUrl}
          >
            <FormattedMessage id="save" defaultMessage="Save" />
          </Button>
        </Box>
        <Box display="flex" alignItems="center" gap="100px">
          <Typography variant="h6">
            <FormattedMessage
              id="profile-name"
              defaultMessage="Name: {name}"
              values={{
                name: <b>{currentUser.name}</b>,
              }}
            />
          </Typography>
          <Typography variant="h6">
            <FormattedMessage
              id="profile-email"
              defaultMessage="Email: {email}"
              values={{
                email: <b>{currentUser.email}</b>,
              }}
            />
          </Typography>
        </Box>
        {currentUser.role && renderLinkName(currentUser.role)}
      </Box>
    </Container>
  );
};

export default Profile;
