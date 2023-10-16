import { FC, useContext } from 'react';
import { updateProfile } from 'firebase/auth';
import { Avatar, Typography, Button, Box, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik, Form } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { pink } from '@mui/material/colors';

import { AuthContext } from '../../context/AuthContext';
import { loginRoute, homeRoute } from '../../routes';
import FormikInput from '../../components/FormikInput';
import { auth } from '../../firebaseConfig';

import validationSchema from './validationSchema';

interface IRegistration {
  email: string;
  password: string;
  name: string;
}

const Registration: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { createUser, saveUserDataToFirestore } = useContext(AuthContext);

  const handleRegistration = ({ email, password, name }: IRegistration) => {
    createUser({ email, password })
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: name,
        });
      })
      .then(() => {
        const user = auth.currentUser;
        saveUserDataToFirestore(user, name, email);
      })
      .then(() => navigate(homeRoute))
      .catch(console.error);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ backgroundColor: pink[500] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          <FormattedMessage id="register" defaultMessage="Register" />
        </Typography>
      </Box>
      <Formik<IRegistration>
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={() => validationSchema(intl)}
        onSubmit={(values) => handleRegistration(values)}
      >
        {({ isSubmitting, isValid }) => (
          <Form style={{ width: '100%' }}>
            <FormikInput
              name="name"
              type="string"
              label={intl.formatMessage({
                id: 'name',
                defaultMessage: 'Name',
              })}
            />
            <FormikInput
              name="email"
              type="email"
              label={intl.formatMessage({
                id: 'email',
                defaultMessage: 'Email',
              })}
            />
            <FormikInput
              name="password"
              type="password"
              label={intl.formatMessage({
                id: 'password',
                defaultMessage: 'Password',
              })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ height: '56px', marginTop: '5px' }}
              disabled={isSubmitting || !isValid}
            >
              <FormattedMessage id="sign-up" defaultMessage="Sign up" />
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body2" mt={1.25} mr="auto">
        <FormattedMessage
          id="have-account"
          defaultMessage="Already have an account?"
        />
        <Link component={RouterLink} to={loginRoute} variant="body2" ml={0.75}>
          <FormattedMessage id="sign-in" defaultMessage="Sign In" />
        </Link>
      </Typography>
    </Box>
  );
};

export default Registration;
