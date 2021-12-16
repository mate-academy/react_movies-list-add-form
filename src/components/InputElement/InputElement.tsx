import React from 'react';
import './InputElement.scss';

type Props = {
  label: string,
  title: string,
  type: string,
  onChange(event: React.ChangeEvent<HTMLInputElement>): void,
  required: boolean,
};

export const InputElement: React.FC<Props> = ({
  label, title, type, onChange, required,
}) => (
  <label className="form__field" htmlFor={`movie-${type}`}>
    {label}
    <input
      type="text"
      id={`movie-${type}`}
      className="form__input"
      value={title}
      onChange={onChange}
      required={required}
    />
  </label>
);
