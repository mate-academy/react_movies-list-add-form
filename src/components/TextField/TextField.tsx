import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validation?: (value: string) => boolean;
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
  validation,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [validValue, setValidValue] = useState(true);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  const validateOnBlur = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    setTouched(true);

    if (validation) {
      setValidValue(validation(event.target.value));
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
            'is-danger': hasError || !validValue,
          })}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={event => onChange(event.target.value)}
          onBlur={event => validateOnBlur(event)}
        />
      </div>

      {hasError ? (
        <p className="help is-danger">{`${label} is required`}</p>
      ) : !validValue ? (
        <p className="help is-danger">{`${label} must be correct URL`}</p>
      ) : null}
    </div>
  );
};
