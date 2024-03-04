import classNames from 'classnames';
import React, { useState } from 'react';
import { URL_PATTERN } from '../../api/urlPatterns';

type Props = {
  pattern?: boolean;
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  pattern = false,
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const checkPattern =
    pattern && !URL_PATTERN.test(value) && !hasError && !!value;

  const handlerBlur = () => {
    setTouched(!value);
  };

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
          onBlur={handlerBlur}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {checkPattern && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
