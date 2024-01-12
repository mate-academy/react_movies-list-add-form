import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  onBlur?: () => void; // Add onBlur to the type
  showError?: boolean;
  error?: string | undefined;
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
  onBlur = () => {}, // Add onBlur to the props
  showError = false,
  error,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

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
            'is-danger': showError && hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            setTouched(false); // Reset touched status on change
            onChange(event.target.value);
          }}
          onBlur={() => {
            setTouched(true);
            onBlur(); // Call onBlur prop
          }}
        />
      </div>

      {showError && hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {showError && error && (
        <p className="help is-danger">{error}</p>
      )}
    </div>
  );
};
