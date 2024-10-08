import React, { useState } from 'react';
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
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const hasError = touched && required && !value;

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

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default TextField;
