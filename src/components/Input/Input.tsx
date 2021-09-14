import React from 'react';

interface Props {
  isRequired: boolean;
  pattern: string,
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
    pattern,
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
      pattern={pattern}
      className={className}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
