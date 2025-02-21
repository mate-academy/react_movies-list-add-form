import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validate?: (value: string) => string | null;
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
  validate,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const hasRequiredError = touched && required && !value;
  const hasValidationError = touched && !hasRequiredError && validationError;

  const errorMessage = hasRequiredError
    ? `${label} is required`
    : hasValidationError
      ? validationError
      : null;

  const handleBlur = () => {
    setTouched(true);

    if (validate) {
      const error = validate(value);

      setValidationError(error);
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
            'is-danger': touched && !!errorMessage,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {errorMessage && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
