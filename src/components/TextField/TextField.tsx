import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  pattern?: RegExp,
  onChange?: (key: string, value: string) => void,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  pattern,
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => { },
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const [hasInvalidError, setInvalidError] = useState(false);

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
          onChange={event => {
            onChange(event.target.name, event.target.value);
          }}
          onBlur={() => {
            setTouched(true);
            if ((name === 'imgUrl'
            || name === 'imdbUrl')
            && !pattern?.test(value)) {
              setInvalidError(true);
            } else {
              setInvalidError(false);
            }
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {hasInvalidError && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
