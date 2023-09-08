import classNames from 'classnames';
import React, { useState } from 'react';
import { getRandomDigits } from '../../utils';
import {
  ERROR_MESSAGE_FOR_EMPTY_INPUT,
  ERROR_MESSAGE_FOR_VALIDATION,
} from './constants';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  error?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  error,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const isRequiredAndHasNoValue = (required && !value);
  const hasError = touched && (isRequiredAndHasNoValue || error);
  const errorMessage = `${label} ${isRequiredAndHasNoValue
    ? ERROR_MESSAGE_FOR_EMPTY_INPUT
    : ERROR_MESSAGE_FOR_VALIDATION}`;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
