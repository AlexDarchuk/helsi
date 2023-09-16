import { FC } from 'react';
import { TextField, TextFieldProps, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { red } from '@mui/material/colors';
import { useField } from 'formik';

interface IFormikInput {
  name: string;
  type: string;
  label: string;
}

type TFormikInput = TextFieldProps & IFormikInput;

const FormikInput: FC<TFormikInput> = (props) => {
  const { name, type, label } = props;
  const [field, meta] = useField(name);

  const hasError = meta.error && meta.touched;

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        {...field}
        name={name}
        variant="outlined"
        margin="normal"
        type={type}
        fullWidth
        id={name}
        label={label}
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
