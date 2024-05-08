import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
  error?: string;
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
  onBlur = () => {},
  error,
  validate = () => true,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value.trim();
  const additionalError = !validate(value.trim()) ? 'Invalid URL' : '';

  const handleBlur = () => {
    setTouched(true);
    onBlur();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
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
            'is-danger': hasError || error || additionalError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {(hasError || error || additionalError) && (
        <p className="help is-danger">
          {error || additionalError || `${label} is required`}
        </p>
      )}
    </div>
  );
};
