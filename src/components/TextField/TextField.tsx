import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  validateUrls?: (url: string) => boolean,
  isUrl?: boolean,
  setUrlFieldsTrue?: React.Dispatch<React.SetStateAction<{
    imgUrlTrue: boolean;
    imdbUrlTrue: boolean;
  }>>,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => { },
  validateUrls = () => false,
  isUrl = false,
  setUrlFieldsTrue,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [hasValidationError, setValidationError] = useState(false);
  const hasError = touched && required && !value;

  let validationError = false;
  const handleUrlValidation = (url: string) => {
    validationError = validateUrls(url);

    if (!validationError && isUrl && (value !== '')) {
      setValidationError(true);

      if (setUrlFieldsTrue !== undefined) {
        switch (name) {
          case 'imgUrl':
            setUrlFieldsTrue(current => ({
              ...current,
              imgUrlTrue: false,
            }));
            break;

          case 'imdbUrl':
            setUrlFieldsTrue(current => ({
              ...current,
              imdbUrlTrue: false,
            }));
            break;

          default:
            break;
        }
      }

      return;
    }

    setValidationError(false);

    if (setUrlFieldsTrue !== undefined) {
      switch (name) {
        case 'imgUrl':
          setUrlFieldsTrue(current => ({
            ...current,
            imgUrlTrue: true,
          }));
          break;

        case 'imdbUrl':
          setUrlFieldsTrue(current => ({
            ...current,
            imdbUrlTrue: true,
          }));
          break;

        default:
          break;
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
            handleUrlValidation(event.target.value);
          }}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {hasValidationError && (
        <p className="help is-danger">URL is invalid</p>
      )}
    </div>
  );
};
