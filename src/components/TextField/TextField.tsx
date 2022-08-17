import classNames from 'classnames';
import React, { useState } from 'react';
import { isValid } from '../Validation/validation';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => { },
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  let hasError = touched && required && !value;

  // eslint-disable-next-line max-len
  let errorMessage = `${label} is required`;

  if (id.includes('imgUrl') || id.includes('imdbUrl')) {
    hasError = touched && required && (!value || !isValid(value));
  }

  if ((value && !isValid(value))) {
    errorMessage = `${label} is not valid`;
  }

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => {
            onChange(event.target.value);
          }}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
