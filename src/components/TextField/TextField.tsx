import classNames from 'classnames';
import React, { useState } from 'react';
import { Validator } from '../../helpers/Validator';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newKey: string, newValue: string) => void,
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
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  const hasValidationError = Validator(value, name);

  // if (value && (name === 'imgUrl' || name === 'imdbUrl')) {
  //   if (!value.match(pattern)) {
  //     hasValidationError = true;
  //   }
  // }

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
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}

      {hasValidationError && !hasError && <p className="help is-danger">{`${label} is incorrect`}</p>}
    </div>
  );
};
