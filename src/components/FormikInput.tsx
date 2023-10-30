import { FC } from 'react';
import { TextField, TextFieldProps, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { red } from '@mui/material/colors';
import { useField } from 'formik';

const FormikInput: FC<TextFieldProps> = (props) => {
  const { name } = props;
  const [field, meta] = useField(name || '');

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
        margin="normal"
        fullWidth
        id={name}
        error={!!hasError}
      />
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

export default FormikInput;
