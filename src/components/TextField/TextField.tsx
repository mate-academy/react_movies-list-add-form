import classNames from 'classnames';
import React, { useState } from 'react';
import { getValidUrl } from '../../utils/helpers';
import { pattern } from '../../utils/constants';

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
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const correctValue = getValidUrl(pattern, value);
  const hasError = touched && required && !value;
  const hasValidateError
    = touched
    && value
    && !correctValue
    && (name === 'imdbUrl'
      || name === 'imgUrl');

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

      {hasValidateError && (
        <p className="help is-danger">{`Wrong ${label} address`}</p>
      )}
    </div>
  );
};
