import React, { PropsWithChildren } from 'react';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import { MainGridProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: (props: MainGridProps) => ({
      minHeight: '100%',
      padding: theme.spacing(props.paddingSpacing || 0),
    }),
  })
);

const MainGrid: React.FunctionComponent<PropsWithChildren<MainGridProps>> = ({
  children,
  ...props
}) => {
  const classes = useStyles(props);

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
