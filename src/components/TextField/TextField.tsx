import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
  error?: string;
  validate?: (value: string) => string | null;
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
  error,
  validate,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    onBlur();
  };

  let showError = false;
  let errorMessage = '';

  if (touched) {
    if (error) {
      showError = true;
      errorMessage = error;
    } else if (required && !value.trim()) {
      showError = true;
      errorMessage = `${label} is required`;
    } else if (validate) {
      const validationError = validate(value);

      if (validationError) {
        showError = true;
        errorMessage = validationError;
      }
    }
  }

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
        {required && <span className="required">*</span>}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': showError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {showError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
