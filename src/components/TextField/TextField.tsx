import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  isValid?: boolean,
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
  isValid = true,
  label = name,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onChange(event.target.value.trim());
    setToched(true);
  };

  const hasError = (touched && required && !value)
    || (touched && required && !isValid);

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
          onBlur={handleBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {isValid
            ? `${label} is required`
            : 'Invalid url'}
        </p>
      )}
    </div>
  );
};
