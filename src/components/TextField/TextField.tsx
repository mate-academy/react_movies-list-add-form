import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

function isValidUrl(url: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-zA-Z0-9$-_@.&+!*\\(\\),]+)\\.)+' +
      '[a-zA-Z]{2,})' +
      '(\\/[a-zA-Z0-9$-_@.&+!*\\(\\),]*)*$',
    'i',
  );

  return pattern.test(url);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const isUrlField = name === 'imgUrl' || name === 'imdbUrl';
  const isUrlError = isUrlField && !isValidUrl(value);
  const hasUrlError = isUrlField && value !== '' && isUrlError;
  const hasEmptyError = required && !value;

  const hasError = touched && (hasEmptyError || hasUrlError);

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

      {hasError && (
        <p className="help is-danger">
          {hasEmptyError
            ? `${label} is required`
            : hasUrlError && `${label} is invalid`}
        </p>
      )}
    </div>
  );
};
