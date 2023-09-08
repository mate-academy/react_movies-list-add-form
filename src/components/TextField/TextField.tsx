import classNames from 'classnames';
import React, { useState } from 'react';
import { pattern } from '../../utils';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  validation?: boolean,
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
  required = false,
  onChange = () => {},
  validation = false,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

  const hasError = touched && required && !value;
  const hasValidationError = !hasError
    && touched && validation && !pattern.test(value);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
        {required && (
          <span className="has-text-danger">*</span>
        )}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || hasValidationError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {hasValidationError && (
        <p className="help is-danger">Your link is broken</p>
      )}
    </div>
  );
};
