import React from 'react';
import './Input.scss';

type Props = {
  label: string,
  title: string,
  type: string,
  onChange(event: React.ChangeEvent<HTMLInputElement>): void,
  required: boolean,
};

export const Input: React.FC<Props> = ({
  label, title, type, onChange, required,
}) => (
  <label className="form__field" htmlFor={`movie-${type}`}>
    {label}
    <input
      type="text"
      id={`movie-${type}`}
      value={title}
      onChange={onChange}
      required={required}
    />
  </label>
);
