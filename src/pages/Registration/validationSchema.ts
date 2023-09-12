import * as yup from 'yup';
import { IntlShape } from 'react-intl';

const validationSchema = (intl: IntlShape) =>
  yup.object().shape({
    name: yup
      .string()
      .min(
        4,
        intl.formatMessage({
          id: 'validation-name',
          defaultMessage: 'The name is to short',
        })
      )
      .required(
        intl.formatMessage({
          id: 'validation-requiredName',
          defaultMessage: 'The "Name" field is required',
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
    password: yup
      .string()
      .min(
        4,
        intl.formatMessage({
          id: 'validation-password',
          defaultMessage: 'Password is to short',
        })
      )
      .required(
        intl.formatMessage({
          id: 'validation-requiredPassword',
          defaultMessage: 'The "Password" field is required',
        })
      ),
  });

export default validationSchema;
