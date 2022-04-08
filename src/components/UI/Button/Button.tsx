import { FC } from 'react';
import './Button.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type: 'submit';
  onSubmit: (e: React.SyntheticEvent) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export const Button: FC<Props> = ({ type, onSubmit, children }) => {
  return (
    <button
      className="Button"
      // eslint-disable-next-line react/button-has-type
      type={type}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
};
