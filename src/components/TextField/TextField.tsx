import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validateUrl?: (value: string) => boolean;
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
  validateUrl = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const hasRequiredError = touched && required && !value;
  const hasInvalidError = touched && value && !validateUrl(value);

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
            'is-danger': hasRequiredError || (touched && hasInvalidError),
          })}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            const newValue = event.target.value;

            if (!touched) {
              setTouched(true);
            }

            onChange(newValue);
          }}
          onBlur={() => {
            setTouched(true);
          }}
        />
      </div>

      {hasRequiredError && <p className="help is-danger">{`${label} is required`}</p>}

      {hasInvalidError && <p className="help is-danger">Invalid URL</p>}
    </div>
  );
};
