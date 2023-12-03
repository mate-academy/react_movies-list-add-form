import classNames from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: Dispatch<SetStateAction<Movie>>,
  hasUrlError?: boolean,
  changeUrlError?: (value: boolean) => void,
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
  onChange = () => { },
  hasUrlError = false,
  changeUrlError = () => { },
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value.trim();

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  if ((name === 'imgUrl' || name === 'imdbUrl')
    && value && touched && required) {
    changeUrlError(value.search(pattern) === -1);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(prevNewMovie => ({
      ...prevNewMovie,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || hasUrlError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {(hasUrlError && !hasError) && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
