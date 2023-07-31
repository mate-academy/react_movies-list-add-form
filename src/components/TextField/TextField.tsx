import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  isValidURL?: (newValue: boolean) => void
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
  isValidURL = () => {},
  onChange = () => { },
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const hasURLError = (name === 'imdbUrl' || name === 'imgUrl')
    && (!pattern?.test(value) && value !== '');

  const getErrorMessage = () => {
    if (hasError || /^\s+$/.test(value)) {
      return <p className="help is-danger">{`${label} is required`}</p>;
    }

    if (hasURLError) {
      return <p className="help is-danger">Enter valid URL</p>;
    }

    return '';
  };

  const handleChangeOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    isValidURL(hasURLError);
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
            'is-danger': hasError || hasURLError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChangeOnInput}
          onBlur={() => setTouched(true)}
        />
      </div>

      {getErrorMessage()}
    </div>
  );
};
