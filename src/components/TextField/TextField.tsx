import cn from 'classnames';
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  formData: Movie;
  setFormData: (newData: Movie) => void;
  required?: boolean;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  label = name,
  placeholder = `Enter ${label}`,
  formData,
  setFormData,
  required = false,
}) => {
  const currentName = formData[name as keyof Movie];
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);

  const hasError = touched && required && !currentName;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setTouched(!currentName && false);
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
          className={cn('input', { 'is-danger': hasError })}
          placeholder={placeholder}
          value={currentName}
          onChange={handleOnChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
