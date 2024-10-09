import classNames from 'classnames';
import React, { useState } from 'react';
type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validate?: (value: string) => boolean;
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
  validate = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [error, setError] = useState<string | null>(null);
  const handleBlur = () => {
    if (required && !value.trim()) {
      setError(`${label} is required`);
    } else {
      setError(validate(value) ? null : 'Invalid value');
    }
  };

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
            'is-danger': error,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};
