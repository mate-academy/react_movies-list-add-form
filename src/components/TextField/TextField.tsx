import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
  error?: string;
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  isRequired = false,
  onChange = () => {},
  onBlur = () => {},
  error = '',
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': !!error,
          })}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          onBlur={() => {
            onBlur();
          }}
          required={isRequired}
        />
      </div>

      {error && (
        <p className="help is-danger">{error}</p>
      )}
    </div>
  );
};
