import classNames from 'classnames';
import React, { useState } from 'react';
import { pattern } from './urlValidationPattern';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  checkUrl?: (check: boolean) => void
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  checkUrl = () => {},
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const [isInvalidUrl, setIsInvalidUrl] = useState(false);
  const hasError = touched && required && !value;

  checkUrl(isInvalidUrl);

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
            'is-danger': hasError || (isInvalidUrl && value),
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onBlur={() => {
            setTouched(true);
          }}
          onChange={event => {
            onChange(event.target.value);

            if (/url/i.test(name)) {
              setIsInvalidUrl(
                !pattern.test(value),
              );
            }
          }}
        />
      </div>

      {isInvalidUrl && value && (
        <p className="help is-danger">Provide a valid URL</p>
      )}

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
