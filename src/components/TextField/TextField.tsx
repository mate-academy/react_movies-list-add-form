import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  pattern?: RegExp,
  onBlur: (isValid: boolean) => void
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
  pattern = undefined,
  onBlur = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const validateInput = (input: string): boolean => {
    if (!pattern) {
      return true;
    }

    return pattern.test(input);
  };

  const handleBlurValidation = () => {
    setTouched(true);
    const hasError = required && !value;
    const isValid = !hasError && validateInput(value);

    setError(!isValid && touched ? `${label} is invalid` : null);
    onBlur(isValid);
  };

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
            'is-danger': touched && error,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => handleBlurValidation()}
        />
      </div>

      {touched && error && (
        <p className="help is-danger">{error}</p>
      )}
    </div>
  );
};
