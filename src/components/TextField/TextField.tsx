import React, { useState } from 'react';
import classNames from 'classnames';
import { getIsValidUrl } from '../../Helpers';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
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
}) => {
  const id = `${name}-${getRandomDigits()}`;

  const [touched, setTouched] = useState(false);

  const hasError = name.toLowerCase().includes('url')
    ? touched && required && !getIsValidUrl(value)
    : touched && required && !value;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          name={name}
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => {
            onChange(event);

            if (event.target.value === '') {
              setTouched(false);
            }
          }}
          onBlur={() => setTouched(true)}
          onFocus={() => setTouched(false)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {value.length === 0 ? (
            `${label} is required`
          ) : (
            `${label} contains an invalid URL`
          )}
        </p>
      )}
    </div>
  );
};
