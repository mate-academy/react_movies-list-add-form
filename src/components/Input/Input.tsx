import classNames from 'classnames';
import React, { memo, FC } from 'react';

type Props = {
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  name: string;
  valid: boolean;
};

const Input: FC<Props> = memo(({
  onBlur, name, valid, value, onChange,
}) => {
  return (
    <input
      onBlur={onBlur}
      value={value}
      name={name}
      onChange={onChange}
      id={name}
      type="text"
      className={classNames('input', 'input--outline', {
        'input--error': valid,
      })}
      placeholder="name"
    />
  );
});

export default Input;
