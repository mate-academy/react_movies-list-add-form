import { ChangeEvent, FC, memo } from 'react';

type Props = {
  name: string,
  placeholder: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
};

export const Input: FC<Props> = memo(({
  name, placeholder, value, onChange,
}) => {
  return (
    <input
      className="input mb-2"
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
});
