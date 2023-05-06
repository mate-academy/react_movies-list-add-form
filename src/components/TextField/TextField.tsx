import classNames from 'classnames';
import React, { useState } from 'react';
import { Input } from '../../types/Input';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
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

  const [touched, setToched] = useState(false);

  const hasError = touched && required && !value;

  const type = (name === Input.imdbUrl || name === Input.imgUrl)
    ? 'url'
    : 'text';

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type={type}
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event)}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
