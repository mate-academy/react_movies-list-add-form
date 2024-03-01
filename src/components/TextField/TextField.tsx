import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  pattern?: RegExp;
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
  pattern,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  let isValid = true;

  if (pattern) {
    isValid = pattern.test(value);
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
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
          onChange={handleInput}
          onBlur={() => setTouched(true)}
          pattern={pattern ? pattern.toString() : undefined}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {!isValid && value && touched && (
        <p className="help is-danger">Input correct URL</p>
      )}
    </div>
  );
};
