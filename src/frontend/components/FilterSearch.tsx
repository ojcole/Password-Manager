import React from 'react';
import { FilterSearchProps } from './types';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const FilterSearch: React.FunctionComponent<FilterSearchProps> = ({
  setText,
}) => {
  return (
    <TextField
      fullWidth
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
      variant="outlined"
    />
  );
};

export default FilterSearch;
