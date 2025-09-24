import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  pattern?: RegExp;
  patternError?: string;
  minLength?: number;
  validate?: (value: string) => string | null;
  dataCy?: string;
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
  pattern,
  patternError,
  minLength,
  validate,
  dataCy,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const trimmedValue = value.trim();

  const isEmpty = !trimmedValue;
  const isTooShort = minLength !== undefined && trimmedValue.length < minLength;
  const isPatternInvalid = pattern && !pattern.test(trimmedValue);
  const customError = validate ? validate(trimmedValue) : null;

  const hasError =
    touched &&
    ((required && isEmpty) || isTooShort || isPatternInvalid || !!customError);

  const getErrorMessage = () => {
    if (required && isEmpty) {
      return `${label} is required`;
    }

    if (isTooShort) {
      return `${label} must be at least ${minLength} characters`;
    }

    if (isPatternInvalid) {
      return patternError || `${label} has invalid format`;
    }

    if (customError) {
      return customError;
    }

    return '';
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={dataCy ?? `movie-${name}`}
          className={classNames('input', { 'is-danger': hasError })}
          placeholder={placeholder}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{getErrorMessage()}</p>}
    </div>
  );
};
