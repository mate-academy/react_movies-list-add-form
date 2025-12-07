import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  pattern?: (url: string) => boolean;
  errorText?: string;
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
  pattern = () => true,
  errorText = 'Invalid format',
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const trimmedValue = value.trim();

  const isMissing = required && trimmedValue.length === 0;
  const isInvalid =
    pattern != null && trimmedValue.length > 0 && !pattern(trimmedValue);

  const hasError = touched && (isMissing || isInvalid);

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

      {touched && isMissing && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {touched && isInvalid && <p className="help is-danger">{errorText}</p>}
    </div>
  );
};
