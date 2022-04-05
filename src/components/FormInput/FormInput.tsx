import './FormInput.scss';
import {
  ChangeEvent, FC, memo, useMemo,
} from 'react';

interface Props {
  value: string;
  name: string;
  isValid: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>)=> void;
  onBlur: (event: ChangeEvent<HTMLInputElement>)=> void;
}

export const FormInput: FC<Props> = memo(({
  value, name, isValid, onChange, onBlur,
}) => {
  const inputLabel = useMemo(() => (
    name.charAt(0).toUpperCase() + name.slice(1)
  ), []);

  return (
    <label htmlFor={name} className="FormInput__label">
      {inputLabel}

      <input
        className="FormInput__input"
        type="text"
        name={name}
        value={value}
        placeholder={`Enter your ${name}...`}
        autoComplete="off"
        onChange={onChange}
        onBlur={onBlur}
        style={{
          borderColor: isValid ? 'red' : 'initial',
        }}
      />

      {isValid && (
        <p className="FormInput__error">
          {`${inputLabel} is not valid!`}
        </p>
      )}
    </label>
  );
});
