import React, { ChangeEvent } from 'react';
import {
  Grid,
  OutlinedInput,
  InputProps,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { PasswordInputsProps } from './types';

const PassInput: React.FunctionComponent<InputProps> = (props) => (
  <OutlinedInput {...props} fullWidth autoComplete={'off'} type="password" />
);

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    grid: {
      margin: 0,
    },
  })
);

const PasswordInputs: React.FunctionComponent<PasswordInputsProps> = ({
  passwordSetters,
  passwordValues,
}) => {
  const { grid } = useStyles();

  return (
    <Grid container spacing={2} className={grid}>
      {passwordSetters.map((setter, i) => (
        <Grid item sm={6} xs={12} key={i}>
          <PassInput
            placeholder={`Password ${i + 1}`}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setter(e.target.value)
            }
            value={passwordValues[i]}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PasswordInputs;
