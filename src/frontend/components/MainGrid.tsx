import React, { PropsWithChildren } from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      minHeight: '100%',
      paddingBottom: theme.spacing(2),
    },
  })
);

const MainGrid: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      wrap="nowrap"
      className={classes.main}
    >
      {children}
    </Grid>
  );
};

export default MainGrid;
