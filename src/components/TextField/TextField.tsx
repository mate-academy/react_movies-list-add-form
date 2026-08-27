import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  label?: string;
  value: string;
  placeholder?: string;
  onChange?: (newValue: string) => void;
  submitAttempted?: boolean;
  required?: boolean;
  validate?: (value: string) => boolean;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  label = name,
  value,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  submitAttempted = false,
  validate = () => true,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const hasValidationError = !validate(value);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError =
    (touched || submitAttempted) &&
    ((required && !value) || hasValidationError);

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
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
