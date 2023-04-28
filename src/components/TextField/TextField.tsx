import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  isValidateUrl?: (newValue: string) => boolean,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  isValidateUrl = () => true,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  const isEqual = name === 'imgUrl' || name === 'imdbUrl';

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
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => setToched(true)}

        />
      </div>

      {
        value && !isValidateUrl(value) && isEqual
          ? (<p className="help is-danger">Url is not correct</p>)
          : required
      }

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
