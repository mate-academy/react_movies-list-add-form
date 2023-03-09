import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';

type Props = {
  name: string,
  value: string,
  isValid?: boolean,
  label?: string,
  required?: boolean,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  onValidation?: (name: string, status: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  isValid = false,
  label = name,
  required = false,
  onChange = () => {},
  onValidation = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [isUrl] = useState(() => {
    if (name.toLowerCase().includes('url')) {
      return true;
    }

    return false;
  });

  const [touched, setToched] = useState(false);

  const hasError = touched && required && !value;
  const hasInvalidError = !isValid && touched && isUrl && value;

  // eslint-disable-next-line max-len
  const patternUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  // eslint-disable-next-line max-len
  const patternImgUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)\.(jpg|jpeg|png|gif)$/;

  const handleUrlInput = (text: string, fieldName: string): void => {
    const status = fieldName === 'imdbUrl'
      ? patternUrl.test(text)
      : patternImgUrl.test(text);

    onValidation(fieldName, status);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || hasInvalidError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={(event) => {
            onChange(event);

            if (isUrl) {
              const {
                name: fieldName,
                value: fieldValue,
              } = event.target;

              handleUrlInput(fieldValue, fieldName);
            }
          }}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {`${label} is required`}
        </p>
      )}

      {hasInvalidError && (
        <p className="help is-danger">
          Link must start with www. or https://
          {name === 'imgUrl' && ' and end with .jpeg/.png/etc.'}
        </p>
      )}
    </div>
  );
};
