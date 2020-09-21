import React, { useState, useEffect } from 'react';
import { FilterSearchProps } from './types';
import { InputAdornment, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LongInput from './LongInput';

const FilterSearch: React.FunctionComponent<FilterSearchProps> = ({
  setText,
  enterPressed,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <LongInput
      placeholder={'Enter search string'}
      onChange={(e) => setValue(e.target.value)}
      label={'Filter'}
      onKeyPress={(event) => event.charCode === 13 && enterPressed()}
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <Button
            variant="contained"
            onClick={() => setValue('')}
            tabIndex={-1}
          >
            Clear
          </Button>
        ),
      }}
    />
  );
};

export default FilterSearch;
