import classNames from 'classnames';
import React, { useMemo, useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  validUrl?: boolean,
  validimdbUrl?: boolean,
  setValidUrl?: (val: boolean) => void,
  setValidimdbUrl?: (val:boolean) => void,
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
  validUrl,
  validimdbUrl,
  setValidUrl,
  setValidimdbUrl,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const renderError = useMemo(() => {
    if (name === 'imgUrl' || name === 'imdbUrl') {
      return validUrl || validimdbUrl;
    }

    return hasError;
  }, [validUrl, validimdbUrl, hasError]);

  const onBlurHandler = () => {
    if (!value.match(pattern) && setValidUrl) {
      setValidUrl(true);
    }

    if (!value.match(pattern) && setValidimdbUrl) {
      setValidimdbUrl(true);
    }

    setToched(true);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setValidUrl) {
      setValidUrl(false);
    }

    if (setValidimdbUrl) {
      setValidimdbUrl(false);
    }

    onChange(event.target.value);
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
            'is-danger': renderError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
      </div>

      {renderError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
