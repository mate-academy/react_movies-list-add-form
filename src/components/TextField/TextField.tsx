import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  validate?: (value: string) => string | null;
  onChange?: (name: string, newValue: string) => void;
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
  validate = () => null,
  onChange = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const error = !touched
    ? null
    : required && value.trim() === ''
      ? `${label} is required`
      : validate(value.trim());

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
            'is-danger': !!error,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(name, event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};
