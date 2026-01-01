import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  error?: string;
  onChange?: (newValue: string) => void;
};

export function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value = '',
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  readOnly = false,
  error,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

  const defaultError = required && !value ? `${label} is required` : undefined;
  const errorMessage = touched ? (error ?? defaultError) : undefined;
  const hasError = Boolean(errorMessage);

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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          readOnly={readOnly}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
