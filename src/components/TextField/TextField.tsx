import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  label?: string,
  required?: boolean,
  value: string,
  onChange: (newValue: string) => void,
  handleError: (name: string, error: boolean) => void,
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
  handleError,
  pattern,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const isUrl = name === 'imdbUrl' || name === 'imgUrl';

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = isUrl && pattern
    ? touched && required && !pattern.test(value)
    : touched && required && (value === '');

  // eslint-disable-next-line no-console
  // console.info(`Name: ${name}; Touched: ${touched}; hasError: ${hasError}`);

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

            onChange(currentValue);
            handleError(name, hasError);
          }}
          onBlur={() => setToched(true)}
        />
      </div>

      {(hasError) && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
