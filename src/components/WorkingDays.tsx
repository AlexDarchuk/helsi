import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Checkbox, CheckboxProps } from '@mui/material';
import { useField } from 'formik';
import { red } from '@mui/material/colors';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { WORKING_DAYS } from '../constants/constants';

const FormikCheckbox: FC<CheckboxProps> = (props) => {
  const { name } = props;
  const [field, meta] = useField<string[]>(name || '');

  if (!name) {
    return null;
  }

  const hasError = meta.error && meta.touched;

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" gap="20px">
        {WORKING_DAYS.map(({ key }) => (
          <Box display="flex" alignItems="center" gap="5px" key={key}>
            <label htmlFor="day">
              <FormattedMessage id={key} defaultMessage="" />
            </label>
            <Checkbox
              {...field}
              {...props}
              name={name}
              value={key}
              checked={!!field.value.find((el: string) => el === key)}
            />
          </Box>
        ))}
      </Box>
      <Box visibility={hasError ? 'visible' : 'hidden'} height="24px">
        {meta.error && meta.touched ? (
          <Box display="flex" alignItems="center" gap={0.625} color={red[700]}>
            <ErrorOutlineIcon />
            {meta.error}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default FormikCheckbox;
