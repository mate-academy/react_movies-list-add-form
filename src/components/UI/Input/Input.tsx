import React from 'react';
import './Input.scss';

type Props = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  name: string;
};

export const Input: React.FC<Props> = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  name,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
