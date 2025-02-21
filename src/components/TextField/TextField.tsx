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
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    onChange(newValue);

    if (validate && newValue) {
      const validationError = validate(newValue);

      setError(validationError);
    } else if (required && !newValue) {
      setError(`${label} is required`);
    } else {
      setError(null);
    }
  };

  const handleBlur = () => {
    setTouched(true);

    if (required && !value) {
      setError(`${label} is required`);
    } else if (validate && value) {
      const validationError = validate(value);

      setError(validationError);
    } else {
      setError(null);
    }
  };

  const hasError = touched && error;

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
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {hasError && <p className="help is-danger">{error}</p>}
    </div>
  );
};
