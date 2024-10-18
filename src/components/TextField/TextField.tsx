import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  touched?: boolean;
  setTouched?: (value: boolean) => void;
  setRequired?: (value: boolean) => void;
  onChange?: (newValue: string) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  onChange = () => {},
  required = true,
  touched,
  setTouched,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const hasError = touched && required && value !== undefined && !value.trim();

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
            'is-danger': hasError && name !== 'description',
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched?.(true)}
        />
      </div>

      {hasError && name !== 'description' && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
