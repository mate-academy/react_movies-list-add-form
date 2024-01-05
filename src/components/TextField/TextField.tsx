import classNames from 'classnames';
import React, { useState } from 'react';
import { LINK_REGEXP } from '../../constants/regexp';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (event :React.ChangeEvent<HTMLInputElement>) => void,
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
  required = true,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);

  let error = '';

  // eslint-disable-next-line max-len
  if (value && (name === 'imdbUrl' || name === 'imgUrl') && !LINK_REGEXP.test(value)) {
    error = 'Invalid URL';
  } else if (touched && required && !value) {
    error = `${label} is required`;
  }

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          name={name}
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': error,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {error && (
        <p className="help is-danger">{error}</p>
      )}
    </div>
  );
};
