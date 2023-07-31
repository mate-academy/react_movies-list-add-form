import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

enum URLs {
  ImgUrl = 'imgUrl',
  ImdbUrl = 'imdbUrl',
}

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

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);

  let isError = false;
  let errorMessage = '';

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  if (name === URLs.ImgUrl || name === URLs.ImdbUrl) {
    isError = touched && required && !pattern.test(value);
    errorMessage = `Please enter valid URL for ${label}`;
  }

  if (!value.trim()) {
    isError = touched && required && !value;
    errorMessage = `${label} is required`;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    onChange(event); // Call the provided onChange callback with the event
  };

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
          onChange={handleChange}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': isError,
          })}
          placeholder={placeholder}
          value={value}
          onBlur={() => setTouched(true)}
        />
      </div>

      {isError && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
