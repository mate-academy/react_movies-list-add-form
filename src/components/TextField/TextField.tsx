import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  validator?: (url: string) => boolean;
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  validator,
}) => {
  // generade a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const hasError = touched && required && !value;

  const onValidate = () => {
    if (validator) {
      const isValid = validator(value);

      if (!isValid) {
        setValidationError(true);
        onChange('');

        setTimeout(() => {
          setValidationError(false);
        }, 5000);
      }
    }
  };

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
          onChange={
            (event) => onChange(event.target.value)
          }
          onBlur={() => {
            setTouched(true);
            onValidate();
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {
            validationError
              ? `${label} is not correct`
              : `${label} is required`
          }
        </p>
      )}
    </div>
  );
};
