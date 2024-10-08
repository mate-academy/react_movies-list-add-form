import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  validate?: (value: string) => string;
  placeholder?: string;
}

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange,
  onBlur,
  error,
  validate,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const [internalError, setInternalError] = useState('');

  const hasError = touched && ((required && !value) || error);

  useEffect(() => {
    if (validate && touched) {
      setInternalError(validate(value));
    }
  }, [value, touched, validate]);

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
          className={classNames('input', { 'is-danger': hasError })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={event => {
            setTouched(true);
            onBlur(event);
          }}
        />
      </div>

      {(hasError || internalError) && (
        <p className="help is-danger">
          {error || internalError || `${label} is required`}
        </p>
      )}
    </div>
  );
};

export default TextField;
