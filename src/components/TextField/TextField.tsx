import classNames from 'classnames';
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  name: keyof Movie,
  value: Movie,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: Movie) => void,
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
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required
  && !value[name].trim() && name !== 'description';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: Movie = {
      ...value,
      [name]: event.target.value,
    };

    onChange(newValue);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value[name]}
          onChange={handleInputChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
