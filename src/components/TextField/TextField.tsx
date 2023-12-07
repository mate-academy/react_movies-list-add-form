import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  // forChange?: (newValue: string) => void,
  forChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isValidLink?: (link: string) => boolean,
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
  forChange = () => {},
  isValidLink = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

  const hasError = touched && required && !value;

  const isErrorValidLink = touched && !isValidLink(value);

  const isErrorVisible = isErrorValidLink && !hasError;

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
            'is-danger': hasError || isErrorValidLink,
          })}
          placeholder={placeholder}
          value={value}
          onChange={forChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {isErrorVisible && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
