import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  isUrlValid?: boolean;
  isUrlError?: boolean;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  isUrlValid = true,
  isUrlError,
  required = false,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const hasUrlError = value && isUrlError && !isUrlValid;

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
          onChange={event => onChange(event)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {/* {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {hasUrlError && (
        <p className="help is-danger">Url should has valid text</p>
      )} */}
      {hasError ? (
        <p className="help is-danger">{`${label} is required`}</p>
      ) : (
        hasUrlError && (
          <p className="help is-danger">Url should have valid text</p>
        )
      )}
    </div>
  );
};
