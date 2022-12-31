import classNames from 'classnames';
import React, { useState } from 'react';
import type { ChangeFunction } from '../NewMovie';

type Props = {
  name: string;
  value: string;
  label?: string;
  required?: boolean;
  onChange: ChangeFunction;
  validate?: (value: string) => boolean;
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange,
  validate = () => true,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const isValid = validate(value);
  const hasWrongUrl = touched && !isValid;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || hasWrongUrl,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={(event) => onChange(event.target.name, event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {hasWrongUrl
        && <p className="help is-danger">Please enter a valid URL</p>}
    </div>
  );
};
