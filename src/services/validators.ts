export const urlPattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!\/\\\w]*))?)$/;

export const validateUrl = (value: string) =>
  urlPattern.test(value) ? null : 'Enter a valid URL';

export const isValidUrl = (value: string) => urlPattern.test(value.trim());
