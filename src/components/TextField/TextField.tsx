import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { IsMovie } from '../../types/Movie';

type Props = {
  name: string,
  value: string,
  label?: string,
  onChange: (newValue: string, secondValue: string) => void,
  onDisabledChange: (newValue: boolean, secondValue: string) => void,
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
  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = touchedMovies;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, name);
  };

  const onBlur = () => {
    if (value.length === 0) {
      onDisabledChange(true, name);
    } else {
      onDisabledChange(false, name);
    }
  };

  useEffect(() => {
    const key = name;

    setHasError(touchedMovies[key as keyof IsMovie] && required && !value);
  }, [title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
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
            onBlur();
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
