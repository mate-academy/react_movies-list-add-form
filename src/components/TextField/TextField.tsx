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
  const [validUrl, setValidUrl] = useState(true);

  const hasError = touched && required && !value;

  const urlValidator = (checkingName: string, url: string) => {
    // eslint-disable-next-line max-len
    const pattern = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    if (checkingName.includes('Url')) {
      setValidUrl(pattern.test(url));
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
          onChange={event => {
            onChange(event.target.value);
          }}
          onBlur={(event) => {
            onChange(event.target.value.trim());
            setToched(true);
            urlValidator(name, event.target.value);
          }}
        />
      </div>

      {(hasError || !validUrl) && (
        <p className="help is-danger">{`${label} is not valid!`}</p>
      )}
    </div>
  );
};
