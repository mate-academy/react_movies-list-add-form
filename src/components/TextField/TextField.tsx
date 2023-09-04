import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label: string,
  placeholder?: string,
  required?: boolean,
  onChange: (newValue: string) => void,
  hasWhiteSpaceError?: boolean;
  hasValidUrlError?: boolean;
  hasValidImdbError?: boolean;
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
  hasWhiteSpaceError = false,
  hasValidUrlError,
  hasValidImdbError,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  const hasValidationError = touched && hasValidUrlError;

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
            'is-danger': hasError || (touched && hasValidUrlError),
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {hasValidationError && (
        <p className="help is-danger">{`${label} must be a valid URL`}</p>
      )}
      {hasWhiteSpaceError && (
        <p className="help is-danger">{`${label} should not contain leading/trailing/multiple spaces.`}</p>
      )}
      {hasValidImdbError && (
        <p className="help is-danger">{`${label} should be in the format 'tt' followed by numbers`}</p>
      )}

    </div>
  );
};
