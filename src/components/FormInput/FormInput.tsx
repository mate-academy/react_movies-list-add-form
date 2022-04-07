import React, { memo } from 'react';

import './FormInput.scss';

type Props = {
  value: string;
  placeholder: string;
  onInput: (v: string) => void;
  error: boolean;
  onError: (v: boolean) => void;
};

export const FormInput: React.FC<Props> = memo(({
  value, placeholder, onInput, error, onError,
}) => {
  return (
    <div className="FormInput">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onInput(e.target.value);
          onError(false);
        }}
      />

      {error && <p className="FormInput__error">This field is required</p>}
    </div>
  );
});
