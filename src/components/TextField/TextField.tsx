import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
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
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\w]*))?)$/;

  const [isValidImgUrl, setisValidImgUrl] = useState(false);
  const currentUrl = name === 'imgUrl' || name === 'imdbUrl';
  const isImgUrlErrorShown = currentUrl && touched
  && required && value && !isValidImgUrl;

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
            setisValidImgUrl(pattern.test(event.target.value));
            onChange(event.target.value);
          }}
          onBlur={() => {
            return setToched(true);
          }}
          required={required}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {isImgUrlErrorShown && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
