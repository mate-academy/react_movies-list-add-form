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

  const trimmedValue = value.trim();
  const requiredError =
    required && !trimmedValue ? `${label} is required` : null;
  const customError = validate ? validate(trimmedValue) : null;

  const errorMessage = touched && (requiredError || customError);

  //const hasError = touched && required && !value;

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
            'is-danger': !!errorMessage,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {errorMessage && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
