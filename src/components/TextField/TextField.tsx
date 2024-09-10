import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  validateUrl?: (value: string) => boolean;
  onChange?: (newValue: string) => void;
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
  validateUrl,
  onChange = () => {},
  onBlur = () => {},
  customValidation,
  customValidationMessage = 'Invalid value',
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);

  const isRequiredError = required && !value.trim();
  const isValidationError = customValidation && !customValidation(value);
  const isUrlValidationError = validateUrl && validateUrl(value);
  const hasError =
    touched && (isRequiredError || !isValidationError || isUrlValidationError);

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
          onChange={event => {
            onChange(event.target.value);
          }}
          onBlur={() => {
            setTouched(true);
            onBlur();
          }}
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
