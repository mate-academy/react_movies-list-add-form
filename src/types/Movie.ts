export interface Movie {
  title: string;
  description?: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export interface TextFieldProps {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (newValue: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
