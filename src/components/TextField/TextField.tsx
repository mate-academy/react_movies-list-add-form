import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  label?: string,
  required?: boolean,
  value: string,
  onChange: (field: string, value: string) => void,
  pattern?: RegExp,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  label = name,
  required = false,
  value,
  onChange,
  pattern,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const isUrl = name === 'imdbUrl' || name === 'imgUrl';

  const [touched, setToched] = useState(false);
  const hasError = isUrl && pattern
    ? touched && required && !pattern.test(value)
    : touched && required && (value === '');

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
          onChange={event => {
            const currentValue = event.target.value.trim();

            onChange(name, currentValue);
          }}
          onBlur={() => setToched(true)}
        />
      </div>

      {(hasError) && (
        <p className="help is-danger">{`${label} is incorrect`}</p>
      )}
    </div>
  );
};
