/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import './Input.scss';

type Props = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
};

export const Input: FC<Props> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
