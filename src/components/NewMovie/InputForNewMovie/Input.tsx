import React, { ChangeEvent } from 'react';

type Props = {
  inputTitle: string;
  name: string;
  value: string;
  onAdd: (event:string) => void;
};

export const Input:React.FC<Props> = ({
  inputTitle,
  name,
  value,
  onAdd,
}) => {
  return (
    <label className="input__wrapper">
      <p>{inputTitle}</p>

      <input
        type="text"
        className="input"
        placeholder={name}
        name={name}
        value={value}
        required
        onChange={(event:ChangeEvent<HTMLInputElement>) => {
          onAdd(event.target.value);
        }}
      />
    </label>
  );
};
