import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string, name: string) => void,
  setIsUrlIncorrect?: (invalid: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  setIsUrlIncorrect = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  const [isInvalidUrl, setIsInvalidUrl] = useState(false);

  const validateUrl = () => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-,+=&;%@.\w_]*)#?(?:[.,!/\\\w]*))?)$/;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      setIsInvalidUrl(!value.match(pattern));
    }
  };

  if (isInvalidUrl) {
    setIsUrlIncorrect(true);
  } else {
    setIsUrlIncorrect(false);
  }

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
          onChange={event => onChange(event.target.value, name)}
          onBlur={() => {
            setToched(true);
            validateUrl();
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {isInvalidUrl && value && (
        <p className="help is-danger">{`${label} is invalid`}</p>
      )}
    </div>
  );
};
