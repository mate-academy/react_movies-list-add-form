import { ChangeEvent, FormEvent, useState } from 'react';

interface UseFormProps<TFormValues, VSchema> {
  initialValues: TFormValues;
  validationSchema?: VSchema;
}

interface BaseValidationSchema {
  [key: string]: (value: string) => void;
}

export const useForm = <TFormValues, VSchema extends BaseValidationSchema>({
  initialValues,
  validationSchema,
}: UseFormProps<TFormValues, VSchema>) => {
  const [count, setCount] = useState(0);

  const [formValues, setFormValues] = useState<TFormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string;
  }>({});

  const reset = () => {
    setFormValues(initialValues);
  };

  const validate = (key: keyof TFormValues, value: unknown) => {
    if (typeof value !== 'string' || !validationSchema) {
      return true;
    }

    const validateField = validationSchema[key as keyof VSchema];

    if (!validateField) {
      return true;
    }

    const validationResult = validateField(value);

    if (typeof validationResult === 'string') {
      setFormErrors(prev => ({ ...prev, [key]: validationResult }));

      return false;
    }

    return true;
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setFormValues(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit =
    (callback: (values: TFormValues) => void) => (event: FormEvent) => {
      event.preventDefault();
      let isValid = true;

      for (const key in formValues) {
        const validationResult = validate(key, formValues[key]);

        if (isValid && !validationResult) {
          isValid = validationResult;
        }
      }

      if (!isValid) {
        return;
      }

      callback(formValues);
      setCount(prev => prev + 1);
      reset();
    };

  return {
    count,
    formValues,
    formErrors,
    onChange,
    handleSubmit,
  };
};
