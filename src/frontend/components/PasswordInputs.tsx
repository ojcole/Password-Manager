import React, { ChangeEvent, useState } from 'react';
import { PasswordInputsProps } from './types';
import LongInput from './LongInput';
import LongInputGrid from './LongInputGrid';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const icons = [<Visibility />, <VisibilityOff />];
const types = ['text', 'password'];

const PasswordInputs: React.FunctionComponent<PasswordInputsProps> = ({
  passwordSetters,
  passwordValues,
}) => {
  const [showText, setShowText] = useState([1, 1]);
  const toggle = (i: number) => () => {
    setShowText((showText) => {
      const newArr = showText.slice();
      newArr[i] ^= 1;

      return newArr;
    });
  };

  return (
    <LongInputGrid
      inputs={passwordSetters.map((setter, i) => (
        <LongInput
          placeholder={`Password ${i + 1}`}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setter(e.target.value)
          }
          value={passwordValues[i]}
          type={types[showText[i]]}
          InputProps={{
            endAdornment: (
              <IconButton onClick={toggle(i)}>{icons[showText[i]]}</IconButton>
            ),
          }}
        />
      ))}
    />
  );
};

export default PasswordInputs;
