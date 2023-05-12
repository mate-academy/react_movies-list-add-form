import classNames from 'classnames';
import React, { useState, ChangeEvent } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
};

const getRandomDigits = () => Math.random().toString().slice(2);

const checkIfUrl = (url: string) => {
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(url);
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const hasError = touched && required && !value;
  const isUrlInput = name === 'imdbUrl' || name === 'imgUrl';

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          name={name}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={(e) => {
            onChange(e);
            setUrlError(false);
          }}
          onBlur={() => {
            if (value && isUrlInput) {
              setUrlError(!checkIfUrl(value));
            }

            setTouched(true);
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {urlError && (
        <p className="help is-danger">You should input proper URL</p>
      )}
    </div>
  );
};
