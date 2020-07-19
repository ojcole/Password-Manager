import React, { useState } from 'react';
import {
  Typography,
  Tooltip,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { copyToClipBoard } from '../../helpers/clipboard';
import { PasswordDisplayProps } from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    password: {
      wordBreak: 'break-all',
      fontFamily: 'monospace',
    },
    copy: {
      marginTop: theme.spacing(1),
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
    },
  })
);

const PasswordDisplay: React.FunctionComponent<PasswordDisplayProps> = ({
  content,
}) => {
  const classes = useStyles();
  const [copied, setCopied] = useState(false);

  let closeTimer: number;

  const copy = () =>
    copyToClipBoard(content).then(() => {
      setCopied(true);
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => setCopied(false), 2000);
    });
  return (
    <>
      <Typography variant="h4" className={classes.password}>
        {content}
      </Typography>
      <Tooltip title="Copied!" arrow open={copied}>
        <Button variant="contained" className={classes.copy} onClick={copy}>
          Copy to Clipboard
        </Button>
      </Tooltip>
    </>
  );
};

export default PasswordDisplay;
