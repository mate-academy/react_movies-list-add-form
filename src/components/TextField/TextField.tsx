import classNames from 'classnames';
import React, { useState } from 'react';

// eslint-disable-next-line max-len
const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (name: string, value:string) => void,
};

const IMG_URL_NAME = 'imgUrl';
const IMDB_URL_NAME = 'imdbUrl';

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
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const isUrl = (name === IMDB_URL_NAME || name === IMG_URL_NAME);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = isUrl
    ? touched && required && !urlPattern.test(value)
    : (touched && required && !value.trim());

  let errorMessage = <p className="help is-danger">{`${label} is required`}</p>;

  if (isUrl) {
    errorMessage = <p className="help is-danger">{`Please, provide valid ${label}`}</p>;
  }

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.name, e.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && errorMessage}
    </div>
  );
};
