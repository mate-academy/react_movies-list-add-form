import classNames from 'classnames';
import React, { useState } from 'react';
import { getRandomDigits } from '../../helpers/getRandomDigits';
import { Props } from './TextField.types';

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  isValidUrl = true,
}) => {
  const [touched, setTouched] = useState(false);

  const id = `${name}-${getRandomDigits()}`;
  const hasError = touched && required && !value;
  const hasUrlError = touched && !isValidUrl;

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
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {hasUrlError && (
        <p className="help is-danger">Enter valid url</p>
      )}
    </div>
  );
};
