import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
};

enum Url {
  imgUrl = 'imgUrl',
  imdbUrl = 'imdbUrl',
}

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
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);

  const [errorName, setErrorName] = useState('');
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isUrlValid = (url: ChangeEvent<HTMLInputElement>) => {
    onChange(url.target.value);
    if (!pattern.test(url.target.value)
      && (name === Url.imdbUrl || name === Url.imgUrl)) {
      setErrorName('Invalid email');
    } else {
      setErrorName('');
    }
  };

  const hasError = touched && required && !value;

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
          onChange={
            event => {
              isUrlValid(event);
            }
          }
          onBlur={() => setToched(true)}
        />
      </div>
      {(touched && errorName) && (
        <p className="help is-danger">Invalid Input</p>
      )}

      {(hasError && !errorName) && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
