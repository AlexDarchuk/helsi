import { FC } from 'react';
import { TextFieldProps, Box, MenuItem, TextField } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { red } from '@mui/material/colors';
import { useField } from 'formik';

interface IFormikDropdown {
  list: { key: string; label: string }[];
}

type TFormikDropdown = IFormikDropdown & TextFieldProps;

const FormikDropdown: FC<TFormikDropdown> = (props) => {
  const { name, list = [] } = props;
  const [field, meta] = useField<string>(name || '');

  if (!name) {
    return null;
  }

  const hasError = meta.error && meta.touched;

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        {...field}
        {...props}
        name={name}
        variant="outlined"
        fullWidth
        id={name}
        error={!!hasError}
        select
        margin="normal"
      >
        {list.map(({ key }) => (
          <MenuItem key={key} value={key}>
            <FormattedMessage id={key} defaultMessage="" />
          </MenuItem>
        ))}
      </TextField>
      <Box visibility={hasError ? 'visible' : 'hidden'} minHeight="24px">
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

export default FormikDropdown;
