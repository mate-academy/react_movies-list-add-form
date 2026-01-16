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
  onBlur,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const hasError = touched && required && !value.trim();

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onBlur={() => {
            setTouched(true);
            onBlur?.();
          }}
          required={required}
          className={classNames('input', {
            'is-danger': hasError,
          })}
        />
      </div>

      {hasError && <p className="help is-danger">This field is required</p>}
    </div>
  );
};
