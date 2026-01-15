import classNames from 'classnames';
import React, { useMemo, useState } from 'react';

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
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requiredError = required && !value.trim();

  const showError = touched && (requiredError || Boolean(error));

  const errorMessage = useMemo(() => {
    if (!touched) {
      return null;
    }

    if (error) {
      return error;
    }

    if (requiredError) {
      return `${label} is required`;
    }

    return null;
  }, [touched, error, requiredError, label]);

  const handleBlur = () => {
    setTouched(true);

    const msg = validate ? validate(value) : null;

    setError(msg);
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);

    if (!touched) {
      return;
    }

    const msg = validate ? validate(newValue) : null;

    setError(msg);
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
            'is-danger': showError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => handleChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {errorMessage && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
