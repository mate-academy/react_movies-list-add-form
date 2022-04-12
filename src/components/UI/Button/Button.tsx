/* eslint-disable react/button-has-type */
import React from 'react';
import './Button.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type: 'submit' | 'button';
  onSubmit: (event: React.SyntheticEvent) => void;
};

export const Button: React.FC<Props> = ({ type, onSubmit, children }) => {
  return (
    <button
      className="button"
      type={type}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
};
