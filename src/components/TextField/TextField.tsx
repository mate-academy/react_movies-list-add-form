import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: RegExp;
  onChange: (name: string, newValue: string) => void;
  valCheck: (valRegex: RegExp | undefined, value: string) => boolean;
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
  validation = undefined,
  onChange = () => {},
  valCheck = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  let errorLabel = `${label} is required`;
  const hasError = touched && required && !valCheck(validation, value.trim());

  if (validation) {
    errorLabel = `Please enter valid ${label}`;
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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(name, event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{errorLabel}</p>}
    </div>
  );
};
