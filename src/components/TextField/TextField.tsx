/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  validate?: () => boolean,
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
  validate = () => true || false,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const urlTextfields = name === 'imgUrl' || name === 'imdbUrl';
  const hasUrlError = validate() && touched && urlTextfields;

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
            'is-danger': (hasError || hasUrlError),
          })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
        />
      </div>
      {hasUrlError && (
        <p className="help is-danger">Enter valid Url</p>
      )}

      {hasError && !urlTextfields && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

    </div>
  );
};
