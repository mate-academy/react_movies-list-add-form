import classNames from 'classnames';
import React, { useState } from 'react';
import { pattern } from '../../validations/pattern';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
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
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [validated, setValidated] = useState(true);

  function handleBlur() {
    setTouched(true);

    if (name.match('Url')) {
      setValidated(pattern.test(value));
    }
  }

  const hasError = touched && required && !value.trim();
  const unvalidatedData = value && !validated;

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
          onBlur={() => handleBlur()}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {unvalidatedData && (
        <p className="help is-danger">{`${label} should have the valid format`}</p>
      )}
    </div>
  );
};
