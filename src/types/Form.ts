export type FieldState = {
  value: string;
  error?: string;
};

export type FormState<T extends string> = Record<T, FieldState>;

export type FieldInfo = {
  label: string;
  default?: string;
  required?: boolean;
  validation?: FieldValidation[];
};

export type FormInfo = Record<string, FieldInfo>;

export type FieldValidation = {
  getErrorText: (fieldName: string) => string;
  check: (value: string) => boolean;
};
