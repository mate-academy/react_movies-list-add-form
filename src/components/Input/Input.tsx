import React from 'react';

interface Props {
  isRequired: boolean;
  className: string;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange:(event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<Props> = (props) => {
  const {
    isRequired,
    className,
    placeholder,
    type,
    name,
    value,
    onChange,
  } = props;

  return (
    <input
      required={isRequired}
      className={className}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
