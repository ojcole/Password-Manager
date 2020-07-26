import React from 'react';
import { FilterSearchProps } from './types';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LongInput from './LongInput';

const FilterSearch: React.FunctionComponent<FilterSearchProps> = ({
  setText,
}) => {
  return (
    <LongInput
      placeholder={'Enter search string'}
      onChange={(e) => setText(e.target.value)}
      label={'Filter'}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FilterSearch;
