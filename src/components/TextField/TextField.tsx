import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  validateUrl?: (value: string) => boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  customValidation?: (value: string) => boolean;
  customValidationMessage?: string;
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
  onBlur = () => {},
  customValidation,
  customValidationMessage = 'Invalid value',
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const isRequiredError = required && !value.trim();
  const isValidationError = customValidation && !customValidation(value);
  const hasError = touched && (isRequiredError || isValidationError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleBlur = () => {
    setTouched(true);
    onBlur();
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
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {isValidationError ? customValidationMessage : `${label} is required`}
        </p>
      )}
    </div>
  );
};
