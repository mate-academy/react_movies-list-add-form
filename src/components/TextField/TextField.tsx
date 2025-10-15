import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  customValidation?: (value: string) => boolean;
  customErrorMessage?: string;
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
  onChange = () => {},
  customValidation,
  customErrorMessage = 'Invalid value',
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const isEmpty = !value.trim();
  const isRequiredError = touched && required && isEmpty;

  const isCustomInvalid =
    touched && !isEmpty && customValidation && !customValidation(value);

  const hasError = isRequiredError || isCustomInvalid;

  const errorMessage = isRequiredError
    ? `${label} is required`
    : isCustomInvalid
      ? customErrorMessage
      : '';

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
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
