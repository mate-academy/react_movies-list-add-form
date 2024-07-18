import classNames from 'classnames';
import React, { useState, ChangeEvent } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validate?: (value: string) => boolean;
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
  validate = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    onChange(newValue);

    if (touched) {
      setError(validate(newValue) ? null : 'Invalid value');
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validate(value) ? null : 'Invalid value');
  };

  const hasError = touched && required && !value;
  const displayError = hasError || error;

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
            'is-danger': displayError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {displayError && (
        <p className="help is-danger">
          {displayError ? `${label} is required` : error}
        </p>
      )}
    </div>
  );
};
