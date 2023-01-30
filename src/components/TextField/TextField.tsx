import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  validate?: (value: string) => void,
  valid?: boolean,
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
  validate = () => true,
  valid = true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasRequiredError = touched && required && !value;
  const hasInvalidError = !valid && value;

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
            'is-danger': hasRequiredError || hasInvalidError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => {
            onChange(event.target.value);
            validate(value);
          }}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasRequiredError && (
        <p className="help is-danger">
          {`${label} is required`}
        </p>
      )}

      {hasInvalidError && (
        <p className="help is-danger">
          {`${label} isn't valid`}
        </p>
      )}
    </div>
  );
};
