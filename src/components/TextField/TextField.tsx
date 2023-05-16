import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { IsMovie } from '../../types/Movie';

type Props = {
  name: string,
  value: string,
  label?: string,
  onChange: (newValue: string) => void,
  onDisabledChange: (newValue: boolean) => void,
  touchedMovies: IsMovie,
  required: boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  onChange,
  onDisabledChange,
  touchedMovies,
  required,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const blurring = () => {
    if (value.length === 0) {
      onDisabledChange(true);
    } else {
      onDisabledChange(false);
    }
  };

  useEffect(() => {
    switch (name) {
      case 'title':
        setHasError(touchedMovies.title && required && !value);
        break;
      case 'description':
        setHasError(touchedMovies.description && required && !value);
        break;
      case 'imgUrl':
        setHasError(touchedMovies.imgUrl && required && !value);
        break;
      case 'imdbUrl':
        setHasError(touchedMovies.imdbUrl && required && !value);
        break;
      case 'imdbId':
        setHasError(touchedMovies.imdbId && required && !value);
        break;
      default:
        setHasError(touchedMovies.title && required && !value);
    }
  }, [touchedMovies.title,
    touchedMovies.description,
    touchedMovies.imgUrl,
    touchedMovies.imdbUrl,
    touchedMovies.imdbId,
    value]);

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
          onChange={handleInputChange}
          onBlur={() => {
            blurring();
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
