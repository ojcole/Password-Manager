import React from 'react';
import { LongInputGridProps } from './types';
import { Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import { createGridItemLength } from '../helpers/typeVerification';

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    grid: {
      margin: 0,
    },
  })
);

const LongInputGrid: React.FunctionComponent<LongInputGridProps> = ({
  inputs,
}) => {
  const { grid } = useStyles();

  return (
    <Grid container spacing={2} className={grid}>
      {inputs.map((input, i) => (
        <Grid
          item
          sm={createGridItemLength(12 / inputs.length)}
          xs={12}
          key={i}
        >
          {input}
        </Grid>
      ))}
    </Grid>
  );
};

export default LongInputGrid;
