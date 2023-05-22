import classNames from 'classnames';
import React, { useState } from 'react';
import { RequiredMovieFields } from '../../types/Movie';

type Props = {
  name: string,
  value: string,
  label?: string,
  onChange: (newValue: string, inputName: string) => void,
  onDisabledChange:
  (newValue: boolean, inputName: string, isRequired: boolean) => void,
  touchedMovies: RequiredMovieFields,
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, name);
  };

  const handleBlur = () => {
    onDisabledChange(!value.length, name, required);
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
            'is-danger':
            touchedMovies[name as keyof RequiredMovieFields]
            && hasError
            && name !== 'description',
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>

      {touchedMovies[name as keyof RequiredMovieFields]
      && hasError
      && name !== 'description' && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
