import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string, isValid: boolean) => void;
  inputValidator?: (input: string) => string;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  inputValidator = () => '',
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);

  const checkForErrorMessage = (toCheck: string) => {
    if (!toCheck) {
      return required ? `${label} is required` : '';
    }

    return inputValidator(toCheck);
  };

  const errorMessage = checkForErrorMessage(value);
  const isValid = errorMessage === '';

  // on mount determine if initial value is valid
  useEffect(() => onChange(value, isValid), [value, isValid, onChange]);

  // show error only for untouched
  const isErrorDisplayed = !isValid && touched;

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
            'is-danger': isErrorDisplayed,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => {
            const newValue = event.target.value;

            onChange(newValue, checkForErrorMessage(newValue) === '');
          }}
          onBlur={() => setTouched(true)}
        />
      </div>

      {isErrorDisplayed && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
