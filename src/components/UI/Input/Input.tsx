/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import './Input.scss';

type Props = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  // onBlur: (e: any) => void;
  className: string;
  name: string;
};

export const Input: FC<Props> = ({
  type,
  placeholder,
  value,
  onChange,
  // onBlur,
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
      // onBlur={onBlur}
    />
  );
};
