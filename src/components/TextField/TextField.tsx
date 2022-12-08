import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  isValidUrl?: (value: string) => boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  isValidUrl = () => {
    return true;
  },
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  const errorOfValid = touched && !isValidUrl(value);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {errorOfValid && (
        <p className="help is-danger">{`Please enter a valid ${label}`}</p>
      )}
    </div>
  );
};
