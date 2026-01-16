import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  errorURL?: boolean;
  errorImdbUrl?: boolean;
  required?: boolean;
  count: number;
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
  errorURL = false,
  required = false,
  errorImdbUrl = false,
  count,
  onChange = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  useEffect(() => {
    setTouched(false);
  }, [count]);

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

      {(hasError || errorURL || errorImdbUrl) && (
        <p className="help is-danger">
          {' '}
          {hasError ? `${label} is required` : `${label} is not correct`}{' '}
        </p>
      )}
    </div>
  );
};
