import React, { useState } from 'react';
import LongInput from './LongInput';
import { AddSitesProps } from './types';
import { Button } from '@material-ui/core';

const AddSites: React.FunctionComponent<AddSitesProps> = ({ addSite }) => {
  const [value, setValue] = useState('');

  return (
    <LongInput
      label={'New Site'}
      placeholder={'Enter new site name'}
      value={value}
      InputProps={{
        endAdornment: (
          <Button
            variant="contained"
            onClick={() => {
              if (value !== '') {
                addSite(value);
                setValue('');
              }
            }}
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
