export interface ValidURL {
  isValid: boolean;
  errorMessage: string;
}

export function isValidURL(url: string): ValidURL {
  // eslint-disable-next-line max-len
  const regex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/);
  const check = regex.test(url);
  const result: ValidURL = {
    isValid: check,
    errorMessage: check ? 'OK' : 'Invalid URL',
  };

  return result;
}
