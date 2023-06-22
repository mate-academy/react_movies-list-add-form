import classNames from 'classnames';
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: ({ name, value }: {
    name: string,
    value: string,
  }) => void,
  setFormInputs?: React.Dispatch<React.SetStateAction<Movie>>,
  pattern?: RegExp,
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
  setFormInputs,
  pattern = '',
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const urlError = touched && required && !value.match(pattern);
  const urlCheck = (name === 'imgUrl' || name === 'imdbUrl') && urlError;
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (setFormInputs) {
      setFormInputs((prev: Movie) => ({
        ...prev,
        [e.target.name]: prev[e.target.name as keyof Movie].trim(),
      }));
    }

    setTouched(true);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target)}
          onBlur={handleBlur}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {urlCheck && (
        <p className="help is-danger">The url address is not correct</p>
      )}
    </div>
  );
};
