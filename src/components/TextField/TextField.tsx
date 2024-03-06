import React, { useState } from 'react';
import { URL_PATTERN } from '../../api/url_patterns';

type Props = {
  pattern?: boolean;
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  pattern = false,
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && value.trim() === '';

  const hasSpaces = value.trim() !== value;

  const checkPattern =
    pattern && !URL_PATTERN.test(value) && !hasError && !!value && !hasSpaces;

  const handlerBlur = () => {
    setTouched(!value);
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
          className={`input ${hasError ? 'is-danger' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handlerBlur}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {checkPattern && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
