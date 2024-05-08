import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  pattern?: RegExp | null;
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
  pattern = null,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const matchPattern = pattern ? pattern.test(value) : true;
  const [touched, setTouched] = useState(false);
  const hasError =
    (touched && required && !value.trim()) || (touched && value && !matchPattern);

  let errMessage = `${label} is required`;

  if (!matchPattern && value) {
    errMessage = 'Invalid URL';
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
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{errMessage}</p>}
    </div>
  );
};
