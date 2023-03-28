import classNames from 'classnames';
import React, { useState, ChangeEvent } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: ChangeEvent<HTMLInputElement>) => void,
  validation?: boolean,
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
  validation,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  const hasValidationError = validation === false;

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
            'is-danger': hasError || hasValidationError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={onChange}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {hasValidationError && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
