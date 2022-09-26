/* eslint-disable no-alert */
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

  // const [invaidUrl, setinvalidUrl] = useState(false);

  const [touched, setTouched] = useState(false);
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
          onChange={event => {
            if ((label === 'Image URL' || label === 'Imdb URL')
              && event.target.value.match(pattern)) {
              onChange(event.target.value);
              alert('Good URL');
            }

            if ((label === 'Image URL' || label === 'Imdb URL')
              && !event.target.value.match(pattern)) {
              alert('Invalid URL!');
              onChange(event.target.value);
            } else {
              onChange(event.target.value);
            }
          }}
          onBlur={() => {
            setTouched(true);
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
