import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  url?: boolean;
  onChange?: (newValue: string) => void;
  setUrl?: (value: boolean) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  url,
  onChange = () => {},
  setUrl = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const isUrl = true ? name === 'imgUrl' || name === 'imdbUrl' : false;

  const hasError = touched && required && !value;
  const invalidUrl = !url && isUrl && value.length > 0;
  const pattern = new RegExp(
    [
      '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+',
      '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)',
      '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
    ].join(''),
  );

  function isValidUrl(newUrl: string) {
    return pattern.test(newUrl.trim());
  }

  const handleClickInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    if (isUrl) {
      if (isValidUrl(event.target.value.trim())) {
        setUrl(true);
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
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => {
            handleClickInput(event);
          }}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {invalidUrl && <p className="help is-danger">Invalid Url</p>}
    </div>
  );
};
