import React from 'react';

type Props = {
  type: string;
  name: string;
  placeholder: string;
  pattern: string;
  value: string;
  onChange: (event: React.ChangeEvent<InputOrTextArea>) => void;
};

export const InputField:React.FC<Props> = (props) => {
  const {
    type, name, placeholder, pattern, value, onChange,
  } = props;

  return (
    <div className="mb-3">
      <input
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        pattern={pattern}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
