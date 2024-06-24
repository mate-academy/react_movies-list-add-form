import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: RegExp;
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
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
  pattern,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [currentPattern, setCurrentParrent] = useState(true);

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const patternError = (currentValue: string) => {
    if (pattern) {
      setCurrentParrent(pattern.test(currentValue));
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
          name={name}
          onChange={event => {
            if (pattern) {
              patternError(event.target.value);
            }

            onChange(event);
          }}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {!currentPattern && touched && (
        <p className="help is-danger">{`URL isn't valid`}</p>
      )}
    </div>
  );
};
