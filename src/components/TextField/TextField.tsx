import classNames from 'classnames';
import React, { useState } from 'react';
import { patternRegular } from '../../constants';
import { Movie } from '../../types/Movie';
import { check } from '../../functions';
import { MovieEror } from '../../types/MovieError';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  setNewMovie: React.Dispatch<React.SetStateAction<Movie>>;
  pattern?: RegExp;
  setMovieError: React.Dispatch<React.SetStateAction<MovieEror>>;
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
  setNewMovie,
  pattern = patternRegular,
  setMovieError,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value: fieldValue } = e.target;

    setNewMovie(oldMovie => ({
      ...oldMovie,
      [fieldName]: fieldValue,
    }));

    setErrorMessage('');
    check.inputField(
      fieldValue,
      name,
      label,
      required,
      setErrorMessage,
      setMovieError,
    );
    check.pattern(e, name, pattern, setErrorMessage, setMovieError);
  };

  const hasError = touched && errorMessage;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
        />
      </div>
      {hasError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
