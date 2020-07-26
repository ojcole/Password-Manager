import React, { useState } from 'react';
import LongInput from './LongInput';
import { AddSitesProps } from './types';
import { Button } from '@material-ui/core';

const AddSites: React.FunctionComponent<AddSitesProps> = ({ addSite }) => {
  const [value, setValue] = useState('');

  const clickEvent = () => {
    if (value !== '') {
      addSite(value);
      setValue('');
    }
  }

  return (
    <LongInput
      label={'New Site'}
      placeholder={'Enter new site name'}
      value={value}
      onKeyPress={(event) => event.charCode === 13 && clickEvent() }
      InputProps={{
        endAdornment: (
          <Button
            variant="contained"
            onClick={clickEvent}
          >
            Add
          </Button>
        ),
      }}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default AddSites;
