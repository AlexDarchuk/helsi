import { FC, useContext, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Divider,
  Button,
  Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { grey } from '@mui/material/colors';

import { ProfileContext } from '../../context/ProfileContext';
import { IDoctorProfile, TProfile } from '../../types/types';
import FormikInput from '../../components/FormikInput';
import FormikTextArea from '../../components/FormikTextArea';
import FormikDropdown from '../../components/FormikDropdown';
import WorkingDays from '../../components/WorkingDays';
import { QUALIFICATION, SPECIALTY } from '../../constants/constants';

import validationSchema from './validationSchema';

const NewDoctor: FC = () => {
  const intl = useIntl();
  const {
    currentUser,
    saveDoctorDataToFirestore,
    updateDoctorDataToFirestore,
  } = useContext(ProfileContext);

  const initialValues: IDoctorProfile = useMemo(() => {
    if (currentUser && currentUser.status === 'notSubmitted') {
      return {
        userID: currentUser.userID,
        name: currentUser.name,
        lastName: '',
        email: currentUser.email,
        phone: null,
        address: '',
        specialty: '',
        experience: 0,
        qualification: '',
        startTime: '08:00',
        endTime: '18:00',
        fee: 0,
        days: [],
      };
    }

    if (
      currentUser &&
      (currentUser.status === 'pending' || currentUser.status === 'approved')
    ) {
      return currentUser as IDoctorProfile;
    }

    return {
      userID: '',
      name: '',
      lastName: '',
      email: '',
      phone: null,
      address: '',
      specialty: '',
      experience: 0,
      qualification: '',
      startTime: '08:00',
      endTime: '18:00',
      fee: 0,
      days: [],
    };
  }, [currentUser]);

  const writeNewDoctorAccount = (data: IDoctorProfile) => {
    if (currentUser && currentUser.role === 'patient') {
      return saveDoctorDataToFirestore(currentUser, data);
    }

    return updateDoctorDataToFirestore(currentUser as TProfile, data);
  };

  return (
    <Container>
      <Box py={2.5}>
        <Typography variant="h4" mb="20px">
          <FormattedMessage
            id="apply-doctor"
            defaultMessage="Apply for a Doctor Account"
          />
        </Typography>
        <Divider variant="fullWidth" sx={{ backgroundColor: grey[400] }} />
        <Formik<IDoctorProfile>
          initialValues={initialValues}
          validationSchema={() => validationSchema(intl)}
          enableReinitialize
          validateOnMount
          onSubmit={(values) => {
            if (currentUser?.role === 'doctor') {
              const changedFields:
                | Partial<IDoctorProfile>
                | { [key: string]: string } = {};
              Object.keys(values).forEach((key) => {
                const typedKey = key as keyof IDoctorProfile;
                if (values[typedKey] !== initialValues[typedKey]) {
                  changedFields[typedKey] = values[typedKey] as string;
                }
              });

              return writeNewDoctorAccount(changedFields as IDoctorProfile);
            }

            return writeNewDoctorAccount(values);
          }}
        >
          {({ isSubmitting, isValid, resetForm }) => (
            <Form style={{ width: '100%' }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                pt={2}
              >
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <FormattedMessage
                      id="personal-information"
                      defaultMessage="Personal Information"
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormikInput
                    name="name"
                    type="string"
                    label={intl.formatMessage({
                      id: 'first-name',
                      defaultMessage: 'First name',
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormikInput
                    name="lastName"
                    type="string"
                    label={intl.formatMessage({
                      id: 'last-name',
                      defaultMessage: 'Last name',
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormikInput
                    name="email"
                    type="email"
                    label={intl.formatMessage({
                      id: 'email',
                      defaultMessage: 'Email',
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormikInput
                    name="phone"
                    type="number"
                    label={intl.formatMessage({
                      id: 'phone',
                      defaultMessage: 'Phone',
                    })}
                    phone
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextArea
                    name="address"
                    type="string"
                    label={intl.formatMessage({
                      id: 'address',
                      defaultMessage: 'Address',
                    })}
                  />
                </Grid>
              </Grid>
              <Divider
                variant="fullWidth"
                sx={{ backgroundColor: grey[400], margin: '10px 0' }}
              />
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                pt={2}
              >
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <FormattedMessage
                      id="professional-information"
                      defaultMessage="Professional Information"
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormikDropdown
                    name="specialty"
                    list={SPECIALTY}
                    label={intl.formatMessage({
                      id: 'specialty',
                      defaultMessage: 'Specialty',
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormikInput
                    name="experience"
                    type="number"
                    label={intl.formatMessage({
                      id: 'experience',
                      defaultMessage: 'Experience',
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormikDropdown
                    name="qualification"
                    list={QUALIFICATION}
                    label={intl.formatMessage({
                      id: 'qualification',
                      defaultMessage: 'Qualification',
                    })}
                  />
                </Grid>
              </Grid>
              <Divider
                variant="fullWidth"
                sx={{ backgroundColor: grey[400], margin: '10px 0' }}
              />
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                pt={2}
              >
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <FormattedMessage
                      id="work-hours"
                      defaultMessage="Work Hours"
                    />
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} alignSelf="center">
                  <FormikInput
                    name="startTime"
                    type="time"
                    inputProps={{ min: '08:00' }}
                    label={intl.formatMessage({
                      id: 'startTime',
                      defaultMessage: 'Start time',
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={4} alignSelf="center">
                  <FormikInput
                    name="endTime"
                    type="time"
                    inputProps={{ max: '18:00' }}
                    label={intl.formatMessage({
                      id: 'endTime',
                      defaultMessage: 'End Time',
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormikInput
                    name="fee"
                    type="number"
                    label={intl.formatMessage({
                      id: 'fee',
                      defaultMessage: 'Fee',
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <WorkingDays name="days" />
                </Grid>
              </Grid>
              <Box
                display="flex"
                alignItems="center"
                gap="15px"
                width="400px"
                ml="auto"
              >
                {currentUser?.status === 'pending' ? (
                  <Typography variant="h5" whiteSpace="nowrap">
                    <FormattedMessage
                      id="admin-approval"
                      defaultMessage="Please wait for approval from the administrator."
                    />
                  </Typography>
                ) : (
                  <>
                    <Button
                      fullWidth
                      variant="contained"
                      color="inherit"
                      sx={{ height: '56px', marginTop: '5px' }}
                      onClick={() => resetForm()}
                    >
                      <FormattedMessage id="cancel" defaultMessage="Cancel" />
                    </Button>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{ height: '56px', marginTop: '5px' }}
                      disabled={isSubmitting || !isValid}
                    >
                      {currentUser?.status === 'approved' ? (
                        <FormattedMessage id="update" defaultMessage="Update" />
                      ) : (
                        <FormattedMessage id="save" defaultMessage="Save" />
                      )}
                    </Button>
                  </>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default NewDoctor;
