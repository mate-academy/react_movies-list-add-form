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
  isSubmitted?: boolean;
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
  validate = () => null,
  isSubmitted,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasError = touched && required && !value;
  const hasErrorUrl = (touched || isSubmitted) && error;

  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }

    if (validate) {
      const errorMessage = validate(newValue);

      setError(errorMessage);
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
          onChange={event => handleChange(event.target.value)}
          onBlur={() => {
            setTouched(true);
            setError(validate(value));
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{error || `${label} is required`}</p>
      )}

      {hasErrorUrl && (
        <p className="help is-danger">{error || `${label} is not well`}</p>
      )}
    </div>
  );
};
