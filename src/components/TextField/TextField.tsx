import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  validate?: (newValue: string) => boolean | string;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
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
  validate,
  onChange = () => {},
  onBlur = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const trimmedValue = value.trim();

  const getErrorMessage = () => {
    if (required && trimmedValue === '') {
      return `${label} is required`;
    }

    if (validate) {
      const validationResult = validate(value);

      if (typeof validationResult === 'string') {
        return validationResult;
      }

      if (validationResult === false) {
        return `${label} is invalid`;
      }
    }

    return '';
  };

  const errorMessage = touched ? getErrorMessage() : '';
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
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => {
            setTouched(true);
            onBlur();
          }}
        />
      </div>

      {hasError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
