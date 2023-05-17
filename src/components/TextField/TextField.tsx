import classNames from 'classnames';
import React, { useState } from 'react';
import { getRandomDigits } from '../../helpers/helpers';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  isValidUrl?: boolean,
};

export const TextField: React.FC<Props> = React.memo(
  ({
    name,
    value,
    label = name,
    required = false,
    onChange = () => {},
    isValidUrl = true,
  }) => {
    const [id] = useState(() => `${name}-${getRandomDigits()}`);
    const [touched, setToched] = useState(false);

    const hasError = touched && required && !value.trim();

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

        {!isValidUrl && touched && (
          <p className="help is-danger">Invalid URL</p>
        )}
      </div>
    );
  },
);
