/* eslint-disable @typescript-eslint/no-unused-expressions */
import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  onBlur,
  error,
}) => {
  const [id] = useState(() => `${name}-${Math.random().toFixed(16).slice(2)}`);
  const [touched, setTouched] = useState(false);
  const hasError = !!error || (touched && required && !value);

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
          className={classNames('input', { 'is-danger': hasError })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={e => {
            setTouched(true);
            onBlur && onBlur(e);
          }}
          required={required}
        />
      </div>
      {hasError && (
        <p className="help is-danger">{error || `${label} is required`}</p>
      )}
    </div>
  );
};
/* eslint-enable @typescript-eslint/no-unused-expressions */
