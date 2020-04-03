import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Grid,
  TextField,
  Tooltip,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
} from '@material-ui/core';
import { generatePassword } from '../../generation/generation';
import { copyToClipBoard } from '../../helpers/clipboard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      height: '100%',
      flexDirection: 'column',
    },
    heading: {
      flex: '0 1 auto',
    },
    content: {
      flex: '1 1 auto',
    },
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

const Main: React.FunctionComponent = () => {
  const classes = useStyles();
  const [website, setWebsite] = useState('');
  const [master, setMaster] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  const updateField = (handler: typeof setWebsite | typeof setMaster) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    handler(event.target.value);
  };

  let closeTimer: number;

  const copy = () =>
    copyToClipBoard(content).then(() => {
      setCopied(true);
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => setCopied(false), 2000);
    });

  useEffect(() => {
    generatePassword(website, master).then((content) => {
      setContent(content);
    });
  }, [website, master]);

  return (
    <>
      <Grid container className={classes.grid}>
        <Grid container spacing={4} className={classes.heading}>
          <Grid item xs={4}>
            <Typography variant="h1">Website</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h1">Master Password</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h1">Your Password</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          justify="center"
          alignItems="center"
          className={classes.content}
        >
          <Grid item xs={4}>
            <Tooltip title="Not Case Sensitive" arrow placement="top">
              <TextField
                placeholder="Website Name"
                variant="outlined"
                fullWidth
                value={website}
                onChange={updateField(setWebsite)}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Case Sensitive" arrow placement="top">
              <TextField
                placeholder="Master Password"
                type="password"
                variant="outlined"
                fullWidth
                value={master}
                onChange={updateField(setMaster)}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" className={classes.password}>
              {content}
            </Typography>
            <Tooltip title="Copied!" arrow open={copied}>
              <Button
                variant="contained"
                className={classes.copy}
                onClick={copy}
              >
                Copy to Clipboard
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
