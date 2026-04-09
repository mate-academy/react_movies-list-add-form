import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  satisfiesCustomValidation?: boolean;
  customValidationErrorMessage?: string;
  onCustomValidationError?: () => void;
  onCustomValidationErrorClear?: () => void;
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
  satisfiesCustomValidation = true,
  customValidationErrorMessage = '',
  onCustomValidationError = () => {},
  onCustomValidationErrorClear = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

  const hasError = touched && required && !value;
  const hasCustomValidationError = touched && !satisfiesCustomValidation;
  const [customValidationErrorSignaled, setCustomValidationErrorSignaled] =
    useState(false);

  if (hasCustomValidationError && !customValidationErrorSignaled) {
    onCustomValidationError();
    setCustomValidationErrorSignaled(true);
  }

  if (!hasCustomValidationError && customValidationErrorSignaled) {
    onCustomValidationErrorClear();
    setCustomValidationErrorSignaled(false);
  }

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
            'is-danger': hasError || hasCustomValidationError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {!hasError && hasCustomValidationError && (
        <p className="help is-danger">{customValidationErrorMessage}</p>
      )}
    </div>
  );
};
