import classNames from 'classnames';
import React, { useState } from 'react';
import { IsMovie } from '../../types/Movie';

type Props = {
  name: string,
  value: string,
  label?: string,
  onChange: (newValue: string, secondValue: string) => void,
  onDisabledChange:
  (newValue: boolean, secondValue: string, thirdValue: boolean) => void,
  touchedMovies: IsMovie,
  required?: boolean,
  hasError: boolean,
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
  required = false,
  hasError,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  // const {
  //   title,
  //   imgUrl,
  //   imdbUrl,
  //   imdbId,
  // } = touchedMovies;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, name);
  };

  const onBlur = () => {
    if (value.length === 0) {
      onDisabledChange(true, name, required);
    } else {
      onDisabledChange(false, name, required);
    }
  };

  // useEffect(() => {
  //   const key = name;

  //   setHasError(touchedMovies[key as keyof IsMovie] && required && !value);
  // }, [title,
  //   imgUrl,
  //   imdbUrl,
  //   imdbId,
  //   value]);

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
            'is-danger':
            touchedMovies[name as keyof IsMovie]
            && hasError
            && name !== 'description',
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
        />
      </div>

      {touchedMovies[name as keyof IsMovie]
      && hasError
      && name !== 'description' && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
