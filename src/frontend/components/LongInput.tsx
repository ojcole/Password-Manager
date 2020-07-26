import React from 'react';
import { TextFieldProps, TextField } from '@material-ui/core';

const LongInput: React.FunctionComponent<TextFieldProps> = (props) => (
  <TextField
    {...props}
    variant="outlined"
    fullWidth
    autoComplete={'off'}
    InputLabelProps={{ shrink: true }}
  />
);

export default LongInput;
