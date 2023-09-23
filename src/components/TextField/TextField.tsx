import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  pattern?: RegExp,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange,
  pattern = undefined,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const checkUrl = pattern
    ? pattern.test(value)
    : false;
  const hasError = touched && required && !value;
  const hasUrlError = touched && pattern && !checkUrl;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {(hasUrlError && !hasError) && (
        <p className="help is-danger">{`${label} is invalid`}</p>
      )}
    </div>
  );
};
