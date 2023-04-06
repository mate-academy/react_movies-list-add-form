import React, { useState } from 'react';
import classNames from 'classnames';

import './TextField.scss';

import { getRandomDigits, validateUrl } from '../helpers';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value.trim();

  const isUrlInput = ['imgUrl', 'imdbUrl'].includes(name);
  const isValid = isUrlInput
    ? validateUrl(value)
    : false;

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
          onChange={event => onChange(event.target.value)}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {touched && !isValid && isUrlInput && (
        <p className="help is-danger">
          Invalid URL
        </p>
      )}
    </div>
  );
};
