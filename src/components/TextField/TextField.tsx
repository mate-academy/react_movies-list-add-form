import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string, name: string) => void,
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
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  const [inCorrectUrl, addInCorrectUrl] = useState(true && !touched);

  const checkUrl = (val: string, nameInput: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-,+=&;%@.\w_]*)#?(?:[.,!/\\\w]*))?)$/;

    if (nameInput === 'imgUrl' || nameInput === 'imdbUrl') {
      addInCorrectUrl(pattern.test(val) && true);
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
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value, name)}
          onBlur={(e) => {
            setToched(true);
            checkUrl(e.target.value, name);
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {!inCorrectUrl && (
        <p className="help is-danger">{`${label} is incorrect`}</p>
      )}
    </div>
  );
};
