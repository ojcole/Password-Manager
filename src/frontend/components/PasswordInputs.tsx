import React, { ChangeEvent } from 'react';
import { PasswordInputsProps } from './types';
import LongInput from './LongInput';
import LongInputGrid from './LongInputGrid';

const PasswordInputs: React.FunctionComponent<PasswordInputsProps> = ({
  passwordSetters,
  passwordValues,
}) => {
  return (
    <LongInputGrid
      inputs={passwordSetters.map((setter, i) => (
        <LongInput
          placeholder={`Password ${i + 1}`}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setter(e.target.value)
          }
          value={passwordValues[i]}
          type="password"
        />
      ))}
    />
  );
};

export default PasswordInputs;
