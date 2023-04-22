import classNames from 'classnames';
import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { FieldNames } from '../../types/Fields';

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

export const isFieldValid = (field: keyof Movie, value: string): boolean => {
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  switch (field) {
    case FieldNames.Title:
    case FieldNames.ImdbId:
      return value.trim().length > 0;
    case FieldNames.ImgUrl:
    case FieldNames.ImdbUrl:
      return pattern.test(value);
    default:
      return true;
  }
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => { },
}) => {
  const id = `${name}-${getRandomDigits()}`;
  const [inputError, setInputError] = useState(false);

  const handleBlur = () => {
    if ((required && !value)
      || (value && !isFieldValid(name as keyof Movie, value))) {
      setInputError(true);
    } else {
      setInputError(false);
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
          className={classNames('input', { 'is-danger': inputError })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>
      {inputError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
