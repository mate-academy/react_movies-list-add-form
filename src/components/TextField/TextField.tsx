import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  validate = () => null,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);

  const requiredError =
    required && !value.trim() ? `${label} is required` : null;
  const customError = validate(value);
  const error = requiredError || customError;

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
            'is-danger': touched && error,
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {touched && error && <p className="help is-danger">{error}</p>}
    </div>
  );
};
