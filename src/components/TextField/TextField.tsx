import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  validate?: (value: string) => string | null;
  onChange?: (newValue: string) => void;
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
  validate,
  onChange = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  const hasError = touched && ((required && !value) || customError);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomError(null);
    onChange(event.target.value);
  };

  const handleBlur = () => {
    setTouched(true);

    if (validate) {
      const validationError = validate(value);

      setCustomError(validationError);
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
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {customError || `${label} is required`}
        </p>
      )}
    </div>
  );
};
