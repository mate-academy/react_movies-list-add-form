import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (event: string) => void,
};

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => { },
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [invaidUrl, setinvalidUrl] = useState(false);

  const [touched, setTouched] = useState(false);

  const hasError = touched && required && !value.trim();

  const handleInput = (event: { target: { value: string; }; }) => {
    onChange(event.target.value);
  };

  const handleUrlCheck = (event: { target: { value: string; }; }) => {
    onChange(event.target.value);

    if (!event.target.value.match(pattern)) {
      switch (name) {
        case 'imgUrl':
        case 'imdbUrl':
          handleInput(event);
          setinvalidUrl(true);
          break;

        case 'title':
        case 'description':
        case 'imdbId':
          handleInput(event);
          break;

        default:
          throw new Error();
      }
    }

    if (event.target.value.match(pattern)) {
      switch (name) {
        case 'imgUrl':
        case 'imdbUrl':
          handleInput(event);
          setinvalidUrl(false);
          break;

        default:
          throw new Error();
      }
    }
  };

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
            'is-danger': hasError || invaidUrl,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={handleUrlCheck}
          onBlur={() => {
            setTouched(true);
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {invaidUrl && (
        <p className="notification is-danger">
          Try entering a valid url
        </p>
      )}
    </div>
  );
};
