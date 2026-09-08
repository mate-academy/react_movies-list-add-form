import React, { useState } from 'react';

import classNames from 'classnames';
import { Movie } from '../../types/Movie';

type Props = {
  name: keyof Movie;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  validate?: (value: string) => string | null;
  onChange?: (name: keyof Movie, newValue: string) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  validate = () => null,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

  const hasRequiredError = required && !value.trim();
  const validationError = value.trim() ? validate(value) : null;

  const hasError = touched && (hasRequiredError || Boolean(validationError));

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
          value={value}
          onChange={event => onChange(name, event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {validationError ?? `${label} is required`}
        </p>
      )}
    </div>
  );
};
