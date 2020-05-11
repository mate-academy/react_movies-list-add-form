export const required = (label, value) => {
  if (value) {
    return '';
  }

  return `${label} is required`;
};

export const url = (label, value) => {
  // eslint-disable-next-line max-len
  const URL_REGEXP = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  return URL_REGEXP.test(value)
    ? ''
    : `${label} should be a valid URL`;
};
