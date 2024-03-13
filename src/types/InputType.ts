export type InputType = {
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  pattern?: (newValue: string) => boolean;
};
