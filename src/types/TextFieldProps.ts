export type TextFieldProps = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (key: string, newValue: string) => void,
};
