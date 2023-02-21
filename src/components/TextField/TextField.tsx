import React, { useState } from 'react';
import classNames from 'classnames';
import { Input } from '../../types/events';

type Props = {
  name: string,
  value: string,
  label?: string,
  isUrl?: boolean,
  required?: boolean,
  onChange?: (event: Input) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  isUrl = false,
  value,
  label = name,
  required = false,
  onChange,
}) => {
  const [touched, setToched] = useState(false);

  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const isEmpty = touched && required && !value;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': isEmpty || isUrl,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={onChange}
          onBlur={() => setToched(true)}
        />
      </div>

      {(isEmpty || isUrl) && (
        <p className="help is-danger">
          {`${label} ${isEmpty ? ('is required') : ('is not correct')}`}
        </p>
      )}
    </div>
  );
};
