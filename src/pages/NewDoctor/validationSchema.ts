import * as yup from 'yup';
import { IntlShape } from 'react-intl';

const validationSchema = (intl: IntlShape) =>
  yup.object().shape({
    name: yup.string().required(
      intl.formatMessage({
        id: 'validation-requiredName',
        defaultMessage: 'The Name field is required',
      })
    ),
    lastName: yup.string().required(
      intl.formatMessage({
        id: 'validation-requiredLastName',
        defaultMessage: 'The Last name field is required',
      })
    ),
    email: yup
      .string()
      .email(
        intl.formatMessage({
          id: 'validation-email',
          defaultMessage: 'Please enter a valid email address',
        })
      )
      .required(
        intl.formatMessage({
          id: 'validation-requiredEmail',
          defaultMessage: 'The "Email" field is required',
        })
      ),
    phone: yup
      .string()
      .min(
        9,
        intl.formatMessage({
          id: 'validation-phone',
          defaultMessage: 'Phone number is to short',
        })
      )
      .required(
        intl.formatMessage({
          id: 'validation-requiredPhone',
          defaultMessage: 'The "Phone number" field is required',
        })
      ),
    address: yup.string().required(
      intl.formatMessage({
        id: 'validation-requiredAddress',
        defaultMessage: 'The Address field is required',
      })
    ),
    specialty: yup.string().required(
      intl.formatMessage({
        id: 'validation-requiredSpecialty',
        defaultMessage: 'The Specialty field is required',
      })
    ),
    experience: yup.string().required(
      intl.formatMessage({
        id: 'validation-requiredExperience',
        defaultMessage: 'The Experience field is required',
      })
    ),
    qualification: yup.string().required(
      intl.formatMessage({
        id: 'validation-requiredQualification',
        defaultMessage: 'The Qualification field is required',
      })
    ),
    fee: yup.string().required(
      intl.formatMessage({
        id: 'validation-requiredFee',
        defaultMessage: 'The Fee field is required',
      })
    ),
    days: yup.array().of(
      yup.string().required(
        intl.formatMessage({
          id: 'validation-requiredDays',
          defaultMessage: 'The Working Days is required',
        })
      )
    ),
  });

export default validationSchema;
