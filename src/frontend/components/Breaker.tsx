import React from 'react';
import { makeStyles, createStyles, Theme, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

const Breaker: React.FunctionComponent = () => {
  const { divider } = useStyles();

  return <Divider className={divider} />;
};

export default Breaker;
