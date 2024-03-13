import classNames from 'classnames';
import React, { useState } from 'react';
import { InputType } from '../../types/InputType';
import { getRandomDigits } from '../../services/user';

export const TextField: React.FC<InputType> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  pattern = () => {},
}) => {
  const [touched, setTouched] = useState(false);
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const hasError = touched && required && !value.trim();
  const urlError = touched && value.trim() !== '' && !pattern(value);

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
          onChange={event => {
            onChange(event.target.value);
          }}
          onBlur={() => {
            if (value) {
              setTouched(false);
            } else {
              setTouched(true);
            }
          }}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {urlError && <p className="help is-danger">{`${label} isn't valid`}</p>}
    </div>
  );
};
