import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
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
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [errorMessage, setErrorMessage] = useState(`${label} is required`);
  const [touched, setTouched] = useState(false);

  const hasError = () => {
    if ((name === 'imgUrl' || name === 'imdbUrl') && value) {
      return touched && required && !value.match(pattern);
    }

    return touched && required && !value;
  };

  const handleOnBlur = () => {
    if ((name === 'imgUrl' || name === 'imdbUrl')
    && value && !value.match(pattern)) {
      setErrorMessage('Wrong URL input');
    }

    setTouched(true);
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
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError(),
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleOnBlur}
        />
      </div>

      {hasError() && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
