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
  isValid?: boolean;
  setIsValid?: (state: boolean) => void;
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
  onChange = () => { },
  validator,
  isValid,
  setIsValid,

}) => {
  // generade a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  // const [validationError, setValidationError] = useState(false);
  const hasError = touched && required && !value;

  const onValidate = () => {
    if (validator && setIsValid) {
      const isValidValue = validator(value);

      if (!isValidValue) {
        setIsValid(true);
      }

      if (isValidValue) {
        setIsValid(false);
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
            onValidate();
            setTouched(true);
          }}
        />
      </div>
      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {(!hasError && isValid) && (
        <p className="help is-danger">{`${label} is not correct`}</p>
      )}
    </div>
  );
};
