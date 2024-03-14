import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  customValidation?: (value: string) => boolean;
  otherFieldsChanged?: boolean;
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
  onBlur = () => {},
  customValidation = () => true,
  otherFieldsChanged = false,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [errorUrl, setErrorUrl] = useState(false);
  const hasError = touched && required && !value;

  useEffect(() => {
    if (touched) {
      setErrorUrl(!customValidation(value));
    }
  }, [value, touched, customValidation]);

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
          onChange={event => onChange(event)}
          onBlur={() => {
            onBlur();
            setTouched(true);
          }}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {!hasError && errorUrl && <p className="help is-danger">Invalid URL</p>}
      {!hasError && name === 'title' && value === '' && otherFieldsChanged && (
        <p className="help is-danger">Enter Title, please</p>
      )}
    </div>
  );
};
