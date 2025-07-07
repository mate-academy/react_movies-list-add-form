import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (newValue: string, name: string) => void;
  error?: boolean;
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
  error = false
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const hasError = error || touched && required && !value;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <input
        type="text"
        id={id}
        data-cy={`movie-${name}`}
        className={classNames('input', {
          'is-danger': hasError,
        })}
        placeholder={placeholder}
        value={value}
        onChange={event => onChange(event.target.value, name)}
        onBlur={() => setTouched(true)}
        name={name}
      />

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
