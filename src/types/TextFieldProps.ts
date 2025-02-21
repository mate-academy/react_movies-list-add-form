export type TextFieldProps = {
  id: number;
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: RegExp | undefined;
};
