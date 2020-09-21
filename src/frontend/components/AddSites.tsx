import React, { useState } from 'react';
import LongInput from './LongInput';
import { AddSitesProps } from './types';
import { Button, Tooltip } from '@material-ui/core';
import { SHORT_WAIT } from '../../constants/time';

const AddSites: React.FunctionComponent<AddSitesProps> = ({ addSite }) => {
  const [value, setValue] = useState('');
  const [displayAdd, setDisplayAdd] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState(0);

  const clickEvent = () => {
    if (value !== '') {
      const result = addSite(value);
      setValue('');

      if (result) {
        setShowTooltip(true);

        window.clearTimeout(displayAdd);
        setDisplayAdd(
          window.setTimeout(() => setShowTooltip(false), SHORT_WAIT)
        );

        return;
      }
    }

    setError(true);

    window.clearTimeout(errorTimeout);
    setErrorTimeout(window.setTimeout(() => setError(false), SHORT_WAIT));
  };

  return (
    <Tooltip title="Added!" open={showTooltip} arrow>
      <div>
        <LongInput
          label={'New Site'}
          placeholder={'Enter new site name'}
          value={value}
          onKeyPress={(event) => event.charCode === 13 && clickEvent()}
          InputProps={{
            endAdornment: (
              <Button variant="contained" onClick={clickEvent} tabIndex={-1}>
                Add
              </Button>
            ),
          }}
          onChange={(e) => setValue(e.target.value)}
          error={error}
        />
      </div>
    </Tooltip>
  );
};

export default AddSites;
