export const isURLValid = (url: string): boolean => {
  // eslint-disable-next-line max-len
  const patternURL = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return patternURL.test(url);
};

export const isStrFilled = (val: string): boolean => {
  return !!val;
};
