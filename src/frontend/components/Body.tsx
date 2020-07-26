import React, { PropsWithChildren } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      backgroundColor: theme.palette.background.default,
      height: '100%',
    },
  })
);

const Body: React.FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.body}>{children}</div>;
};

export default Body;
