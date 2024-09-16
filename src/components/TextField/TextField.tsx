import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
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
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [patternError, setPatternError] = useState(false);

  const hadleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }

    setPatternError(() => {
      return !pattern?.test(event.target.value.trim());
    });
  };

  const hasError = touched && required && !value;
  const hasSpaces = touched && value.trim().length === 0 && value.length > 0;
  const hasValidError =
    !hasError && !hasSpaces && pattern && patternError && touched;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={hadleChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasValidError && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}

      {hasSpaces && (
        <p className="help is-danger">You added only spaces into field</p>
      )}
    </div>
  );
};
