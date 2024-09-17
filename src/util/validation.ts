import { FieldInfo, FieldValidation, FormInfo, FormState } from '../types/Form';

const URL_PATTERN =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const requiredValidation: FieldValidation = {
  getErrorText: (fieldName: string) => `${fieldName} is required`,
  check: (value: string): boolean => !!value?.length,
};

export const urlValidation: FieldValidation = {
  getErrorText: (fieldName: string) => `${fieldName} isn't valid URL`,
  check: (value: string): boolean => URL_PATTERN.test(value),
};

export const minLengthValidation = (length: number): FieldValidation => ({
  getErrorText: (fieldName: string) =>
    `${fieldName} must be at least ${length} letters`,
  check: (value: string): boolean => value?.length >= length,
});

export const isAllRequiredFilled = <T extends string>(
  form: FormState<T>,
  formInfo: FormInfo,
): boolean =>
  Object.entries(formInfo)
    .filter(([, field]) => field.required)
    .every(([fieldName]) =>
      requiredValidation.check(form[fieldName as T].value),
    );

export const getValidationError = (field: FieldInfo, value: string): string => {
  if (field.validation) {
    for (let i = 0; i < field.validation.length; i++) {
      if (!field.validation[i].check(value)) {
        return field.validation[i].getErrorText(field.label);
      }
    }
  }

  return '';
};
