import { FC } from 'react';
import { Avatar, Typography, Button, Box, Link } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik, Form } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';

import { registerRoute } from '../../routes';
import validationSchema from './validationSchema';
import FormikInput from '../../components/FormikInput';

const Login: FC = () => {
  const intl = useIntl();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      px={5}
      py={2.5}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ backgroundColor: pink[500] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          <FormattedMessage id="sign-in" defaultMessage="Sign in" />
        </Typography>
      </Box>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={() => validationSchema(intl)}
        onSubmit={(values) => console.log(values)}
      >
        {({ isSubmitting, isValid }) => (
          <Form style={{ width: '100%' }}>
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
              <FormattedMessage id="sign-in" defaultMessage="Sign in" />
            </Button>
          </Form>
        )}
      </Formik>
      <Typography variant="body2" mt={1.25} mr="auto">
        <FormattedMessage
          id="not-account"
          defaultMessage="Don't have an account?"
        />
        <Link
          component={RouterLink}
          to={registerRoute}
          variant="body2"
          ml={0.75}
        >
          <FormattedMessage id="sign-up" defaultMessage="Sign Up" />
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
