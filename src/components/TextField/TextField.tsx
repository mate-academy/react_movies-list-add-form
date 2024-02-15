import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  pattern?: RegExp
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
  pattern,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [patternError, setPatternError] = useState(false);

  const [touched, setTouched] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatternError(() => {
      return !pattern?.test(event.target.value.trim());
    });

    onChange(event.target.value);
  };

  const hasError = touched && required && !value;
  const hasValidError = !hasError && patternError && pattern && touched;

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
          onChange={handleChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasValidError && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
