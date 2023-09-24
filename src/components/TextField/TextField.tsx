import classNames from 'classnames';
import React, { useState } from 'react';
import { pattern } from '../../pattern/pattern';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const hasUrlError = (name === 'imgUrl') && value && !pattern.test(value);
  const hasUrdbError = (name === 'imdbUrl') && value && !pattern.test(value);

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
            'is-danger': hasError || hasUrlError || hasUrdbError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasUrlError && (
        <p className="help is-danger">{`Url in ${name} is not valid!`}</p>
      )}

      {hasUrdbError && (
        <p className="help is-danger">{`Urdb in ${name} is not valid!`}</p>
      )}

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
